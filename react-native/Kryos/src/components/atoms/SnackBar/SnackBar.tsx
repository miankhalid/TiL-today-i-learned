import { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';

import Box from '@/components/atoms/Box';
import Text from '@/components/atoms/Text';

type SnackBarProps = {
  duration?: 'long' | 'short' | number; // in ms
  message: string;
  onDismiss: () => void;
  variant?: 'default' | 'error' | 'info' | 'success' | 'warning';
  visible: boolean;
};

const SHORT_TIMEOUT_MS = 2000;
const LONG_TIMEOUT_MS = 3500;
const AUTO_DISAPPEAR_TIME_MS = 300;

function SnackBar({ duration = 'short', message, onDismiss, variant = 'default', visible }: SnackBarProps) {
  const [isVisible, setIsVisible] = useState(visible);

  // Handle visibility changes
  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  // Handle auto-dismissal
  useEffect(() => {
    if (!isVisible) return;

    let timeoutId: NodeJS.Timeout;

    if (duration === 'short') {
      timeoutId = setTimeout(() => setIsVisible(false), SHORT_TIMEOUT_MS);
    } else if (duration === 'long') {
      timeoutId = setTimeout(() => setIsVisible(false), LONG_TIMEOUT_MS);
    } else if (typeof duration === 'number') {
      timeoutId = setTimeout(() => setIsVisible(false), duration);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isVisible, duration]);

  // Handle when dismissed automatically
  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => {
        onDismiss();
      }, AUTO_DISAPPEAR_TIME_MS); // Allow time for animation to complete

      return () => clearTimeout(timer);
    }
  }, [isVisible, onDismiss]);

  if (!isVisible) return null;

  // Determine colors based on variant
  let backgroundColor: 'bgSurface' | 'statusError' | 'statusInfo' | 'statusSuccess' | 'statusWarning' = 'bgSurface';
  let textColor: 'black' | 'textPrimary' | 'white' = 'textPrimary';

  switch (variant) {
    case 'error':
      backgroundColor = 'statusError';
      textColor = 'white';
      break;
    case 'info':
      backgroundColor = 'statusInfo';
      textColor = 'white';
      break;
    case 'success':
      backgroundColor = 'statusSuccess';
      textColor = 'white';
      break;
    case 'warning':
      backgroundColor = 'statusWarning';
      textColor = 'black';
      break;
    default:
      backgroundColor = 'bgSurface';
      textColor = 'textPrimary';
  }

  return (
    <Box
      alignItems="center"
      backgroundColor={backgroundColor}
      bottom={0}
      elevation={5}
      flexDirection="row"
      left={0}
      padding="m"
      paddingHorizontal="l"
      position="absolute"
      right={0}
      zIndex={999}
    >
      <StatusBar backgroundColor={backgroundColor} />
      <Text
        color={textColor}
        flex={1}
        variant="body"
      >
        {message}
      </Text>
    </Box>
  );
}

export default SnackBar;