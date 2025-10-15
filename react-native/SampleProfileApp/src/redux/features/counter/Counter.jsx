import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount, selectCount } from '../../slice/counter-slice';

const Counter = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.countText}>Count: {count}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Increment" onPress={() => dispatch(increment())} />
        <Button title="Decrement" onPress={() => dispatch(decrement())} />
        <Button title="Increment by 2.5" onPress={() => dispatch(incrementByAmount(2.5))} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Counter;