import { forwardRef } from 'react';
import { TextInput as RNTextInput } from 'react-native';

import Text from '@/components/atoms/Text';

import Input, { InputProps } from './Input';

// Search Input Props
export type SearchInputProps = Omit<InputProps, 'clearable' | 'leftIcon'> & {
    onSearch?: (query: string) => void;
};

// Search Input Component
export const SearchInput = forwardRef<RNTextInput, SearchInputProps>(
    ({ onSearch, ...props }, reference) => {
        return (
            <Input
                ref={reference}
                clearable
                leftIcon={
                    <Text color="textSecondary" fontSize={18}>
                        🔍
                    </Text>
                }
                onSubmitEditing={(event) => {
                    onSearch?.(event.nativeEvent.text);
                    props.onSubmitEditing?.(event);
                }}
                placeholder="Search..."
                returnKeyType="search"
                {...props}
            />
        );
    }
);

SearchInput.displayName = 'SearchInput';

export default SearchInput;
