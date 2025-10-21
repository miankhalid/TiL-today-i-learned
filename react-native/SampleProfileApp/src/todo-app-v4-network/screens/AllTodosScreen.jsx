import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { resetAllTodos } from '../store/todosSlice';
import { fetchAllTodos as fetchAllTodosThunk } from '../store/todosThunks';
import createStyles from '../themes/Styles';

const AllTodosScreen = () => {
  const styles = createStyles();
  const dispatch = useDispatch();
  const { allTodos, loading, error, allTodosSkip, allTodosHasMore } = useSelector(state => state.todos);

  // Ref to track if a request is currently in progress
  const requestInProgress = useRef(false);

  useEffect(() => {
    console.log("[AllTodosScreen] Component mounted, fetching all todos");
    dispatch(fetchAllTodosThunk({ limit: 20, skip: 0 }));

    // When the component unmounts, reset the state for the next time it's opened
    return () => {
      console.log("[AllTodosScreen] Component umounted, resetting all todos");
      dispatch(resetAllTodos());
    };
  }, []); // Empty dependency array - only run on mount

  // Update the requestInProgress ref when loading state changes
  useEffect(() => {
    if (!loading) {
      // Reset the requestInProgress when loading is complete
      requestInProgress.current = false;
    }
  }, [loading]);

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
          // Check both the Redux loading state and our local ref to prevent multiple simultaneous requests
          if (!loading && !requestInProgress.current && allTodosHasMore) {
            requestInProgress.current = true;
            dispatch(fetchAllTodosThunk({ limit: 20, skip: allTodosSkip }));
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default AllTodosScreen;
