import React, { createContext, useReducer } from 'react';
import { useAuth } from '../auth/useAuth';
import {
  addTodo as addTodoAction,
  deleteTodo as deleteTodoAction,
  fetchAllTodos as fetchAllTodosAction,
  fetchTodos as fetchTodosAction,
  resetAllTodos as resetAllTodosAction,
  updateTodo as updateTodoAction,
} from './todoActions';

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
      // Add to both personal and "all" lists for UI consistency
      return {
        ...state,
        loading: false,
        todos: [action.payload, ...state.todos],
        allTodos: [action.payload, ...state.allTodos],
      };
    case 'UPDATE_SUCCESS':
      return {
        ...state,
        loading: false,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? { ...todo, completed: action.payload.completed } : todo
        ),
        allTodos: state.allTodos.map(todo =>
          todo.id === action.payload.id ? { ...todo, completed: action.payload.completed } : todo
        ),
      };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loading: false,
        todos: state.todos.filter(todo => todo.id !== action.payload.id),
        allTodos: state.allTodos.filter(todo => todo.id !== action.payload.id),
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

  const fetchTodos = () => {
    fetchTodosAction(dispatch, user?.id);
  };

  const fetchAllTodos = () => {
    if (state.loading || !state.allTodosHasMore) return;
    fetchAllTodosAction(dispatch, allTodosLimit, state.allTodosSkip);
  };

  const resetAllTodos = () => {
    resetAllTodosAction(dispatch);
  };

  const addTodo = (todo) => {
    addTodoAction(dispatch, todo, user?.id);
  };

  const updateTodo = (id, completed) => {
    updateTodoAction(dispatch, id, completed);
  };

  const deleteTodo = (id) => {
    deleteTodoAction(dispatch, id);
  };

  return (
    <TodoContext.Provider value={{ ...state, fetchTodos, fetchAllTodos, resetAllTodos, addTodo, updateTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
