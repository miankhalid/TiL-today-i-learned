// App.jsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useColorScheme } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import LifecycleDemo from './screens/LifecycleDemo';
import ProfileScreen from './screens/ProfileScreen';
import Tabs from './screens/TabsScreen';
import ThemeDemoScreen from './screens/ThemeDemoScreen';
import TodoTabs from './todo-app/TodoTabs';
import TodoTabsUseContext from './todo-app-use-context/TodoTabsUseContext';
import TodoTabsV3 from './todo-app-v3/TodoTabsV3';
import TodoAppWithNetwork from './todo-app-v4-network/TodoAppWithNetwork';
import ReduxExample from './redux/features/counter/Counter';

import { store } from './redux/app/store'
import { Provider } from 'react-redux';


const Stack = createNativeStackNavigator();

export default function App() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <Provider store={store}>
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
                        name="TodoApp"
                        component={TodoTabs}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="TodoAppUseContext"
                        component={TodoTabsUseContext}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="TodoAppV3"
                        component={TodoTabsV3}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="TodoAppV4"
                        component={TodoAppWithNetwork}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="ReduxExample"
                        component={ReduxExample}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
