import type { AuthScreenProps } from '@/navigation/types';

import { useState } from 'react';
import { Alert } from 'react-native';

import { login } from '@/hooks/auth/useAuth';

import Box from '@/components/atoms/Box';
import Button from '@/components/atoms/Button/Button';
import Input from '@/components/atoms/Input/Input';
import PasswordInput from '@/components/atoms/Input/PasswordInput';
import Text from '@/components/atoms/Text';

function LoginScreen({ navigation }: AuthScreenProps<'Login'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login({ email, password }).catch((error: unknown) => {
      if (error instanceof Error) {
        Alert.alert('Login Error', error.message);
      }
    });
  };

  return (
    <Box flex={1} justifyContent="center" padding="xl">
      <Text marginBottom="xl" textAlign="center" variant="header">
        Welcome Back
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
        placeholder="Password" />

      <Button
        containerProps={{ marginBottom: 's' }}
        onPress={handleLogin}
        title="Login" />

      <Button
        onPress={() => { navigation.navigate('Signup'); }}
        title="Don't have an account? Sign Up"
        variant="text"
      />
    </Box>
  );
}

export default LoginScreen;
