import { forwardRef } from 'react';
import { TextInput as RNTextInput } from 'react-native';

import Input, { InputProps } from './Input';

// Constants
const DEFAULT_MIN_HEIGHT = 80;
const DEFAULT_MAX_HEIGHT = 200;

// Multiline Input Props
export type MultilineInputProps = Omit<InputProps, 'multiline'> & {
    maxHeight?: number;
    minHeight?: number;
};

// Multiline Input Component (for tweets, replies, etc.)
export const MultilineInput = forwardRef<RNTextInput, MultilineInputProps>(
    (
        { maxHeight = DEFAULT_MAX_HEIGHT, minHeight = DEFAULT_MIN_HEIGHT, style, ...props },
        reference
    ) => {
        return (
            <Input
                ref={reference}
                multiline
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
