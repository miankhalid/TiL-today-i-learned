import React from 'react';
import { ScrollView, Text, useColorScheme } from 'react-native';
import createStyles from '../themes/Styles';
import TodoItem from './components/TodoItem';
import { useTodos } from './context/useTodos';

export default function HomeTab() {
  const scheme = useColorScheme(); // "light" or "dark"
  const styles = createStyles(scheme);
  const { todos, markComplete, deleteTodo, editTodo } = useTodos();

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
