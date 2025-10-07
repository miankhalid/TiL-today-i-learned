import React, { createContext, useContext, useState } from 'react';
import { addTodo as addTodoApi, deleteTodo as deleteTodoApi, getTodosByUserId, updateTodo as updateTodoApi } from '../api/todo-api';
import { AuthContext } from './AuthContext';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    if (!user) return;
    console.log(`[TodoContext] Fetching todos for userId: ${user.id}`);
    setLoading(true);
    try {
      const response = await getTodosByUserId(user.id);
      console.log(`[TodoContext] Fetch todos response: ${response.status}`, response.data);
      setTodos(response.data.todos);
      setError(null);
    } catch (e) {
      console.error('[TodoContext] Fetch todos error:', e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (todo) => {
    if (!user) return;
    const newTodo = { ...todo, userId: user.id };
    console.log('[TodoContext] Adding todo:', newTodo);
    setLoading(true);
    try {
      const response = await addTodoApi(newTodo);
      console.log(`[TodoContext] Add todo response: ${response.status}`, response.data);
      setTodos([response.data, ...todos]);
      setError(null);
    } catch (e) {
      console.error('[TodoContext] Add todo error:', e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async (id, completed) => {
    console.log(`[TodoContext] Updating todo id: ${id} to completed: ${completed}`);
    setLoading(true);
    try {
      const response = await updateTodoApi(id, completed);
      console.log(`[TodoContext] Update todo response: ${response.status}`, response.data);
      setTodos(todos.map(todo => todo.id === id ? { ...todo, completed } : todo));
      setError(null);
    } catch (e) {
      console.error('[TodoContext] Update todo error:', e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    console.log(`[TodoContext] Deleting todo id: ${id}`);
    setLoading(true);
    try {
      const response = await deleteTodoApi(id);
      console.log(`[TodoContext] Delete todo response: ${response.status}`, response.data);
      setTodos(todos.filter(todo => todo.id !== id));
      setError(null);
    } catch (e) {
      console.error('[TodoContext] Delete todo error:', e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TodoContext.Provider value={{ todos, loading, error, fetchTodos, addTodo, updateTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};