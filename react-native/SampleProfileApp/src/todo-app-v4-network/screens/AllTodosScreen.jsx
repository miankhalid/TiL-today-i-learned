import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { useTodos } from '../context/todos/useTodos';
import createStyles from '../themes/Styles';

const AllTodosScreen = () => {
  const styles = createStyles();
  const { allTodos, loading, error, fetchAllTodos, resetAllTodos } = useTodos();

  useEffect(() => {
    console.log("[AllTodosScreen] Component mounted, fetching all todos");
    fetchAllTodos();

    // When the component unmounts, reset the state for the next time it's opened
    return () => {
      console.log("[AllTodosScreen] Component umounted, resetting all todos");
      resetAllTodos();
    };
  }, []);

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={styles.progress} />;
  };

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text style={item.completed ? styles.todoTextCompleted : styles.todoText}>
        {`#${item.id} (User: ${item.userId}): ${item.todo}`}
      </Text>
    </View>
  );

  return (
    <View style={styles.todoContainer}>
      <Text style={styles.title}>All Todos</Text>
      {error && <Text style={styles.errorText}>Error: {error}</Text>}
      <FlatList
        data={allTodos}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onEndReached={() => {
          console.log("[AllTodosScreen] onEndReached, loading:", loading)
          if (!loading) {
            fetchAllTodos();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default AllTodosScreen;
