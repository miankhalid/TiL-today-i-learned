// HomeScreen.jsx
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>
                <Text style={styles.title}>Playground app</Text>

                <TouchableOpacity
                    style={styles.button}
                    accessibilityRole="button"
                    onPress={() => navigation.navigate('Profile')}
                >
                    <Text style={styles.buttonText}>Go to Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    accessibilityRole="button"
                    onPress={() => navigation.navigate('LifecycleDemo')}
                >
                    <Text style={styles.buttonText}>Lifecycle Demo</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    accessibilityRole="button"
                    onPress={() => navigation.navigate('ThemeDemo')}
                >
                    <Text style={styles.buttonText}>Theme & Styles Demo</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    accessibilityRole="button"
                    onPress={() => navigation.navigate('Tabs')}
                >
                    <Text style={styles.buttonText}>Tabs Demo</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    accessibilityRole="button"
                    onPress={() => navigation.navigate('TodoApp')}
                >
                    <Text style={styles.buttonText}>Todo App</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    accessibilityRole="button"
                    onPress={() => navigation.navigate('TodoAppUseContext')}
                >
                    <Text style={styles.buttonText}>Todo app with useContext</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    accessibilityRole="button"
                    onPress={() => navigation.navigate('TodoAppV3')}
                >
                    <Text style={styles.buttonText}>Todo app v3</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#fff' },
    container: {
        flex: 1,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 28,
        fontWeight: '700',
        color: '#111',
    },
    button: {
        width: '85%',
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: '#007AFF',
        alignItems: 'center',
        marginVertical: 10,
        elevation: 3, // Android shadow
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
