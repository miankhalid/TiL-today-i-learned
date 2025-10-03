import React, { useState } from 'react';
import Todo from '../models/Todo';
import { TodoContext } from './TodoContext';

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([
        new Todo(1, "Item # 1"),
        new Todo(2, "Item # 2"),
    ]);

    const addTodo = (text) => {
        setTodos([...todos, new Todo(todos.length + 1, text)]);
    };

    const markComplete = (todo) => {
        todo.markDone();
        setTodos([...todos]);
    };

    const deleteTodo = (todo) => {
        setTodos(todos.filter(item => item.id !== todo.id));
    };

    const editTodo = (id, newText) => {
        setTodos(
            todos.map(item => {
                if (item.id === id) {
                    item.updateText(newText);
                }
                return item;
            })
        );
    };

    return (
        <TodoContext.Provider value={{ todos, addTodo, markComplete, deleteTodo, editTodo }}>
            {children}
        </TodoContext.Provider>
    );
};
