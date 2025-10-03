import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { useColorScheme } from 'react-native';
import createStyles from '../themes/Styles';
import AddTab from './AddTab';
import CompletedTab from './CompletedTab';
import HomeTab from './HomeTab';
import Todo from './models/Todo';

const Tab = createBottomTabNavigator();

export default function Tabs() {
    const scheme = useColorScheme(); // "light" or "dark"
    const styles = createStyles(scheme);

    const [todos, setTodos] = useState([
        new Todo(1, "Item # 1"),
        new Todo(2, "Item # 2"),
    ]);

    return (
        <Tab.Navigator>
            <Tab.Screen name="Home">
                {() => <HomeTab todos={todos} setTodos={setTodos} />}
            </Tab.Screen>
            <Tab.Screen name="Add Todo">
                {() => <AddTab todos={todos} setTodos={setTodos} />}
            </Tab.Screen>
            <Tab.Screen name="Completed">
                {() => <CompletedTab todos={todos} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
}
