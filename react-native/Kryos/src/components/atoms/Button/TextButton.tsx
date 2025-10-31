import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import Box from '@/components/atoms/Box';
import Text from '@/components/atoms/Text';

// Constants
const ACTIVE_OPACITY = 0.7;

// TextButton Props
export type TextButtonProps = TouchableOpacityProps & {
    actionText: string;
    containerProps?: React.ComponentProps<typeof Box>;
    disabled?: boolean;
    prefixText?: string;
};

// TextButton Component - For "Already have an account? Login" style buttons
export const TextButton = ({
    actionText,
    containerProps,
    disabled = false,
    prefixText,
    ...props
}: TextButtonProps) => {
    return (
        <Box {...containerProps}>
            <TouchableOpacity
                activeOpacity={ACTIVE_OPACITY}
                disabled={disabled}
                {...props}
            >
                <Box alignItems="center" flexDirection="row" justifyContent="center">
                    {/* Prefix Text (e.g., "Already have an account?") */}
                    {prefixText && (
                        <Text color="textSecondary" fontSize={14} marginRight="xs">
                            {prefixText}
                        </Text>
                    )}

                    {/* Action Text (e.g., "Login") - Primary color */}
                    <Text color="bgPrimary" fontSize={14} fontWeight="600">
                        {actionText}
                    </Text>
                </Box>
            </TouchableOpacity>
        </Box>
    );
};

TextButton.displayName = 'TextButton';

export default TextButton;
