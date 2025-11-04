import { logout } from '@/hooks/auth/useAuth';

import Box from '@/components/atoms/Box';
import Button from '@/components/atoms/Button/Button';
import Text from '@/components/atoms/Text';

function SettingsScreen() {
  const handleLogout = () => {
    logout().catch(console.error);
  };

  return (
    <Box flex={1} padding="m" justifyContent="center">
      <Text variant="header" marginBottom="m" textAlign="center">
        Settings
      </Text>
      
      <Button
        title="Logout"
        onPress={handleLogout}
        containerProps={{ marginTop: 'xl' }}
      />
    </Box>
  );
}

export default SettingsScreen;