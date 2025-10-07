/**
 * 📅 Google Calendar → Spreadsheet Exporter
 *
 * Exports events from your **default Google Calendar** into a spreadsheet.
 * It also lists all available calendar colors with their names and hex codes.
 *
 * 🔧 HOW IT WORKS
 * 1. Creates/uses a folder named "Calendar Exports" in Google Drive.
 * 2. Creates/uses a spreadsheet named "Calendar Export Report".
 * 3. Generates two helper sheets:
 *    - "Config" → enter start_date, end_date, and optional color filters.
 *    - "AvailableColors" → shows all color IDs, names, and hex values.
 * 4. On valid config, exports events (title, duration, color, etc.) into a new sheet.
 *
 * ▶️ HOW TO RUN
 * - Step 0: Go to **https://script.google.com/** and create a new Apps Script project.
 * - Step 1: Paste this entire script into the editor.
 * - Step 2: Run `exportCalendarEvents()` once → it will create the required sheets.
 * - Step 3: Fill **start_date** and **end_date** in the Config sheet (YYYY-MM-DD).
 * - Step 4: (Optional) Add color filters (IDs or names) in the Config sheet.
 * - Step 5: Run the function again → events will be exported into a timestamped sheet.
 *
 * 💡 TIP
 * - To fetch accurate color hex codes, enable the **Advanced Google Calendar API**
 *   (Apps Script → Services → + → Google Calendar API).
 */

function exportCalendarEvents() {
  try {
    const folderName = "Calendar Exports"; // set folder or "" to use Drive root
    const spreadsheetName = "Calendar Export Report";
    const FALLBACK_SAMPLE_DAYS = 90;

    Logger.log("🚀 Starting Calendar Export...");

    // --- Folder handling ---
    const folder = folderName
      ? (DriveApp.getFoldersByName(folderName).hasNext()
          ? DriveApp.getFoldersByName(folderName).next()
          : DriveApp.createFolder(folderName))
      : DriveApp.getRootFolder();
    Logger.log(`📁 Using folder: ${folder.getName()}`);

    // --- Spreadsheet handling (inside folder) ---
    let spreadsheet;
    const filesInFolder = folder.getFilesByName(spreadsheetName);
    if (filesInFolder.hasNext()) {
      spreadsheet = SpreadsheetApp.open(filesInFolder.next());
      Logger.log(`📘 Using existing spreadsheet: ${spreadsheet.getName()}`);
    } else {
      spreadsheet = SpreadsheetApp.create(spreadsheetName);
      // move created file into the folder
      const file = DriveApp.getFileById(spreadsheet.getId());
      folder.addFile(file);
      DriveApp.getRootFolder().removeFile(file);
      Logger.log(`🆕 Created new spreadsheet: ${spreadsheet.getName()}`);
    }

    // --- Ensure Config sheet exists (create if missing) ---
    let configSheet = spreadsheet.getSheetByName("Config");
    let createdConfig = false;
    if (!configSheet) {
      configSheet = spreadsheet.insertSheet("Config");
      configSheet.getRange("A1:B6").setValues([
        ["Key", "Value"],
        ["start_date (YYYY-MM-DD)", ""],
        ["end_date (YYYY-MM-DD)", ""],
        ["colors (comma-separated names or IDs; leave blank = ALL)", ""],
        ["Last Run - Exported Count", ""],
        ["Last Run Time", ""]
      ]);
      formatHeaderRow(configSheet);
      Logger.log("⚙️ Created Config sheet.");
      createdConfig = true;
    }

    // --- Calendar reference ---
    const calendar = CalendarApp.getDefaultCalendar();

    // --- Read config (may be empty) ---
    const config = readConfig(configSheet);

    // --- Ensure AvailableColors exists and is populated ---
    ensureAvailableColors(spreadsheet, calendar, config, FALLBACK_SAMPLE_DAYS);

    // If Config was just created, ask user to fill it in and stop
    if (createdConfig) {
      Logger.log("Please fill start_date and end_date in the Config sheet, then re-run.");
      return;
    }

    // If config dates invalid, ask to fill them and stop (AvailableColors already ensured)
    if (!isValidDate(config.startDate) || !isValidDate(config.endDate)) {
      Logger.log("⚠️ Please fill valid start_date and end_date in Config sheet (YYYY-MM-DD).");
      return;
    }

    Logger.log(`📅 Using date range: ${config.startDate.toISOString()} -> ${config.endDate.toISOString()}`);
    Logger.log(`🎯 Colors filter: ${config.colors.length ? config.colors.join(", ") : "ALL"}`);

    // --- Events Export ---
    const exportSheetName = `Events_${Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMdd_HHmm")}`;
    const exportSheet = spreadsheet.insertSheet(exportSheetName);
    const headers = ["Title", "Start", "End", "Duration (min)", "Description", "Location", "Guests", "Color ID", "Color Name", "Color Hex", "Calendar Name"];
    exportSheet.appendRow(headers);
    formatHeaderRow(exportSheet);

    const events = calendar.getEvents(config.startDate, config.endDate);
    Logger.log(`🔎 Fetched ${events.length} events for export window.`);

    // get colors using same logic as ensureAvailableColors (prefers advanced API)
    const colorsObj = getColorsObjectSafely();

    // color name map
    const colorNameMap = getColorNameMap();

    let rowCount = 0;
    events.forEach(ev => {
      const colorId = ev.getColor() || "";
      // If config has filters and this colorId not included -> skip
      if (config.colors.length && !config.colors.includes(colorId) && !config.colors.map(c=>c.toLowerCase()).includes((colorNameMap[colorId]||'').toLowerCase())) {
        return;
      }
      const duration = ev.getEndTime() && ev.getStartTime() ? (ev.getEndTime().getTime() - ev.getStartTime().getTime()) / (1000 * 60) : "";
      const hex = colorsObj[colorId] ? (typeof colorsObj[colorId] === 'string' ? colorsObj[colorId] : (colorsObj[colorId].background || '')) : '';
      exportSheet.appendRow([
        ev.getTitle(),
        ev.getStartTime(),
        ev.getEndTime(),
        duration,
        ev.getDescription() || '',
        ev.getLocation() || '',
        ev.getGuestList ? ev.getGuestList().map(g => g.getEmail()).join(', ') : '',
        colorId,
        colorNameMap[colorId] || '(Unknown)',
        hex,
        calendar.getName()
      ]);
      rowCount++;
    });

    Logger.log(`✅ Exported ${rowCount} events to sheet "${exportSheetName}".`);

    // --- Update config with last run info ---
    updateConfig(configSheet, rowCount);

    Logger.log("🏁 Calendar Export Complete.");
    Logger.log(`Spreadsheet URL: ${spreadsheet.getUrl()}`);
    Logger.log("Tip: For official color hex values, enable 'Google Calendar API' as an Advanced Service in Apps Script (Services → + → Google Calendar API).");

  } catch (err) {
    Logger.log(`❌ Error: ${err && err.toString ? err.toString() : err}`);
  }
}

