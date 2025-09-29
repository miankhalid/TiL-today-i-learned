import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabOneScreen from './tabs/TabOneScreen';
import TabTwoScreen from './tabs/TabTwoScreen';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}>
      <Tab.Screen name="One" component={TabOneScreen} />
      <Tab.Screen name="Two" component={TabTwoScreen} />
    </Tab.Navigator >
  );
}
