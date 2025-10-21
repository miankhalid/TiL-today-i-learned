import React, { useEffect, useState } from 'react';
import { Button, FlatList, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserTodos, addTodo, updateTodo, deleteTodo } from '../store/todosThunks';
import createStyles from '../themes/Styles';

const TodoScreen = () => {
  const styles = createStyles();
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector(state => state.todos);
  const { user } = useSelector(state => state.auth);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('All'); // All, Active, Completed

  useEffect(() => {
    if (user) {
      dispatch(fetchUserTodos(user.id));
    }
  }, [dispatch, user]);

  const handleAddTodo = () => {
    if (newTodo.trim() && user) {
      dispatch(addTodo({ todo: { todo: newTodo, completed: false }, userId: user.id }));
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
        onPress={() => dispatch(updateTodo({ id: item.id, completed: !item.completed }))}
      >
        {`#${item.id}: ${item.todo}`}
      </Text>
      <Button style={styles.button} title="Delete" onPress={() => dispatch(deleteTodo(item.id))} />

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
