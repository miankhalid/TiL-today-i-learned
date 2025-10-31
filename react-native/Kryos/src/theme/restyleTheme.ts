import { createTheme } from '@shopify/restyle';

// Palette incorporating the user-requested primary color
const palette = {
  // Primary
  primary: '#2E594D',

  // Blacks & Grays
  black: '#000000',
  white: '#FFFFFF',
  gray1: '#F7F9F9',
  gray2: '#EFF3F4',
  gray3: '#B3B3B3',
  gray4: '#536471',
  gray5: '#2F3336',

  // Supporting colors
  red: '#F91880',
  green: '#00BA7C',
};

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    mainForeground: palette.black,
    cardBackground: palette.white,
    cardBorder: palette.gray2,
    primary: palette.primary,
    secondary: palette.gray4,
    danger: palette.red,
    success: palette.green,
    ...palette,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    header: {
      fontFamily: 'System',
      fontSize: 34,
      fontWeight: 'bold',
      color: 'mainForeground',
    },
    subheader: {
      fontFamily: 'System',
      fontSize: 20,
      fontWeight: '600',
      color: 'mainForeground',
    },
    body: {
      fontFamily: 'System',
      fontSize: 16,
      color: 'mainForeground',
    },
    caption: {
      fontFamily: 'System',
      fontSize: 14,
      color: 'secondary',
    },
    defaults: {
      fontFamily: 'System',
      fontSize: 16,
      color: 'mainForeground',
    },
  },
  cardVariants: {
    defaults: {
      backgroundColor: 'cardBackground',
      borderRadius: 'm',
    },
    bordered: {
      borderWidth: 1,
      borderColor: 'cardBorder',
    },
  },
});

export type Theme = typeof theme;

const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    mainBackground: palette.black,
    mainForeground: palette.white,
    cardBackground: palette.gray5,
    cardBorder: palette.gray5,
    secondary: palette.gray3,
  },
};

export { darkTheme, theme };
