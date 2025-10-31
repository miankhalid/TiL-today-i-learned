import { logout } from '@/hooks/auth/useAuth';

import Box from '@/components/atoms/Box';
import Button from '@/components/atoms/Button/Button';
import Text from '@/components/atoms/Text';

function HomeScreen() {

  const handleLogout = () => {
    logout().catch(console.error);
  };

  return (
    <Box alignItems="center" flex={1} justifyContent="center">
      <Text variant="header">Home Screen</Text>
      <Button
        containerProps={{ marginTop: 'xl' }}
        onPress={handleLogout}
        title="Logout" />
    </Box>
  );
}

export default HomeScreen;
