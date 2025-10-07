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
      justifyContent: 'center',
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
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.xs,
      flexWrap: 'nowrap', // ensure row doesn't wrap; text will wrap inside its box
    },
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
    title: { ...typography.h2, color: colors.text, textAlign: 'center', marginBottom: spacing.lg },
    body: {
      ...typography.body,
      color: colors.textSecondary,
      flex: 1,           // take remaining space
      flexShrink: 1,     // allow shrinking so it doesn't push buttons away
      minWidth: 0,       // important on some RN versions so flexShrink works correctly
      flexWrap: 'wrap',  // allow multi-line text
    },
    bodyBold: { ...typography.bodyBold, color: colors.text },
    small: { ...typography.small, color: colors.textMuted },
    tiny: { ...typography.tiny, color: colors.textMuted },
    errorText: { ...typography.body, color: colors.error, textAlign: 'center', marginBottom: spacing.md },

    // Actions container (group buttons)
    actions: {
      flexDirection: 'row',
      alignItems: 'center',
      flexShrink: 0, // don't let the button group shrink
    },

    // Buttons / Pressables
    button: {
      backgroundColor: colors.primary,
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
      borderRadius: radius.sm,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: spacing.xs, // minimal spacing between buttons
      flexShrink: 0, // ensure buttons don't shrink
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
      height: 40,
      borderColor: colors.border,
      borderWidth: 1,
      marginBottom: spacing.md,
      paddingHorizontal: spacing.sm,
      borderRadius: radius.sm,
      color: colors.text,
      backgroundColor: colors.surface,
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
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        alignSelf: 'center',
        marginVertical: spacing.lg,
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

    // SectionList
    sectionHeader: {
      backgroundColor: colors.surface,
      padding: spacing.sm,
      fontWeight: 'bold',
    },
  });
};

export default createStyles;