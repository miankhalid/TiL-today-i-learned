import type { RootStackParamList } from '@/navigation/types';
import type { StackNavigationProp } from '@react-navigation/stack';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '@/hooks/auth/useAuth';
import i18n from '@/translations';

import Box from '@/components/atoms/Box';
import Button from '@/components/atoms/Button/Button';
import Input from '@/components/atoms/Input/Input';
import PasswordInput from '@/components/atoms/Input/PasswordInput';
import Text from '@/components/atoms/Text';

import { authErrorKeys } from '@/constants/authErrorMessages';
import { type LoginFormData, loginSchema } from '@/schemas/authSchema';
import { clearError, setLoading } from '@/store/slices/authSlice';
import { RootState } from '@/store/store';

type LoginScreenNavigationProperty = StackNavigationProp<RootStackParamList, 'Login'>;

function LoginScreen({ navigation }: { navigation: LoginScreenNavigationProperty }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoading = useSelector<RootState, boolean>(s => s.auth.isLoading);


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

  const handleLogin = async (data: LoginFormData) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      await login(data);
      // After successful login, navigation will automatically happen to #HomeScreen
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Login Error', error.message || t(authErrorKeys.LOGIN_ERROR));
        dispatch(setError(error.message || t(authErrorKeys.LOGIN_ERROR)));
      }
    } finally {
      dispatch(setLoading(false));
    }
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
        loading={isLoading}
        onPress={() => {
          void handleSubmit(handleLogin)();
        }}
        title="Login"
      />

      <Button
        containerProps={{ marginBottom: 's' }}
        onPress={() => {
          navigation.navigate('Signup');
        }}
        title="Don't have an account? Sign Up"
        variant="text"
      />

      <Button
        onPress={() => {
          navigation.navigate('Feed');
        }}
        title="Back to Feed"
        variant="text"
      />
    </Box>
  );
}

export default LoginScreen;