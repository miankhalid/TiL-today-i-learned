import { StyleSheet } from 'react-native';
import theme from './Theme';

const createStyles = (mode = 'light') => {
  const { colors, typography, spacing, radius, shadow } = theme[mode];

  return StyleSheet.create({
    // Containers
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: spacing.lg,
    },
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
      padding: spacing.lg,
    },
    scrollView: {
      flex: 1,
      backgroundColor: colors.background,
      padding: spacing.md,
      paddingBottom: 50,
    },

    // Layout
    row: { flexDirection: 'row', alignItems: 'center' },
    rowBetween: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    center: { justifyContent: 'center', alignItems: 'center' },

    // Text
    heading1: { ...typography.h1, color: colors.text },
    heading2: { ...typography.h2, color: colors.text },
    heading3: { ...typography.h3, color: colors.text },
    body: { ...typography.body, color: colors.textSecondary },
    bodyBold: { ...typography.bodyBold, color: colors.text },
    small: { ...typography.small, color: colors.textMuted },
    tiny: { ...typography.tiny, color: colors.textMuted },

    // Buttons / Pressables
    button: {
      backgroundColor: colors.primary,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
      borderRadius: radius.md,
      alignItems: 'center',
      margin: 10,
    },
    buttonText: { ...typography.bodyBold, color: colors.onPrimary },
    buttonSecondary: {
      backgroundColor: colors.secondary,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
      borderRadius: radius.md,
      alignItems: 'center',
    },
    buttonAccent: {
      backgroundColor: colors.accent,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
      borderRadius: radius.md,
      alignItems: 'center',
    },

    // Inputs
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.sm,
      padding: spacing.md,
      fontSize: typography.body.fontSize,
      color: colors.text,
      backgroundColor: colors.surface,
      marginVertical: spacing.sm,
    },

    // Lists
    listItem: {
      padding: spacing.md,
      backgroundColor: colors.surface,
      borderRadius: radius.sm,
      marginVertical: spacing.xs,
    },
    listItemText: { ...typography.body, color: colors.text },

    // Cards
    card: {
      backgroundColor: colors.surface,
      borderRadius: radius.lg,
      padding: spacing.lg,
      marginVertical: spacing.md,
      ...shadow.sm,
    },

    // Images
    image: {
      width: 100,
      height: 100,
      borderRadius: radius.sm,
      marginVertical: spacing.md,
    },

    // GIF
    gif: {
      width: 200,
      height: 200,
      marginVertical: spacing.md,
    },

    // Modals
    modalBackground: {
      flex: 1,
      backgroundColor: colors.backdrop,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: colors.surface,
      padding: spacing.lg,
      borderRadius: radius.md,
      width: '80%',
    },

    // Utilities
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: spacing.md,
    },
    shadowSm: { ...shadow.sm },
    shadowMd: { ...shadow.md },
    shadowLg: { ...shadow.lg },
  });
};

export default createStyles;
