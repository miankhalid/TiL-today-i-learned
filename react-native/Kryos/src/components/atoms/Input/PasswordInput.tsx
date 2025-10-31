import { forwardRef, useState } from 'react';
import { TextInput as RNTextInput, TouchableOpacity } from 'react-native';

import Text from '@/components/atoms/Text';

import Input, { InputProps } from './Input';

// Password Input Props
export type PasswordInputProps = Omit<InputProps, 'rightIcon' | 'secureTextEntry'>;

// Password Input Component with show/hide toggle
export const PasswordInput = forwardRef<RNTextInput, PasswordInputProps>(
    (props, reference) => {
        const [showPassword, setShowPassword] = useState(false);

        return (
            <Input
                ref={reference}
                rightIcon={
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Text color="textSecondary" fontSize={20}>
                            {showPassword ? '👁️' : '👁️‍🗨️'}
                        </Text>
                    </TouchableOpacity>
                }
                secureTextEntry={!showPassword}
                {...props}
            />
        );
    }
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
