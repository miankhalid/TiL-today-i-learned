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
        case 'EDIT_TODO':
            return state.map(todo =>
                todo.id === action.payload.id ? todo.updateText(action.payload.newText) : todo
            );
        case 'SOFT_DELETE_TODO':
            return state.filter(todo => todo.id !== action.payload);
        default:
            return state;
    }
};

const deletedTodoReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DELETED_TODOS':
            return action.payload;
        case 'ADD_DELETED_TODO':
            return [...state, action.payload];
        default:
            return state;
    }
};

export const TodoProvider = ({ children }) => {
    const [todos, dispatch] = useReducer(todoReducer, []);
    const [deletedTodos, deletedDispatch] = useReducer(deletedTodoReducer, []);
    const [initialLoad, setInitialLoad] = useState(true);

    // Load
    useEffect(() => {
        const loadTodos = async () => {
            try {
                const todosItem = await AsyncStorage.getItem('todos');
                if (todosItem) {
                    const loadedTodos = JSON.parse(todosItem);
                    const todoInstances = loadedTodos.map(t => new Todo(t.id, t.text, t.done));
                    dispatch({ type: 'SET_TODOS', payload: todoInstances });
                }

                const deletedTodosItem = await AsyncStorage.getItem('deletedTodos');
                if (deletedTodosItem) {
                    const loadedDeletedTodos = JSON.parse(deletedTodosItem);
                    const deletedTodoInstances = loadedDeletedTodos.map(t => new Todo(t.id, t.text, t.done));
                    deletedDispatch({ type: 'SET_DELETED_TODOS', payload: deletedTodoInstances });
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
                AsyncStorage.setItem('deletedTodos', JSON.stringify(deletedTodos));
            } catch (error) {
                console.error("Error saving todos to AsyncStorage:", error);
            }
        }
    }, [todos, deletedTodos, initialLoad]);

    const addTodo = (text) => {
        dispatch({ type: 'ADD_TODO', payload: text });
    };

    const markComplete = (id) => {
        dispatch({ type: 'MARK_COMPLETE', payload: id });
    };

    const deleteTodo = (id) => {
        const todoToDelete = todos.find(todo => todo.id === id);
        if (todoToDelete) {
            deletedDispatch({ type: 'ADD_DELETED_TODO', payload: todoToDelete });
            dispatch({ type: 'SOFT_DELETE_TODO', payload: id });
        }
    };

    const editTodo = (id, newText) => {
        dispatch({ type: 'EDIT_TODO', payload: { id, newText } });
    };

    return (
        <TodoContext.Provider value={{ todos, deletedTodos, addTodo, markComplete, deleteTodo, editTodo }}>
            {children}
        </TodoContext.Provider>
    );
};