import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Paths } from '@/navigation/paths';
import { TabParamList } from '@/navigation/tabTypes';
import { theme } from '@/theme/restyleTheme';

import { LoadingScreen } from '@/screens';
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
          let iconName = '';
          switch (route.name) {
            case Paths.Create:
              iconName = focused ? 'add-card' : 'add-card';
              break;
            case Paths.Loading:
              iconName = focused ? 'forum' : 'forum';
              break;
            case Paths.Settings:
              iconName = focused ? 'account-circle' : 'account-circle';
              break;
            default:
              iconName = 'help';
          }

          // You can return any component that you like
          return <MaterialIcons color={color} name={iconName} size={size} />;
        },
        tabBarInactiveTintColor: colors.textSecondary,
      })}
    >
      <Tab.Screen 
        component={LoadingScreen} 
        name={Paths.Loading} 
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
