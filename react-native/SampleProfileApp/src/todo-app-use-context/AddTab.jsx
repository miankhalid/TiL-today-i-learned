import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import createStyles from '../themes/Styles';
import { useTodos } from './context/useTodos';

export default function AddTab() {
  const scheme = useColorScheme(); // "light" or "dark"
  const styles = createStyles(scheme);
  const { addTodo } = useTodos();

  const [itemText, setItemText] = useState("");
  const [error, setError] = useState("");

  const handleAddItem = () => {
    if (itemText.trim().length === 0) {
      setError("⚠️ Can't add an empty todo");
      return;
    }
    addTodo(itemText.trim());
    setItemText("");
    setError("");
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

      <TouchableOpacity style={styles.button} onPress={handleAddItem}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>

    </View>
  );
}
