import { useTheme } from '@shopify/restyle';
import React, { forwardRef, useState } from 'react';
import {
    TextInput as RNTextInput,
    TextInputProps as RNTextInputProps,
    TouchableOpacity,
} from 'react-native';

import { Theme } from '@/theme/restyleTheme';

import Box from '@/components/atoms/Box';
import Text from '@/components/atoms/Text';

// Constants
const DISABLED_OPACITY = 0.6;
const INPUT_FONT_SIZE = 16;
const INPUT_PADDING_VERTICAL = 8;

// Base Input Props
export type InputProps = {
    characterLimit?: number;
    clearable?: boolean;
    containerProps?: React.ComponentProps<typeof Box>;
    error?: string;
    hint?: string;
    label?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    variant?: 'default' | 'filled' | 'outlined';
} & Omit<RNTextInputProps, 'placeholderTextColor'>;

// Base TextInput Component
export const Input = forwardRef<RNTextInput, InputProps>(
    (
        {
            characterLimit,
            clearable = false,
            containerProps,
            editable = true,
            error,
            hint,
            label,
            leftIcon,
            onChangeText,
            rightIcon,
            value,
            variant = 'outlined',
            ...props
        },
        reference
    ) => {
        const theme = useTheme<Theme>();
        const [isFocused, setIsFocused] = useState(false);
        const hasError = !!error;
        const currentLength = value?.length ?? 0;
        const isOverLimit = characterLimit ? currentLength > characterLimit : false;

        const handleClear = () => {
            onChangeText?.('');
        };

        // Determine border color based on state
        const getBorderColor = () => {
            if (hasError) return 'borderError';
            if (isFocused) return 'borderFocused';
            return 'borderDefault';
        };

        // Determine background color based on variant
        const getBackgroundColor = () => {
            if (!editable) return 'gray2';
            if (variant === 'filled') return 'bgSurface';
            return 'bgBackground';
        };

        return (
            <Box {...containerProps}>
                {/* Label */}
                {label && (
                    <Text
                        color={hasError ? 'textError' : 'textSecondary'}
                        marginBottom="xs"
                        variant="label"
                    >
                        {label}
                    </Text>
                )}

                {/* Input Container */}
                <Box
                    alignItems="center"
                    backgroundColor={getBackgroundColor()}
                    borderBottomWidth={variant === 'default' ? 1 : variant === 'outlined' ? 1 : 0}
                    borderColor={getBorderColor()}
                    borderRadius={variant === 'outlined' ? 'm' : 's'}
                    borderWidth={variant === 'outlined' ? 1 : 0}
                    flexDirection="row"
                    opacity={editable ? 1 : DISABLED_OPACITY}
                    paddingHorizontal="m"
                    paddingVertical="s"
                >
                    {/* Left Icon */}
                    {leftIcon && <Box marginRight="s">{leftIcon}</Box>}

                    {/* Text Input */}
                    <RNTextInput
                        editable={editable}
                        onBlur={(event) => {
                            setIsFocused(false);
                            props.onBlur?.(event);
                        }}
                        onChangeText={onChangeText}
                        onFocus={(event) => {
                            setIsFocused(true);
                            props.onFocus?.(event);
                        }}
                        placeholderTextColor={theme.colors.gray5}
                        ref={reference}
                        style={{
                            color: hasError ? theme.colors.error : theme.colors.text,
                            flex: 1,
                            fontFamily: 'System',
                            fontSize: INPUT_FONT_SIZE,
                            paddingVertical: INPUT_PADDING_VERTICAL,
                        }}
                        value={value}
                        {...props}
                    />

                    {/* Right Side Icons */}
                    <Box alignItems="center" flexDirection="row">
                        {/* Clear Button */}
                        {clearable && value && value.length > 0 && editable && (
                            <TouchableOpacity onPress={handleClear}>
                                <Box marginLeft="s" padding="xs">
                                    <Text color="textSecondary" fontSize={18}>
                                        ✕
                                    </Text>
                                </Box>
                            </TouchableOpacity>
                        )}

                        {/* Right Icon */}
                        {rightIcon && <Box marginLeft="s">{rightIcon}</Box>}
                    </Box>
                </Box>

                {/* Character Counter / Error / Hint */}
                <Box flexDirection="row" justifyContent="space-between" marginTop="xs">
                    <Box flex={1}>
                        {error && (
                            <Text color="textError" variant="caption">
                                {error}
                            </Text>
                        )}
                        {!error && hint && (
                            <Text color="textHint" variant="caption">
                                {hint}
                            </Text>
                        )}
                    </Box>

                    {characterLimit && (
                        <Text
                            color={isOverLimit ? 'textError' : 'textHint'}
                            marginLeft="s"
                            variant="caption"
                        >
                            {currentLength}/{characterLimit}
                        </Text>
                    )}
                </Box>
            </Box>
        );
    }
);

Input.displayName = 'Input';

export default Input;
