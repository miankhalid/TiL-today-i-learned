import React, { createContext, useReducer } from 'react';
import { addTodo as addTodoApi, deleteTodo as deleteTodoApi, getTodosByUserId, updateTodo as updateTodoApi } from '../api/todo-api';
import { useAuth } from './useAuth';

const TodoContext = createContext();

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
    case 'ADD_START':
    case 'UPDATE_START':
    case 'DELETE_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, todos: action.payload };
    case 'ADD_SUCCESS':
      return { ...state, loading: false, todos: [action.payload, ...state.todos] };
    case 'UPDATE_SUCCESS':
      return {
        ...state,
        loading: false,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? { ...todo, completed: action.payload.completed } : todo
        ),
      };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loading: false,
        todos: state.todos.filter(todo => todo.id !== action.payload.id),
      };
    case 'FETCH_ERROR':
    case 'ADD_ERROR':
    case 'UPDATE_ERROR':
    case 'DELETE_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

const TodoProvider = ({ children }) => {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const fetchTodos = async () => {
    if (!user) return;
    console.log(`[TodoContext] Fetching todos for userId: ${user.id}`);
    dispatch({ type: 'FETCH_START' });
    try {
      const response = await getTodosByUserId(user.id);
      console.log(`[TodoContext] Fetch todos response: ${response.status}`, response.data);
      dispatch({ type: 'FETCH_SUCCESS', payload: response.data.todos });
    } catch (e) {
      console.error('[TodoContext] Fetch todos error:', e);
      dispatch({ type: 'FETCH_ERROR', payload: e.message });
    }
  };

  const addTodo = async (todo) => {
    if (!user) return;
    const newTodo = { ...todo, userId: user.id };
    console.log('[TodoContext] Adding todo:', newTodo);
    dispatch({ type: 'ADD_START' });
    try {
      const response = await addTodoApi(newTodo);
      console.log(`[TodoContext] Add todo response: ${response.status}`, response.data);
      dispatch({ type: 'ADD_SUCCESS', payload: response.data });
    } catch (e) {
      console.error('[TodoContext] Add todo error:', e);
      dispatch({ type: 'ADD_ERROR', payload: e.message });
    }
  };

  const updateTodo = async (id, completed) => {
    console.log(`[TodoContext] Updating todo id: ${id} to completed: ${completed}`);
    dispatch({ type: 'UPDATE_START' });
    try {
      const response = await updateTodoApi(id, completed);
      console.log(`[TodoContext] Update todo response: ${response.status}`, response.data);
      dispatch({ type: 'UPDATE_SUCCESS', payload: { id, completed } });
    } catch (e) {
      console.error('[TodoContext] Update todo error:', e);
      dispatch({ type: 'UPDATE_ERROR', payload: e.message });
    }
  };

  const deleteTodo = async (id) => {
    console.log(`[TodoContext] Deleting todo id: ${id}`);
    dispatch({ type: 'DELETE_START' });
    try {
      const response = await deleteTodoApi(id);
      console.log(`[TodoContext] Delete todo response: ${response.status}`, response.data);
      dispatch({ type: 'DELETE_SUCCESS', payload: { id } });
    } catch (e) {
      console.error('[TodoContext] Delete todo error:', e);
      dispatch({ type: 'DELETE_ERROR', payload: e.message });
    }
  };

  return (
    <TodoContext.Provider value={{ ...state, fetchTodos, addTodo, updateTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
