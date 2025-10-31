import { createBox } from '@shopify/restyle';
import { TextInput } from 'react-native';

import { Theme } from '@/theme/restyleTheme';

const Input = createBox<Theme, { children?: React.ReactNode } & React.ComponentProps<typeof TextInput>>(
  TextInput,
);

export type InputProps = React.ComponentProps<typeof Input>;

export default Input;
