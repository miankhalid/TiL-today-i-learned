import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { TodoProvider } from './context/TodoContext';
import AppNavigator from './navigation/AppNavigator';

const TodoAppWithNetwork = () => {
  console.log('Rendering TodoAppWithNetwork');
  return (
    <AuthProvider>
      <TodoProvider>
        <AppNavigator />
      </TodoProvider>
    </AuthProvider>
  );
};

export default TodoAppWithNetwork;
