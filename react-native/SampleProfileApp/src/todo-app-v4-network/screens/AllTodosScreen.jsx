import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { getAllTodos } from '../api/todo-api';
import createStyles from '../themes/Styles';

const AllTodosScreen = () => {
  const styles = createStyles();
  const [todos, setTodos] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const limit = 20; // Fetch 20 items at a time

  const fetchTodos = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await getAllTodos(limit, skip);
      if (response.data.todos.length > 0) {
        setTodos(prevTodos => [...prevTodos, ...response.data.todos]);
        setSkip(prevSkip => prevSkip + limit);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={styles.progress} />;
  };

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text style={item.completed ? styles.todoTextCompleted : styles.todoText}>
        {item.todo}
      </Text>
    </View>
  );

  return (
    <View style={styles.todoContainer}>
      <Text style={styles.title}>All Todos</Text>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onEndReached={fetchTodos}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default AllTodosScreen;
