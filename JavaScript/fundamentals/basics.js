"use strict";   // https://javascript.info/strict-mode

/**
 * Alerting and semi-colons
 */
// Correct
alert("Hello");
[1, 2].forEach(alert);

// Wrong - due to semi colons missing
alert("Hello")
[1, 2].forEach(alert);
