import React, { useEffect, useState } from 'react';
import { Button, FlatList, Text, TextInput, View } from 'react-native';
import { useTodos } from '../context/todos/useTodos';
import createStyles from '../themes/Styles';

const TodoScreen = () => {
  const styles = createStyles();
  const { todos, loading, error, fetchTodos, addTodo, updateTodo, deleteTodo } = useTodos();
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('All'); // All, Active, Completed

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo({ todo: newTodo, completed: false });
      setNewTodo('');
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'Active') return !todo.completed;
    if (filter === 'Completed') return todo.completed;
    return true;
  });

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text
        style={item.completed ? styles.todoTextCompleted : styles.todoText}
        onPress={() => updateTodo(item.id, !item.completed)}
      >
        {`#${item.id}: ${item.todo}`}
      </Text>
      <Button style={styles.button} title="Delete" onPress={() => deleteTodo(item.id)} />

    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new todo"
          value={newTodo}
          onChangeText={setNewTodo}
        />
        <Button title="Add" onPress={handleAddTodo} />
      </View>

      <View style={styles.filterContainer}>
        <Button title="All" onPress={() => setFilter('All')} disabled={filter === 'All'} />
        <Button title="Active" onPress={() => setFilter('Active')} disabled={filter === 'Active'} />
        <Button title="Completed" onPress={() => setFilter('Completed')} disabled={filter === 'Completed'} />
      </View>

      {loading && <Text>Loading...</Text>}
      {error && <Text style={styles.errorText}>Error: {error}</Text>}

      <View style={styles.statsContainer}>
        <Text style={styles.tiny}>Stats</Text>
        <Text style={styles.body}>Total: {todos.length}</Text>
        <Text style={styles.body}>Completed: {todos.filter(t => t.completed).length}</Text>
        <Text style={styles.body}>Pending: {todos.filter(t => !t.completed).length}</Text>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={filteredTodos}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );

};

export default TodoScreen;