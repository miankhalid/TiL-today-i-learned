import { apiClient as client } from './client';

export const getTodosByUserId = (userId) => client.get(`/users/${userId}/todos`);

export const addTodo = (todo) => client.post('/todos/add', todo);

export const updateTodo = (todoId, completed) => client.put(`/todos/${todoId}`, { completed });

export const deleteTodo = (todoId) => client.delete(`/todos/${todoId}`);
