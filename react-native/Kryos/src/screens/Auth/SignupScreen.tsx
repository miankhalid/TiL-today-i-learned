import type { AuthScreenProps } from '@/navigation/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { signup } from '@/hooks/auth/useAuth';

import Box from '@/components/atoms/Box';
import Button from '@/components/atoms/Button/Button';
import { PasswordInput } from '@/components/atoms/Input';
import Input from '@/components/atoms/Input/Input';
import Text from '@/components/atoms/Text';

import { authErrorKeys } from '@/constants/authErrorMessages';
import { type SignupFormData, signupSchema } from '@/schemas/authSchema';
import { clearError, setLoading } from '@/store/slices/authSlice';
import { RootState } from '@/store/store';

function SignupScreen({ navigation }: AuthScreenProps<'Signup'>) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoading = useSelector<RootState, boolean>(s => s.auth.isLoading);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignupFormData>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(signupSchema),
  });

  const handleSignup = async (data: SignupFormData) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      await signup(data)
        .then(() => {
          Alert.alert(
            'Signup Success',
            'Please check your email to confirm your account.',
          );
        });
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert(
          'Signup Error',
          error.message || t(authErrorKeys.SIGNUP_ERROR),
        );
        dispatch(setError(error.message || t(authErrorKeys.SIGNUP_ERROR)));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Box flex={1} justifyContent="center" padding="xl">
      <Text marginBottom="xl" textAlign="center" variant="header">
        Create Account
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

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onBlur, onChange, value } }) => (
          <PasswordInput
            containerProps={{ marginBottom: 'm' }}
            error={
              errors.confirmPassword?.message
                ? t(errors.confirmPassword.message)
                : undefined
            }
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Confirm Password"
            value={value}
          />
        )}
      />

      <Button
        containerProps={{ marginBottom: 's' }}
        loading={isLoading}
        onPress={() => {
          void handleSubmit(handleSignup)();
        }}
        title="Sign Up"
      />

      <Button
        onPress={() => {
          navigation.navigate('Login');
        }}
        title="Already have an account? Login"
        variant="text"
      />
    </Box>
  );
}

export default SignupScreen;