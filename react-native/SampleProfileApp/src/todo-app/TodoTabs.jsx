import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTab from './HomeTab';
import AddTab from './AddTab';
import CompletedTab from './CompletedTab';
import createStyles from '../themes/Styles';

const Tab = createBottomTabNavigator();

export default function Tabs() {
    const scheme = useColorScheme(); // "light" or "dark"
    const styles = createStyles(scheme);

    return (
        <Tab.Navigator>
            <Tab.Screen name="HomeTab" component={HomeTab} />
            <Tab.Screen name="Add" component={AddTab} />
            <Tab.Screen name="Completed" component={CompletedTab} />
        </Tab.Navigator >
    );
}
