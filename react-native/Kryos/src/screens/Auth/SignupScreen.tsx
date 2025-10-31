import type { AuthScreenProps } from '@/navigation/types';

import { useState } from 'react';

import Box from '@/components/atoms/Box';
import Button from '@/components/atoms/Button/Button';
import Input from '@/components/atoms/Input/Input';
import Text from '@/components/atoms/Text';

function SignupScreen({ navigation }: AuthScreenProps<'Signup'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleSignup = () => {
    // Signup logic will be added in the next step
  };

  return (
    <Box flex={1} justifyContent="center" padding="xl">
      <Text marginBottom="xl" textAlign="center" variant="header">
        Create Account
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
      <Input
        borderColor="mainForeground"
        borderRadius="s"
        borderWidth={1}
        marginBottom="m"
        onChangeText={setConfirmPassword}
        padding="m"
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
      />
      <Button label="Sign Up" marginBottom="m" onPress={handleSignup} />
      <Button
        label="Already have an account? Login"
        onPress={() => { navigation.navigate('Login'); }}
        variant="secondary"
      />
    </Box>
  );
}

export default SignupScreen;
