import type { AuthScreenProps } from '@/navigation/types';

import { useState } from 'react';
import { Alert } from 'react-native';

import { signup } from '@/hooks/auth/useAuth';

import Box from '@/components/atoms/Box';
import Button from '@/components/atoms/Button/Button';
import { PasswordInput } from '@/components/atoms/Input';
import Input from '@/components/atoms/Input/Input';
import Text from '@/components/atoms/Text';

function SignupScreen({ navigation }: AuthScreenProps<'Signup'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    if (password !== confirmPassword) {
      Alert.alert('Signup Error', 'Passwords do not match');
      return;
    }

    signup({ email, password })
      .then(() => {
        Alert.alert('Signup Success', 'Please check your email to confirm your account.');
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          Alert.alert('Signup Error', error.message);
        }
      });
  };

  return (
    <Box flex={1} justifyContent="center" padding="xl">
      <Text marginBottom="xl" textAlign="center" variant="header">
        Create Account
      </Text>

      <Input
        autoCapitalize='none'
        containerProps={{ marginBottom: 'm' }}
        onChangeText={setEmail}
        placeholder="Email"
        value={email} />

      <PasswordInput
        containerProps={{ marginBottom: 'm' }}
        onChangeText={setPassword}
        placeholder="Password"
        value={password} />

      <PasswordInput
        containerProps={{ marginBottom: 'm' }}
        onChangeText={setConfirmPassword}
        placeholder="Confirm Password"
        value={confirmPassword} />

      <Button containerProps={{ marginBottom: 's' }}
        onPress={handleSignup}
        title="Sign Up"
      />

      <Button
        onPress={() => { navigation.navigate('Login'); }}
        title="Already have an account? Login"
        variant="text"
      />
    </Box>
  );
}

export default SignupScreen;
