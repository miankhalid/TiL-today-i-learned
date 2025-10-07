import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import AddTab from './AddTab';
import CompletedTab from './CompletedTab';
import HomeTab from './HomeTab';
import { TodoProvider } from './context/TodoProvider';

const Tab = createBottomTabNavigator();

export default function Tabs() {
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
