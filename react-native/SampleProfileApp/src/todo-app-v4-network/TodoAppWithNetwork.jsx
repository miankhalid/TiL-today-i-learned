import React from 'react';
import { AuthProvider } from './context/AuthContext';
import AppNavigator from './navigation/AppNavigator';

const TodoAppWithNetwork = () => {
  console.log('Rendering TodoAppWithNetwork');
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default TodoAppWithNetwork;
