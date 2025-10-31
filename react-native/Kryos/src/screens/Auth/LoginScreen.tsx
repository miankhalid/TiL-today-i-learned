import type { AuthScreenProps } from '@/navigation/types';

import { useState } from 'react';

import Box from '@/components/atoms/Box';
import Button from '@/components/atoms/Button/Button';
import Input from '@/components/atoms/Input/Input';
import Text from '@/components/atoms/Text';

function LoginScreen({ navigation }: AuthScreenProps<'Login'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleLogin = () => {
    // Login logic will be added in the next step
  };

  return (
    <Box flex={1} justifyContent="center" padding="xl">
      <Text marginBottom="xl" textAlign="center" variant="header">
        Welcome Back
      </Text>
      <Input
        autoCapitalize="none"
        borderColor="mainForeground"
        borderRadius="s"
        borderWidth={1}
        marginBottom="m"
        onChangeText={setEmail}
        padding="m"
        placeholder="Email"
        value={email}
      />
      <Input
        borderColor="mainForeground"
        borderRadius="s"
        borderWidth={1}
        marginBottom="m"
        onChangeText={setPassword}
        padding="m"
        placeholder="Password"
        secureTextEntry
        value={password}
      />
      <Button label="Login" marginBottom="m" onPress={handleLogin} />
      <Button
        label="Don't have an account? Sign Up"
        onPress={() => { navigation.navigate('Signup'); }}
        variant="secondary"
      />
    </Box>
  );
}

export default LoginScreen;
