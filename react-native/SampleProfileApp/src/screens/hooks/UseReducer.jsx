import React, { useReducer } from 'react';
import { View, Text, Button } from 'react-native';

// 1️⃣ Define the reducer function
function counterReducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        case 'reset':
            return { count: 0 };
        default:
            return state;
    }
}

// 2️⃣ Initial state
const initialState = { count: 0 };

// 3️⃣ Component
export default function CounterScreen() {
    const [state, dispatch] = useReducer(counterReducer, initialState);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24 }}>Count: {state.count}</Text>
            <Button title="Increment" onPress={() => dispatch({ type: 'increment' })} />
            <Button title="Decrement" onPress={() => dispatch({ type: 'decrement' })} />
            <Button title="Reset" onPress={() => dispatch({ type: 'reset' })} />
        </View>
    );
}
