import React, { useEffect, useState } from 'react';
import { View, Text, AppState, Dimensions, Button, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // for navigation lifecycle

export default function LifecycleShowcase() {
    const [appState, setAppState] = useState(AppState.currentState);
    const [orientation, setOrientation] = useState('portrait');
    const [counter, setCounter] = useState(0);

    // 🔸 React Lifecycle: Mount + Unmount
    useEffect(() => {
        console.log('✅ Component Mounted');

        return () => {
            console.log('❌ Component Unmounted');
        };
    }, []);

    // 🔸 App Lifecycle: Foreground / Background / Inactive
    useEffect(() => {
        const handleAppStateChange = (nextState) => {
            console.log(`📱 App state changed: ${appState} → ${nextState}`);
            setAppState(nextState);
        };

        const sub = AppState.addEventListener('change', handleAppStateChange);

        // Cleanup listener on unmount
        return () => {
            sub.remove();
            console.log('🧹 Cleaned up AppState listener');
        };
    }, [appState]);

    // 🔸 Screen Lifecycle: Focus / Unfocus
    useFocusEffect(
        React.useCallback(() => {
            console.log('🟢 Screen Focused (Visible to User)');

            return () => {
                console.log('🔴 Screen Unfocused (User navigated away)');
            };
        }, [])
    );

    // 🔸 Orientation change (Dimensions)
    useEffect(() => {
        const handleDimensionChange = ({ window }) => {
            const isPortrait = window.height >= window.width;
            const newOrientation = isPortrait ? 'portrait' : 'landscape';
            console.log(`📐 Orientation changed → ${newOrientation}`);
            setOrientation(newOrientation);
        };

        const sub = Dimensions.addEventListener('change', handleDimensionChange);

        return () => {
            sub.remove();
            console.log('🧹 Cleaned up Dimensions listener');
        };
    }, []);

    // 🔸 State Update Example (simulating re-renders)
    useEffect(() => {
        if (counter > 0) {
            console.log(`🔄 Component Updated — counter is now ${counter}`);
        }
    }, [counter]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📲 React Native Lifecycle Demo</Text>

            <View style={styles.block}>
                <Text style={styles.label}>App State:</Text>
                <Text style={styles.value}>{appState}</Text>
            </View>

            <View style={styles.block}>
                <Text style={styles.label}>Orientation:</Text>
                <Text style={styles.value}>{orientation}</Text>
            </View>

            <View style={styles.block}>
                <Text style={styles.label}>Counter:</Text>
                <Text style={styles.value}>{counter}</Text>
            </View>

            <Button title="Increase Counter" onPress={() => setCounter(counter + 1)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    block: {
        marginVertical: 10,
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        color: '#555',
    },
    value: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
});
