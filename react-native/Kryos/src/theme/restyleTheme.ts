import { createTheme } from '@shopify/restyle';

// Palette incorporating the user-requested primary color
const palette = {
  // Primary
  primary: '#2E594D',

  // Blacks & Grays
  black: '#000000',
  gray1: '#F7F9F9',
  gray2: '#EFF3F4',
  gray3: '#B3B3B3',
  gray4: '#536471',
  gray5: '#2F3336',
  white: '#FFFFFF',

  // Supporting colors
  green: '#00BA7C',
  red: '#F91880',
};

const theme = createTheme({
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  buttonVariants: {
    primary: {
      alignItems: 'center',
      backgroundColor: 'primary',
      borderRadius: 's',
      color: 'white', // Text color
      fontSize: 16,
      fontWeight: 'bold',
      padding: 'm',
    },
    secondary: {
      alignItems: 'center',
      backgroundColor: 'secondary',
      borderRadius: 's',
      color: 'white', // Text color
      fontSize: 16,
      fontWeight: 'bold',
      padding: 'm',
    },
  },
  colors: {
    cardBackground: palette.white,
    cardBorder: palette.gray2,
    danger: palette.red,
    mainBackground: palette.white,
    mainForeground: palette.black,
    primary: palette.primary,
    secondary: palette.gray4,
    success: palette.green,
    ...palette,
  },
  spacing: {
    l: 24,
    m: 16,
    s: 8,
    xl: 40,
  },
  textVariants: {
    body: {
      fontSize: 16,
    },
    defaults: {
      color: 'mainForeground',
      fontSize: 16,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  },
});

export type Theme = typeof theme;

const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    cardBackground: palette.gray5,
    cardBorder: palette.gray5,
    mainBackground: palette.black,
    mainForeground: palette.white,
    secondary: palette.gray3,
  },
};

export { darkTheme, theme };
