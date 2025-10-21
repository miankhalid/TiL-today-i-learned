import { createSlice } from '@reduxjs/toolkit';
import { fetchUserTodos, fetchAllTodos, addTodo, updateTodo, deleteTodo } from './todosThunks';

const initialState = {
  todos: [],
  allTodos: [],
  loading: false,
  error: null,
  allTodosSkip: 0,
  allTodosHasMore: true,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    resetAllTodos: (state) => {
      state.allTodos = [];
      state.allTodosSkip = 0;
      state.allTodosHasMore = true;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user's todos
      .addCase(fetchUserTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchUserTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch all todos
      .addCase(fetchAllTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("[TodoContext] FETCH_ALL_START:", state);
      })
      .addCase(fetchAllTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.allTodos = [...state.allTodos, ...action.payload.todos];
        state.allTodosSkip = state.allTodosSkip + action.payload.limit;
        state.allTodosHasMore = action.payload.todos.length > 0;
        console.log("[TodoContext] FETCH_ALL_SUCCESS:", state);
      })
      .addCase(fetchAllTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("[TodoContext] FETCH_ALL_ERROR:", state);
      })
      // Add todo
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        // Add to both personal and "all" lists for UI consistency
        state.todos = [action.payload, ...state.todos];
        state.allTodos = [action.payload, ...state.allTodos];
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update todo
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        const { id, completed } = action.payload;
        // Update in both personal and "all" lists
        const todoIndex = state.todos.findIndex(todo => todo.id === id);
        if (todoIndex !== -1) {
          state.todos[todoIndex] = { ...state.todos[todoIndex], completed };
        }
        
        const allTodoIndex = state.allTodos.findIndex(todo => todo.id === id);
        if (allTodoIndex !== -1) {
          state.allTodos[allTodoIndex] = { ...state.allTodos[allTodoIndex], completed };
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete todo
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        // Remove from both personal and "all" lists
        state.todos = state.todos.filter(todo => todo.id !== id);
        state.allTodos = state.allTodos.filter(todo => todo.id !== id);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAllTodos, clearError } = todosSlice.actions;

export default todosSlice.reducer;