/* ------------------ Helpers ------------------ */

function ensureAvailableColors(spreadsheet, calendar, config, fallbackDays) {
  // create or get sheet
  let colorSheet = spreadsheet.getSheetByName("AvailableColors");
  const existed = !!colorSheet;
  if (!colorSheet) {
    colorSheet = spreadsheet.insertSheet("AvailableColors");
    Logger.log("🎨 Created AvailableColors sheet.");
  }

  // Ensure header row present
  const header = ["Color ID", "Color Name", "Background Hex", "Your Label Name", "Example event"];
  colorSheet.getRange(1, 1, 1, header.length).setValues([header]);
  formatHeaderRow(colorSheet);

  // Preserve existing "Your Label Name" if present
  const existingLabels = {};
  if (existed && colorSheet.getLastRow() > 1) {
    try {
      const existingRange = colorSheet.getRange(2, 1, colorSheet.getLastRow() - 1, 4);
      const existingVals = existingRange.getValues();
      existingVals.forEach(row => {
        const id = row[0];
        const label = row[3];
        if (id) existingLabels[id.toString()] = label || "";
      });
    } catch (e) {
      Logger.log("⚠️ Could not read existing labels: " + e);
    }
  }

  // Get colors map (try advanced API, fallback if not available)
  const colorsObj = getColorsObjectSafely();

  // Determine sample event window
  let sampleStart, sampleEnd = new Date();
  if (config && isValidDate(config.startDate) && isValidDate(config.endDate)) {
    sampleStart = config.startDate;
    sampleEnd = config.endDate;
  } else {
    sampleStart = new Date(sampleEnd);
    sampleStart.setDate(sampleEnd.getDate() - (fallbackDays || 90));
  }

  // Get sample events safely
  let eventsSample = [];
  try {
    eventsSample = calendar.getEvents(sampleStart, sampleEnd);
  } catch (e) {
    Logger.log("⚠️ Could not fetch sample events for AvailableColors: " + e);
    eventsSample = [];
  }

  // Build rows for available colors
  const colorIds = Object.keys(colorsObj);
  const rows = colorIds.map(id => {
    // normalize hex retrieval
    let hex = "";
    const val = colorsObj[id];
    if (!val) hex = "";
    else if (typeof val === "string") hex = val;
    else hex = val.background || val.backgroundColor || "";
    const example = (eventsSample.find(ev => ev.getColor && ev.getColor() === id) || null);
    const userLabel = existingLabels[id] || "";
    return [id, getColorName(id), hex, userLabel, example ? example.getTitle() : ""];
  });

  // Clear existing content below header but keep header row and sheet formatting
  const lastRow = colorSheet.getLastRow();
  if (lastRow > 1) {
    colorSheet.getRange(2, 1, Math.max(lastRow - 1, 1), colorSheet.getLastColumn() || 5).clearContent();
  }

  // write rows
  if (rows.length) {
    colorSheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
  } else {
    Logger.log("⚠️ No colors available to list.");
  }

  Logger.log(`🎨 AvailableColors populated (${rows.length} rows).`);
}

