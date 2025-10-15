import {
  addTodo as addTodoApi,
  deleteTodo as deleteTodoApi,
  getAllTodos,
  getTodosByUserId,
  updateTodo as updateTodoApi,
} from '../../api/todo-api';

export const fetchTodos = async (dispatch, userId) => {
  if (!userId) return;
  dispatch({ type: 'FETCH_START' });
  try {
    const response = await getTodosByUserId(userId);
    dispatch({ type: 'FETCH_SUCCESS', payload: response.data.todos });
  } catch (e) {
    dispatch({ type: 'FETCH_ERROR', payload: e.message });
  }
};

export const fetchAllTodos = async (dispatch, limit, skip) => {
  console.log(`[todoActions] Fetching all todos with limit: ${limit}, skip: ${skip}`);
  dispatch({ type: 'FETCH_ALL_START' });
  try {
    const response = await getAllTodos(limit, skip);
    dispatch({ type: 'FETCH_ALL_SUCCESS', payload: { todos: response.data.todos, limit } });
  } catch (e) {
    dispatch({ type: 'FETCH_ALL_ERROR', payload: e.message });
  }
};

export const resetAllTodos = (dispatch) => {
  dispatch({ type: 'RESET_ALL_TODOS' });
};

export const addTodo = async (dispatch, todo, userId) => {
  if (!userId) return;
  const newTodo = { ...todo, userId };
  dispatch({ type: 'ADD_START' });
  try {
    const response = await addTodoApi(newTodo);
    dispatch({ type: 'ADD_SUCCESS', payload: response.data });
  } catch (e) {
    dispatch({ type: 'ADD_ERROR', payload: e.message });
  }
};

export const updateTodo = async (dispatch, id, completed) => {
  dispatch({ type: 'UPDATE_START' });
  try {
    // NOTE: The API doesn't actually change the data on the server,
    // so we optimistically update our state.
    await updateTodoApi(id, completed);
    dispatch({ type: 'UPDATE_SUCCESS', payload: { id, completed } });
  } catch (e) {
    dispatch({ type: 'UPDATE_ERROR', payload: e.message });
  }
};

export const deleteTodo = async (dispatch, id) => {
  dispatch({ type: 'DELETE_START' });
  try {
    // NOTE: The API doesn't actually delete the data on the server,
    // so we optimistically update our state.
    await deleteTodoApi(id);
    dispatch({ type: 'DELETE_SUCCESS', payload: { id } });
  } catch (e) {
    dispatch({ type: 'DELETE_ERROR', payload: e.message });
  }
};
