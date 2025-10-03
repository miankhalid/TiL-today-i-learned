// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import LifecycleDemo from './screens/LifecycleDemo';
import ThemeDemoScreen from './screens/ThemeDemoScreen';
import Tabs from './screens/TabsScreen';
import TodoTabsUseContext from './todo-app-use-context/TodoTabsUseContext';

const Stack = createNativeStackNavigator();

export default function App() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: isDark ? '#000' : '#fff', // bg of top bar
                    },
                    headerTintColor: isDark ? '#fff' : '#000',   // text + icons
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{ title: 'Profile' }}
                />
                <Stack.Screen
                    name="LifecycleDemo"
                    component={LifecycleDemo}
                    options={{ title: 'Lifecycle Demo' }}
                />
                <Stack.Screen
                    name="ThemeDemo"
                    component={ThemeDemoScreen}
                    options={{ title: 'Theme Demo' }}
                />
                <Stack.Screen
                    name="Tabs"
                    component={Tabs}
                />
                <Stack.Screen
                    name="TodoAppUseContext"
                    component={TodoTabsUseContext}
                    options={{ headerShown: false }}

                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
