import React, { useContext } from 'react';
import { ScrollView, Text, useColorScheme } from 'react-native';
import createStyles from '../themes/Styles';
import { TodoContext } from './context/TodoContext';

export default function CompletedTab() {
  const scheme = useColorScheme(); // "light" or "dark"
  const styles = createStyles(scheme);
  const { todos } = useContext(TodoContext);

  const completeTodos = todos.filter(item => item.done);

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.heading3, styles.listItem]}>⚙️ Completed Todos</Text>
      {completeTodos.map(item => (
        <Text key={item.id} style={styles.listItem} >{item.text}</Text>
      ))}
    </ScrollView>
  );
}
