import type { MainScreenProps } from '@/navigation/types';

import { logout } from '@/hooks/auth/useAuth';

import Box from '@/components/atoms/Box';
import Button from '@/components/atoms/Button/Button';
import Text from '@/components/atoms/Text';

function HomeScreen({ navigation }: MainScreenProps<'Home'>) {
  const handleLogout = () => {
    logout().catch(console.error);
  };

  const handleNewPost = () => {
    navigation.navigate('NewPost');
  };

  return (
    <Box alignItems="center" flex={1} justifyContent="center">
      <Text variant="header">Home Screen</Text>
      <Button
        containerProps={{ marginTop: 'm' }}
        onPress={handleNewPost}
        title="New Post"
      />
      <Button
        containerProps={{ marginTop: 'xl' }}
        onPress={handleLogout}
        title="Logout"
      />
    </Box>
  );
}

export default HomeScreen;
