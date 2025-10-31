import type { BoxProps } from '@/components/atoms/Box';
import type { Theme } from '@/theme/restyleTheme';

import { Pressable } from 'react-native';

import Box from '@/components/atoms/Box';
import Text from '@/components/atoms/Text';

export type ButtonProps = {
  readonly disabled?: boolean;
  readonly label: string;
  readonly onPress: () => void;
  readonly variant?: keyof Theme['buttonVariants'];
} & Omit<BoxProps, 'onPress'>;

function Button({ disabled = false, label, onPress, variant = 'primary', ...rest }: ButtonProps) {
  return (
    <Pressable disabled={disabled} onPress={onPress}>
      <Box
        variant={variant}
        {...rest}
      >
        <Text>{label}</Text>
      </Box>
    </Pressable>
  );
}

export default Button;
