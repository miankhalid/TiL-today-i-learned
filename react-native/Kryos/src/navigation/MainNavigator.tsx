import HomeScreen from '@/screens/Home/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import type { MainStackParamList } from './types';

const Stack = createStackNavigator<MainStackParamList>();

function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={HomeScreen} name="Home" />
    </Stack.Navigator>
  );
}

export default MainNavigator;
