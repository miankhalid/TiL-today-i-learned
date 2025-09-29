const baseColors = {
  primary: '#1C7C6C',   // Elm
  accent: '#008080',    // Teal
  secondary: '#FF8C42', // Orange

  error: '#D32F2F',
  success: '#388E3C',
  warning: '#F57C00',
  info: '#1976D2',
};

const typography = {
  h1: { fontSize: 32, fontWeight: '700', lineHeight: 40 },
  h2: { fontSize: 24, fontWeight: '700', lineHeight: 32 },
  h3: { fontSize: 20, fontWeight: '600', lineHeight: 28 },
  body: { fontSize: 16, fontWeight: '400', lineHeight: 22 },
  bodyBold: { fontSize: 16, fontWeight: '600', lineHeight: 22 },
  small: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
  tiny: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
};

const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

const radius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 20,
  pill: 9999,
};

const shadow = {
  sm: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 6,
  },
};

/**
 * Light Theme Colors
 */
const lightColors = {
  ...baseColors,
  background: '#F9F9F9',
  surface: '#FFFFFF',
  text: '#000000',
  textSecondary: '#4A4A4A',
  textMuted: '#9E9E9E',
  border: '#E0E0E0',
  onPrimary: '#FFFFFF',
  backdrop: 'rgba(0,0,0,0.5)',
};

/**
 * Dark Theme Colors
 */
const darkColors = {
  ...baseColors,
  background: '#121212',
  surface: '#1E1E1E',
  text: '#FFFFFF',
  textSecondary: '#E0E0E0',
  textMuted: '#9E9E9E',
  border: '#4A4A4A',
  onPrimary: '#FFFFFF',
  backdrop: 'rgba(0,0,0,0.7)',
};

const theme = {
  light: { colors: lightColors, typography, spacing, radius, shadow },
  dark: { colors: darkColors, typography, spacing, radius, shadow },
};

export default theme;
