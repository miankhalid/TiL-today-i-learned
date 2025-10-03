import React, { useContext, useState } from 'react';
import { Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import createStyles from '../themes/Styles';
import { TodoContext } from './context/TodoContext';
import Todo from './models/Todo';

export default function AddTab() {
  const scheme = useColorScheme(); // "light" or "dark"
  const styles = createStyles(scheme);
  const { todos, setTodos } = useContext(TodoContext);

  const [itemText, setItemText] = useState("");
  const [error, setError] = useState("");

  const addTodoItem = () => {
    if (itemText.trim().length === 0) {
      setError("⚠️ Can't add an empty todo");
      return;
    }
    setTodos([...todos, new Todo(todos.length + 1, itemText.trim())])
    setItemText("");
    setError("")
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.heading3, styles.listItem]}>➕ Add a todo item</Text>

      {error ? (<Text style={[styles.heading3, styles.listItem]}>{error}</Text>) : null}

      <TextInput
        placeholder="Enter todo"
        style={styles.input}
        value={itemText}
        multiline={true}
        onChangeText={setItemText}
      />

      <TouchableOpacity style={styles.button} onPress={addTodoItem}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>

    </View>
  );
}
