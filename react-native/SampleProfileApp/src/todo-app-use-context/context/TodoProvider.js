import React, { useState } from 'react';
import Todo from '../models/Todo';
import { TodoContext } from './TodoContext';

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([
        new Todo(1, "Item # 1"),
        new Todo(2, "Item # 2"),
    ]);

    return (
        <TodoContext.Provider value={{ todos, setTodos }}>
            {children}
        </TodoContext.Provider>
    );
};
