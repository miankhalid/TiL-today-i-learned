import React, { useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { signup } from '../store/authThunks';
import createStyles from '../themes/Styles';

const styles = createStyles();

const SignupScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSignup = async () => {
    if (!firstName || !lastName || !email || !password) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    const userData = { firstName, lastName, email, password };
    const result = await dispatch(signup(userData));
    
    console.log('Signup result:', result);
    console.log('Signup object:', signup);
    console.log('Signup fulfilled:', typeof signup.fulfilled);
    
    if (signup.fulfilled.match(result)) {
      Alert.alert('Success', 'You have successfully registered. Please login to continue.', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={{ marginTop: 10 }} />
      <Button title="Sign Up" onPress={handleSignup} />
      <View style={{ marginTop: 10 }} />
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default SignupScreen;