function getColorsObjectSafely() {
  // Try the Advanced Calendar API first (gives {id: {background: '#hex',...}, ...})
  try {
    if (typeof Calendar !== 'undefined' && Calendar && Calendar.Colors && typeof Calendar.Colors.get === 'function') {
      const api = Calendar.Colors.get();
      if (api && api.event) {
        Logger.log("Using Advanced Calendar API (Calendar.Colors.get).");
        return api.event; // object keyed by color id
      }
    }
  } catch (e) {
    Logger.log("Advanced Calendar service not available or threw error: " + e);
  }
  // Fallback map (colorId -> { background: hex })
  Logger.log("Using fallback color map.");
  return getFallbackColors();
}

function getFallbackColors() {
  return {
    "1": { background: "#7986cb" },
    "2": { background: "#33b679" },
    "3": { background: "#8e24aa" },
    "4": { background: "#e67c73" },
    "5": { background: "#f6c026" },
    "6": { background: "#f5511d" },
    "7": { background: "#039be5" },
    "8": { background: "#616161" },
    "9": { background: "#3f51b5" },
    "10": { background: "#0b8043" },
    "11": { background: "#d50000" }
  };
}

function formatHeaderRow(sheet) {
  // If sheet has no columns yet, set 5 columns so header formatting can be applied safely
  if (sheet.getLastColumn() < 5) sheet.insertColumnsAfter(sheet.getLastColumn() || 1, 5 - sheet.getLastColumn());
  const header = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  header.setFontWeight("bold");
  sheet.setFrozenRows(1);
}

function readConfig(sheet) {
  // Reads A2:B4 into config
  const vals = sheet.getRange("A2:B4").getValues();
  const config = { startDate: null, endDate: null, colors: [] };
  vals.forEach(([key, value]) => {
    if (!key) return;
    const k = String(key).toLowerCase();
    if (k.indexOf("start_date") !== -1) config.startDate = value ? parseDateFlexible(value) : null;
    if (k.indexOf("end_date") !== -1) config.endDate = value ? parseDateFlexible(value) : null;
    if (k.indexOf("colors") !== -1) {
      config.colors = value ? String(value).split(",").map(s => s.trim()).filter(Boolean) : [];
    }
  });
  return config;
}

function updateConfig(sheet, count) {
  const now = new Date();
  sheet.getRange("B5").setValue(count);
  sheet.getRange("B6").setValue(Utilities.formatDate(now, Session.getScriptTimeZone(), "M/d/yyyy"));
}

function parseDateFlexible(v) {
  // Accepts Date object, string 'YYYY-MM-DD' or other parseable strings
  if (!v && v !== 0) return null;
  if (v instanceof Date) {
    return isNaN(v.getTime()) ? null : v;
  }
  const s = String(v).trim();
  // Try YYYY-MM-DD explicitly
  const parts = s.split("-");
  if (parts.length === 3 && parts[0].length === 4) {
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);
    const dt = new Date(y, m, d);
    return isNaN(dt.getTime()) ? null : dt;
  }
  const dt2 = new Date(s);
  return isNaN(dt2.getTime()) ? null : dt2;
}

function isValidDate(d) {
  return d instanceof Date && !isNaN(d.getTime());
}

function getColorNameMap() {
  return {
    "1": "Lavender", "2": "Sage", "3": "Grape", "4": "Flamingo", "5": "Banana",
    "6": "Tangerine", "7": "Peacock", "8": "Graphite", "9": "Blueberry", "10": "Basil", "11": "Tomato"
  };
}

function getColorName(id) {
  const m = getColorNameMap();
  return m[id] || "(Unknown)";
}
