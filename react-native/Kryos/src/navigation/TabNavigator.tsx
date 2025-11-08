import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Paths } from '@/navigation/paths';
import { TabParamList } from '@/navigation/tabTypes';
import { theme } from '@/theme/restyleTheme';

import FeedsScreen from '@/screens/Feed/FeedsScreen';
import NewPostScreen from '@/screens/NewPost/NewPostScreen';
import SettingsScreen from '@/screens/Settings/SettingsScreen';

const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
  const { t } = useTranslation();
  const { colors } = useTheme<typeof theme>();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.bgPrimary,  // primary color from theme
        tabBarIcon: ({ color, focused, size }) => {
          const iconMap: Record<keyof TabParamList, string> = {
            Create: focused ? 'add-card' : 'add-card',
            Feeds: focused ? 'forum' : 'forum',
            Settings: focused ? 'account-circle' : 'account-circle',
          };
          const iconName = iconMap[route.name] || 'help';

          // You can return any component that you like
          return <MaterialIcons color={color} name={iconName} size={size} />;
        },
        tabBarInactiveTintColor: colors.textSecondary,
      })}
    >
      <Tab.Screen 
        component={FeedsScreen} 
        name={Paths.Feeds} 
        options={{ 
          title: t('tabs.feed.title'),
        }} 
      />
      <Tab.Screen 
        component={NewPostScreen} 
        name={Paths.Create} 
        options={{ 
          title: t('tabs.create.title'),
        }} 
      />
      <Tab.Screen 
        component={SettingsScreen} 
        name={Paths.Settings} 
        options={{ 
          title: t('tabs.settings.title'),
        }} 
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
