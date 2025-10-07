import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useColorScheme } from 'react-native';
import createStyles from '../themes/Styles';
import AddTab from './AddTab';
import CompletedTab from './CompletedTab';
import { TodoProvider } from './context/TodoProvider';
import HomeTab from './HomeTab';

const Tab = createBottomTabNavigator();

export default function Tabs() {
    const scheme = useColorScheme(); // "light" or "dark"
    const styles = createStyles(scheme);

    return (
        <TodoProvider>
            <Tab.Navigator>
                <Tab.Screen name="Home">
                    {() => <HomeTab />}
                </Tab.Screen>
                <Tab.Screen name="Add Todo">
                    {() => <AddTab />}
                </Tab.Screen>
                <Tab.Screen name="Completed">
                    {() => <CompletedTab />}
                </Tab.Screen>
            </Tab.Navigator>
        </TodoProvider>
    );
}
