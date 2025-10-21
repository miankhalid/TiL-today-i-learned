import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addTodo as addTodoApi,
  deleteTodo as deleteTodoApi,
  getAllTodos,
  getTodosByUserId,
  updateTodo as updateTodoApi,
} from '../api/todo-api';

// Async thunk for fetching user's todos
export const fetchUserTodos = createAsyncThunk(
  'todos/fetchUserTodos',
  async (userId, { rejectWithValue }) => {
    if (!userId) return [];
    try {
      const response = await getTodosByUserId(userId);
      return response.data.todos;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching all todos
export const fetchAllTodos = createAsyncThunk(
  'todos/fetchAllTodos',
  async ({ limit, skip }, { rejectWithValue }) => {
    console.log(`[todoActions] Fetching all todos with limit: ${limit}, skip: ${skip}`);
    try {
      const response = await getAllTodos(limit, skip);
      return { todos: response.data.todos, limit };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for adding a todo
export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async ({ todo, userId }, { rejectWithValue }) => {
    if (!userId) return null;
    const newTodo = { ...todo, userId };
    try {
      const response = await addTodoApi(newTodo);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating a todo
export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, completed }, { rejectWithValue }) => {
    try {
      // NOTE: The API doesn't actually change the data on the server,
      // so we optimistically update our state.
      await updateTodoApi(id, completed);
      return { id, completed };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for deleting a todo
export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id, { rejectWithValue }) => {
    try {
      // NOTE: The API doesn't actually delete the data on the server,
      // so we optimistically update our state.
      await deleteTodoApi(id);
      return { id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
