import { forwardRef } from 'react';
import { TextInput as RNTextInput } from 'react-native';

import Input, { InputProps } from './Input';

// Constants
const DEFAULT_MIN_HEIGHT = 80;
const DEFAULT_MAX_HEIGHT = 200;

// Multiline Input Props
export type MultilineInputProps = {
    maxHeight?: number;
    minHeight?: number;
} & Omit<InputProps, 'multiline'>;

// Multiline Input Component (for tweets, replies, etc.)
export const MultilineInput = forwardRef<RNTextInput, MultilineInputProps>(
    (
        { maxHeight = DEFAULT_MAX_HEIGHT, minHeight = DEFAULT_MIN_HEIGHT, style, ...props },
        reference
    ) => {
        return (
            <Input
                multiline
                ref={reference}
                style={[
                    style,
                    {
                        maxHeight,
                        minHeight,
                    },
                ]}
                textAlignVertical="top"
                {...props}
            />
        );
    }
);

MultilineInput.displayName = 'MultilineInput';

export default MultilineInput;
