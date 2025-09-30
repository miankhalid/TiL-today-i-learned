import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import createStyles from '../themes/Styles';
import Todo from './models/Todo';

export default function AddTab({ todos, setTodos }) {
  const scheme = useColorScheme(); // "light" or "dark"
  const styles = createStyles(scheme);

  const [itemText, setItemText] = useState("");
  const [error, setError] = useState("");

  const addTodoItem = () => {
    if (itemText.trim().length === 0) {
      setError("⚠️ Can't add an empty todo");
      return;
    }
    setTodos([...todos, new Todo(todos.length + 1, itemText)])
    setItemText("");
    setError("")
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.heading3, styles.listItem]}>⚙️ Add a todo item</Text>

      <TextInput
        placeholder="Enter todo"
        style={styles.input}
        value={itemText}
        onChangeText={setItemText}
      />

      <TouchableOpacity style={styles.button} onPress={addTodoItem}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>

      {error ? (<Text style={[styles.heading3, styles.listItem]}>{error}</Text>) : null}

    </View>
  );
}
