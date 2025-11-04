import { logout } from '@/hooks/auth/useAuth';

import Box from '@/components/atoms/Box';
import Button from '@/components/atoms/Button/Button';
import Text from '@/components/atoms/Text';

function SettingsScreen() {
  const handleLogout = () => {
    logout().catch(console.error);
  };

  return (
    <Box flex={1} justifyContent="center" padding="m">
      <Text marginBottom="m" textAlign="center" variant="header">
        Settings
      </Text>

      <Button
        containerProps={{ marginTop: 'xl' }}
        onPress={handleLogout}
        title="Logout"
      />
    </Box>
  );
}

export default SettingsScreen;
