import React, { useReducer, useEffect, useState } from 'react';
import Todo from '../models/Todo';
import { TodoContext } from './TodoContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const todoReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TODOS':
            return action.payload;
        case 'ADD_TODO':
            return [...state, new Todo(Date.now(), action.payload)];
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
    const [todos, dispatch] = useReducer(todoReducer, []);
    const [initialLoad, setInitialLoad] = useState(true);

    // Load
    useEffect(() => {
        const loadTodos = async () => {
            try {
                const item = await AsyncStorage.getItem('todos');
                if (item) {
                    const loadedTodos = JSON.parse(item);
                    const todoInstances = loadedTodos.map(t => new Todo(t.id, t.text, t.done));
                    dispatch({ type: 'SET_TODOS', payload: todoInstances });
                }
            } catch (error) {
                console.error("Error loading todos from AsyncStorage:", error);
            } finally {
                setInitialLoad(false);
            }
        };
        loadTodos();
    }, []); // Run only once on mount

    // Save
    useEffect(() => {
        if (!initialLoad) {
            try {
                AsyncStorage.setItem('todos', JSON.stringify(todos));
            } catch (error) {
                console.error("Error saving todos to AsyncStorage:", error);
            }
        }
    }, [todos, initialLoad]);

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
