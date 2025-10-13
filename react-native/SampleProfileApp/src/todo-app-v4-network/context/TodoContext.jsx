import React, { createContext, useReducer } from 'react';
import {
  addTodo as addTodoApi,
  deleteTodo as deleteTodoApi,
  getAllTodos,
  getTodosByUserId,
  updateTodo as updateTodoApi
} from '../api/todo-api';
import { useAuth } from './useAuth';

const TodoContext = createContext();

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
    case 'ADD_START':
    case 'UPDATE_START':
    case 'DELETE_START':
    case 'FETCH_ALL_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, todos: action.payload };
    case 'FETCH_ALL_SUCCESS':
      return {
        ...state,
        loading: false,
        allTodos: [...state.allTodos, ...action.payload.todos],
        allTodosSkip: state.allTodosSkip + action.payload.limit,
        allTodosHasMore: action.payload.todos.length > 0,
      };
    case 'RESET_ALL_TODOS':
      return {
        ...state,
        allTodos: [],
        allTodosSkip: 0,
        allTodosHasMore: true,
      };
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
    case 'FETCH_ALL_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const initialState = {
  todos: [],
  allTodos: [],
  loading: false,
  error: null,
  allTodosSkip: 0,
  allTodosHasMore: true,
};

const TodoProvider = ({ children }) => {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const allTodosLimit = 20;

  const fetchTodos = async () => {
    if (!user) return;
    dispatch({ type: 'FETCH_START' });
    try {
      const response = await getTodosByUserId(user.id);
      dispatch({ type: 'FETCH_SUCCESS', payload: response.data.todos });
    } catch (e) {
      dispatch({ type: 'FETCH_ERROR', payload: e.message });
    }
  };

  const fetchAllTodos = async () => {
    if (state.loading || !state.allTodosHasMore) return;
    console.log(`[TodoContext] Fetching all todos with limit: ${allTodosLimit}, skip: ${state.allTodosSkip}`);
    dispatch({ type: 'FETCH_ALL_START' });
    try {
      const response = await getAllTodos(allTodosLimit, state.allTodosSkip);
      dispatch({ type: 'FETCH_ALL_SUCCESS', payload: { todos: response.data.todos, limit: allTodosLimit } });
    } catch (e) {
      dispatch({ type: 'FETCH_ALL_ERROR', payload: e.message });
    }
  };

  const resetAllTodos = () => {
    dispatch({ type: 'RESET_ALL_TODOS' });
  };

  const addTodo = async (todo) => {
    if (!user) return;
    const newTodo = { ...todo, userId: user.id };
    dispatch({ type: 'ADD_START' });
    try {
      const response = await addTodoApi(newTodo);
      dispatch({ type: 'ADD_SUCCESS', payload: response.data });
    } catch (e) {
      dispatch({ type: 'ADD_ERROR', payload: e.message });
    }
  };

  const updateTodo = async (id, completed) => {
    dispatch({ type: 'UPDATE_START' });
    try {
      await updateTodoApi(id, completed);
      dispatch({ type: 'UPDATE_SUCCESS', payload: { id, completed } });
    } catch (e) {
      dispatch({ type: 'UPDATE_ERROR', payload: e.message });
    }
  };

  const deleteTodo = async (id) => {
    dispatch({ type: 'DELETE_START' });
    try {
      await deleteTodoApi(id);
      dispatch({ type: 'DELETE_SUCCESS', payload: { id } });
    } catch (e) {
      dispatch({ type: 'DELETE_ERROR', payload: e.message });
    }
  };

  return (
    <TodoContext.Provider value={{ ...state, fetchTodos, fetchAllTodos, resetAllTodos, addTodo, updateTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
