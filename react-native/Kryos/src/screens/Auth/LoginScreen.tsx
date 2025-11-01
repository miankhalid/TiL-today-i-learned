import type { AuthScreenProps } from '@/navigation/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';

import { login } from '@/hooks/auth/useAuth';
import i18n from '@/translations';

import Box from '@/components/atoms/Box';
import Button from '@/components/atoms/Button/Button';
import Input from '@/components/atoms/Input/Input';
import PasswordInput from '@/components/atoms/Input/PasswordInput';
import Text from '@/components/atoms/Text';

import { authErrorKeys } from '@/constants/authErrorMessages';
import { type LoginFormData, loginSchema } from '@/schemas/authSchema';

function LoginScreen({ navigation }: AuthScreenProps<'Login'>) {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = (data: LoginFormData) => {
    login(data).catch((error: unknown) => {
      if (error instanceof Error) {
        Alert.alert('Login Error', error.message || t(authErrorKeys.LOGIN_ERROR));
      }
    });
  };

  // keeping these logs for debugging translations
  console.log('Translation test:', t('auth.email_required'));
  console.log('Error message:', errors.email?.message);
  console.log('Has translations?', i18n.hasResourceBundle('en-EN', 'kryos'));
  console.log('Get translation:', i18n.t('auth.email_required', { ns: 'kryos' }));

  return (
    <Box flex={1} justifyContent="center" padding="xl">
      <Text marginBottom="xl" textAlign="center" variant="header">
        Welcome Back
      </Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onBlur, onChange, value } }) => (
          <Input
            autoCapitalize="none"
            containerProps={{ marginBottom: 'm' }}
            error={errors.email?.message ? t(errors.email.message) : undefined}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Email"
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onBlur, onChange, value } }) => (
          <PasswordInput
            containerProps={{ marginBottom: 'm' }}
            error={
              errors.password?.message ? t(errors.password.message) : undefined
            }
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Password"
            value={value}
          />
        )}
      />

      <Button
        containerProps={{ marginBottom: 's' }}
        onPress={() => {
          void handleSubmit(handleLogin)();
        }}
        title="Login"
      />

      <Button
        onPress={() => {
          navigation.navigate('Signup');
        }}
        title="Don't have an account? Sign Up"
        variant="text"
      />
    </Box>
  );
}

export default LoginScreen;
