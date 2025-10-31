import type { RootScreenProps } from '@/navigation/types';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Text } from 'react-native';

import { Paths } from '@/navigation/paths';
import { useAppTheme } from '@/theme/hooks/useTheme';

import Box from '@/components/atoms/Box';
import { SafeScreen } from '@/components/templates';

function Startup({ navigation }: RootScreenProps<Paths.Startup>) {
  const { colors } = useAppTheme();
  const { t } = useTranslation();

  const { isError, isFetching, isSuccess } = useQuery({
    queryFn: () => {
      return Promise.resolve(true);
    },
    queryKey: ['startup'],
  });

  useEffect(() => {
    if (isSuccess) {
      navigation.reset({
        index: 0,
        routes: [{ name: Paths.Example }],
      });
    }
  }, [isSuccess, navigation]);

  return (
    <SafeScreen>
      <Box
        alignItems="center"
        flex={1}
        flexDirection="column"
        justifyContent="center"
      >
        {isFetching ? (
          <ActivityIndicator size="large" style={{ marginVertical: 24 }} />
        ) : undefined}
        {isError ? (
          <Text style={{ color: colors.red }} variant="body">{t('common_error')}</Text>
        ) : undefined}
      </Box>
    </SafeScreen>
  );
}

export default Startup;
