import React, { useState } from 'react';
import Todo from '../models/Todo';
import { TodoContext } from './TodoContext';

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([
        new Todo(1, "Item # 1"),
        new Todo(2, "Item # 2"),
    ]);

    const addTodo = (text) => {
        const updatedTodos = [...todos, new Todo(todos.length + 1, text)];
        setTodos(updatedTodos);
    };

    const markComplete = (id) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? todo.markDone() : todo
        );
        setTodos(updatedTodos);
    };

    const deleteTodo = (id) => {
        const updatedTodos = todos.filter(item => item.id !== id);
        setTodos(updatedTodos);
    };

    const editTodo = (id, newText) => {
        const updatedTodos = todos.map(item =>
            item.id === id ? item.updateText(newText) : item
        );
        setTodos(updatedTodos);
    };

    return (
        <TodoContext.Provider value={{ todos, addTodo, markComplete, deleteTodo, editTodo }}>
            {children}
        </TodoContext.Provider>
    );
};
