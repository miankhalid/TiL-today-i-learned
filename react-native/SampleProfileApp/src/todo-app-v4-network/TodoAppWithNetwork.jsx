import React from 'react';
import { AuthProvider } from './context/auth/AuthContext';
import { TodoProvider } from './context/todos/TodoContext';
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
