import {
    border,
    BorderProps,
    createRestyleComponent,
    layout,
    LayoutProps,
    spacing,
    SpacingProps
} from '@shopify/restyle';
import { ImageProps, Image as RNImage } from 'react-native';

import { Theme } from '@/theme/restyleTheme';

// Define the props your Image component will accept from Restyle
type RestyleImageProps = BorderProps<Theme> & ImageProps &
    LayoutProps<Theme> & SpacingProps<Theme>;

// Create the component
const Image = createRestyleComponent<RestyleImageProps, Theme>([
    layout,
    spacing,
    border,
], RNImage);

export default Image;
