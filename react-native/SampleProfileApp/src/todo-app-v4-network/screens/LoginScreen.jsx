import React, { useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authThunks';
import createStyles from '../themes/Styles';

const styles = createStyles();

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.auth);

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Error', 'Username and password cannot be empty.');
      return;
    }
    dispatch(login({ username, password }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <View style={{ marginTop: 10 }} />
      <Button title="Login" onPress={handleLogin} />
      <View style={{ marginTop: 10 }} />
      <Button title="Go to Signup" onPress={() => navigation.navigate('Signup')} />
    </View>
  );
};

export default LoginScreen;
