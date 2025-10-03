import React from 'react';
import { ScrollView, Text, useColorScheme } from 'react-native';
import createStyles from '../themes/Styles';
import TodoItem from './components/TodoItem';

export default function HomeTab({ todos, setTodos }) {
  const scheme = useColorScheme(); // "light" or "dark"
  const styles = createStyles(scheme);

  const markComplete = (todo) => {
    todo.markDone();
    setTodos([...todos])
  }

  const deleteTodo = (todo) => {
    setTodos(todos.filter(item => item.id !== todo.id))
  }

  const editTodo = (id, newText) => {
    setTodos(
      todos.map(item => {
        if (item.id === id) {
          item.updateText(newText);
        }
        return item;
      })
    )
  }

  const incompleteTodos = todos.filter(item => !item.done);

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.heading3, styles.listItem]}>📌 TODO Items list</Text>
      {incompleteTodos.map(item => (
        <TodoItem
          key={item.id}
          todo={item}
          onComplete={() => markComplete(item)}
          onDelete={() => deleteTodo(item)}
          onEdit={editTodo}
        />
      ))}
    </ScrollView>
  );
}
