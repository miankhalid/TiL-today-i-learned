import { createTheme } from '@shopify/restyle';

// Define color palette
const palette = {
  background: '#FFFFFF',
  black: '#000000',
  border: '#DEE2E6',
  error: '#DC3545',
  gray1: '#F8F9FA',
  gray2: '#E9ECEF',
  gray3: '#DEE2E6',
  gray4: '#CED4DA',
  gray5: '#ADB5BD',
  gray6: '#6C757D',
  gray7: '#495057',
  gray8: '#343A40',
  gray9: '#212529',
  info: '#17A2B8',
  primary: '#2E594D',
  primaryVariant: '#1E3F34',
  secondary: '#6C757D',
  success: '#28A745',
  surface: '#F8F9FA',
  text: '#212529',
  textSecondary: '#6C757D',
  transparent: 'transparent',
  warning: '#FFC107',
  white: '#FFFFFF',
};

// Define spacing scale
const spacing = {
  l: 24,
  m: 16,
  s: 8,
  xl: 32,
  xs: 4,
  xxl: 48,
};

// Define breakpoints
const breakpoints = {
  phone: 0,
  tablet: 768,
};

// Create the base theme
const baseTheme = {
  borderRadii: {
    l: 12,
    m: 8,
    round: 9999, // For circular elements
    s: 4,
    xl: 16,
  },
  breakpoints,
  buttonVariants: {
    outlined: {
      backgroundColor: 'transparent',
      borderColor: 'bgPrimary',
      borderRadius: 'm',
      borderWidth: 1,
      paddingHorizontal: 'l',
      paddingVertical: 'm',
    },
    primary: {
      backgroundColor: 'bgPrimary',
      borderRadius: 'm',
      paddingHorizontal: 'l',
      paddingVertical: 'm',
    },
    secondary: {
      backgroundColor: 'bgSecondary',
      borderRadius: 'm',
      paddingHorizontal: 'l',
      paddingVertical: 'm',
    },
    text: {
      backgroundColor: 'transparent',
      paddingHorizontal: 'l',
      paddingVertical: 'm',
    },
  },
  cardVariants: {
    default: {
      backgroundColor: 'bgSurface',
      borderRadius: 'l',
      elevation: 3,
      marginHorizontal: 's',
      marginVertical: 's',
      padding: 'm',
      shadowColor: 'gray8',
      shadowOffset: { height: 2, width: 0 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    outlined: {
      backgroundColor: 'bgSurface',
      borderColor: 'borderDefault',
      borderRadius: 'l',
      borderWidth: 1,
      marginHorizontal: 's',
      marginVertical: 's',
      padding: 'm',
    },
  },
  colors: {
    ...palette,
    // Background colors
    bgBackground: palette.background,
    bgPrimary: palette.primary,
    bgSecondary: palette.secondary,
    bgSurface: palette.surface,

    // Text colors
    textError: palette.error,
    textHint: palette.gray5,
    textPrimary: palette.text,
    textSecondary: palette.textSecondary,

    // Border colors
    borderDefault: palette.border,
    borderError: palette.error,
    borderFocused: palette.primary,

    // Status colors
    statusError: palette.error,
    statusInfo: palette.info,
    statusSuccess: palette.success,
    statusWarning: palette.warning,
  },
  spacing,
  textVariants: {
    body: {
      color: 'textPrimary',
      fontFamily: 'System',
      fontSize: 16,
    },
    button: {
      color: 'white',
      fontFamily: 'System',
      fontSize: 16,
      fontWeight: '600',
    },
    caption: {
      color: 'textSecondary',
      fontFamily: 'System',
      fontSize: 12,
    },
    defaults: {
      color: 'textPrimary',
      fontFamily: 'System',
      fontSize: 16,
    },
    header: {
      color: 'textPrimary',
      fontFamily: 'System',
      fontSize: 24,
      fontWeight: 'bold',
    },
    heading: {
      color: 'textPrimary',
      fontFamily: 'System',
      fontSize: 24,
      fontWeight: 'bold',
    },
    label: {
      color: 'textSecondary',
      fontFamily: 'System',
      fontSize: 14,
      fontWeight: '500',
    },
    subheading: {
      color: 'textPrimary',
      fontFamily: 'System',
      fontSize: 20,
      fontWeight: '600',
    },
  },
};

const theme = createTheme(baseTheme);

export type Theme = typeof theme;

// Dark theme variant
const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    // Background colors
    bgBackground: palette.black,
    bgSurface: palette.gray9,

    // Text colors
    textHint: palette.gray5,
    textPrimary: palette.white,
    textSecondary: palette.gray4,

    // Border colors
    borderDefault: palette.gray7,
    borderFocused: palette.primary,

    // Status colors (may remain same or be adjusted)
    statusError: palette.error,
    statusInfo: palette.info,
    statusSuccess: palette.success,
    statusWarning: palette.warning,
  },
};

export { darkTheme, theme };

