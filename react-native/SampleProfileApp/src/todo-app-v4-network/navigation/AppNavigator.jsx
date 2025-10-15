import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import { useAuth } from '../context/useAuth';
import AllTodosScreen from '../screens/AllTodosScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SignupScreen from '../screens/SignupScreen';
import TodoScreen from '../screens/TodoScreen';
import createStyles from '../themes/Styles';

const Stack = createNativeStackNavigator();
const styles = createStyles();

const AppNavigator = () => {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {token ? (
        <>
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Todo" component={TodoScreen} />
          <Stack.Screen name="AllTodos" component={AllTodosScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
