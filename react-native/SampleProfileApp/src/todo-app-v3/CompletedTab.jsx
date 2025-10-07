import React, { useMemo } from 'react';
import { ScrollView, Text, useColorScheme } from 'react-native';
import createStyles from '../themes/Styles';
import { useTodos } from './context/useTodos';

export default function CompletedTab() {
  const scheme = useColorScheme(); // "light" or "dark"
  const styles = createStyles(scheme);
  const { todos } = useTodos();

  const completeTodos = useMemo(() => {
    console.log("\n\nMemoizing completed todos ...\n\n");
    return todos.filter(item => item.done);
  }, [todos]);

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.heading3, styles.listItem]}>⚙️ Completed Todos</Text>
      {completeTodos.map(item => (
        <Text key={item.id} style={styles.listItem} >{item.text}</Text>
      ))}
    </ScrollView>
  );
}
