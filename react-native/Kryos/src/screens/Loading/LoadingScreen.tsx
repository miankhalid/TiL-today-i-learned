import { ActivityIndicator } from 'react-native';

import Box from '@/components/atoms/Box';

function LoadingScreen() {
  return (
    <Box alignItems="center" flex={1} justifyContent="center">
      <ActivityIndicator size="large" />
    </Box>
  );
}

export default LoadingScreen;
