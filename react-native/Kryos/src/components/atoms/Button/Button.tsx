import { useTheme } from '@shopify/restyle';
import React from 'react';
import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { Theme } from '@/theme/restyleTheme';

import Box from '@/components/atoms/Box';
import Text from '@/components/atoms/Text';

// Constants
const ACTIVE_OPACITY = 0.7;
const DISABLED_OPACITY = 0.5;
const SPINNER_SIZE = 20;

// Button Props
export type ButtonProps = {
  containerProps?: React.ComponentProps<typeof Box>;
  disabled?: boolean;
  loading?: boolean;
  rightIcon?: React.ReactNode;
  title: string;
  variant?: 'primary' | 'text';
} & TouchableOpacityProps;

// Button Component
export const Button = ({
  containerProps, 
  disabled = false,
  loading = false,
  rightIcon,
  title,
  variant = 'primary',
  ...props
}: ButtonProps) => {
  const theme = useTheme<Theme>();
  const isDisabled = disabled || loading;

  // Variant configurations
  const variantStyles = {
    primary: {
      backgroundColor: 'bgPrimary' as const,
      borderRadius: 'm' as const,
      paddingHorizontal: 'l' as const,
      paddingVertical: 'm' as const,
      textColor: 'white' as const,
    },
    text: {
      backgroundColor: 'transparent' as const,
      borderRadius: undefined,
      paddingHorizontal: 'l' as const,
      paddingVertical: 'm' as const,
      textColor: 'bgPrimary' as const,
    },
  };

  const styles = variantStyles[variant];

  return (
    <Box {...containerProps}>
      <TouchableOpacity
        activeOpacity={ACTIVE_OPACITY}
        disabled={isDisabled}
        {...props}
      >
        <Box
          alignItems="center"
          backgroundColor={styles.backgroundColor}
          borderRadius={styles.borderRadius}
          flexDirection="row"
          justifyContent="center"
          opacity={isDisabled ? DISABLED_OPACITY : 1}
          paddingHorizontal={styles.paddingHorizontal}
          paddingVertical={styles.paddingVertical}
        >
          {/* Button Text */}
          <Text
            color={styles.textColor}
            fontSize={16}
            fontWeight="600"
            textAlign="center"
          >
            {title}
          </Text>

          {/* Right Icon or Spinner */}
          {loading ? (
            <Box marginLeft="s" position="absolute" right={16}>
              <ActivityIndicator
                color={variant === 'primary' ? theme.colors.white : theme.colors.primary}
                size={SPINNER_SIZE}
              />
            </Box>
          ) : (
            rightIcon && <Box marginLeft="s">{rightIcon}</Box>
          )}
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

Button.displayName = 'Button';

export default Button;
