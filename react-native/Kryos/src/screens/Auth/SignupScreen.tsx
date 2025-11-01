import type { AuthScreenProps } from '@/navigation/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';

import { signup } from '@/hooks/auth/useAuth';

import Box from '@/components/atoms/Box';
import Button from '@/components/atoms/Button/Button';
import { PasswordInput } from '@/components/atoms/Input';
import Input from '@/components/atoms/Input/Input';
import Text from '@/components/atoms/Text';

import { authErrorKeys } from '@/constants/authErrorMessages';
import { signupSchema, type SignupFormData } from '@/schemas/authSchema';

function SignupScreen({ navigation }: AuthScreenProps<'Signup'>) {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignupFormData>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(signupSchema),
  });

  const handleSignup = (data: SignupFormData) => {
    signup(data)
      .then(() => {
        Alert.alert(
          'Signup Success',
          'Please check your email to confirm your account.',
        );
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          Alert.alert(
            'Signup Error',
            error.message || t(authErrorKeys.SIGNUP_ERROR),
          );
        }
      });
  };

  return (
    <Box flex={1} justifyContent="center" padding="xl">
      <Text marginBottom="xl" textAlign="center" variant="header">
        Create Account
      </Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
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
        render={({ field: { onChange, onBlur, value } }) => (
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
        render={({ field: { onChange, onBlur, value } }) => (
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
