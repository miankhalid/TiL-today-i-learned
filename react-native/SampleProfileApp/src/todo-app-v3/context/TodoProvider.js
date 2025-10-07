import React, { useReducer } from 'react';
import Todo from '../models/Todo';
import { TodoContext } from './TodoContext';

const todoReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, new Todo(state.length + 1, action.payload)];
        case 'MARK_COMPLETE':
            return state.map(todo =>
                todo.id === action.payload ? todo.markDone() : todo
            );
        case 'DELETE_TODO':
            return state.filter(todo => todo.id !== action.payload);
        case 'EDIT_TODO':
            return state.map(todo =>
                todo.id === action.payload.id ? todo.updateText(action.payload.newText) : todo
            );
        default:
            return state;
    }
};

export const TodoProvider = ({ children }) => {
    const [todos, dispatch] = useReducer(todoReducer, [
        new Todo(1, "Item # 1"),
        new Todo(2, "Item # 2"),
    ]);

    const addTodo = (text) => {
        dispatch({ type: 'ADD_TODO', payload: text });
    };

    const markComplete = (id) => {
        dispatch({ type: 'MARK_COMPLETE', payload: id });
    };

    const deleteTodo = (id) => {
        dispatch({ type: 'DELETE_TODO', payload: id });
    };

    const editTodo = (id, newText) => {
        dispatch({ type: 'EDIT_TODO', payload: { id, newText } });
    };

    return (
        <TodoContext.Provider value={{ todos, addTodo, markComplete, deleteTodo, editTodo }}>
            {children}
        </TodoContext.Provider>
    );
};
