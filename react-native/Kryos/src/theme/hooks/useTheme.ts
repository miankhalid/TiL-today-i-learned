import type { Theme } from '../restyleTheme';
import type { ThemeContextType } from '../ThemeProvider/ThemeProvider';

import { useTheme as useRestyleTheme } from '@shopify/restyle';
import { useContext } from 'react';

import { ThemeContext } from '../ThemeProvider/ThemeProvider';

/**
 * Hook for accessing the Restyle theme object for styling.
 */
export const useAppTheme = () => useRestyleTheme<Theme>();

/**
 * Hook for managing the theme (switching between light/dark).
 */
export const useThemeManager = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useThemeManager must be used within a ThemeProvider');
  }

  return context;
};
