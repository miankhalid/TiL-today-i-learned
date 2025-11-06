import { useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { logout } from '@/hooks/auth/useAuth';
import { useAuthWithProfile } from '@/hooks/auth/useAuthWithProfile';
import { updateProfile, UpdateProfileData } from '@/services/profileService';
import { getInitials } from '@/utils/textUtilities';

import Box from '@/components/atoms/Box';
import Button from '@/components/atoms/Button/Button';
import Image from '@/components/atoms/Image';
import Input from '@/components/atoms/Input/Input';
import Text from '@/components/atoms/Text';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateProfileFailure, updateProfileStart, updateProfileSuccess } from '@/store/slices/profileSlice';

function SettingsScreen() {
  const { loading: authLoading, profile } = useAuthWithProfile();
  const { loading: profileUpdateLoading } = useAppSelector((state) => state.profile);
  const loading = authLoading ?? profileUpdateLoading;
  const dispatch = useAppDispatch();

  // Local state for form values
  const [username, setUsername] = useState(profile?.username ?? '');
  const [fullName, setFullName] = useState(profile?.full_name ?? '');
  const [email, setEmail] = useState(profile?.email ?? '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url ?? '');
  const [website, setWebsite] = useState(profile?.website ?? '');

  // Update local state when profile changes (e.g., on initial load)
  useEffect(() => {
    if (profile) {
      setUsername(profile.username ?? '');
      setFullName(profile.full_name ?? '');
      setEmail(profile.email ?? '');
      setAvatarUrl(profile.avatar_url ?? '');
      setWebsite(profile.website ?? '');
    }
  }, [profile]);

  const handleUpdateProfile = async () => {
    try {
      dispatch(updateProfileStart());
      const profileData: UpdateProfileData = {
        avatar_url: avatarUrl.trim() ?? undefined,
        full_name: fullName.trim() ?? undefined,
        username: username.trim() ?? undefined,
        website: website.trim() ?? undefined,
      };

      const updatedProfile = await updateProfile(profileData);
      dispatch(updateProfileSuccess(updatedProfile));

      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
      dispatch(updateProfileFailure(errorMessage));
      console.error('Error updating profile:', error);
      Alert.alert('Error', errorMessage);
    }
  };

  const handleLogout = () => {
    dispatch(updateProfileStart()); // Clear profile state on logout
    void logout().catch(console.error);
  };

  // Get initials for placeholder
  const initials = getInitials(profile?.full_name);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Box padding="m">
          <Text marginBottom="m" variant="header">
            Profile Settings
          </Text>
          <Box borderRadius="m" marginBottom="s" padding="m">
            <Box
              alignItems="center"
              alignSelf="center"
              backgroundColor="gray3"
              borderRadius="round"
              height={100}
              justifyContent="center"
              marginBottom="xl"
              width={100}
            >
              {profile?.avatar_url ? (
                <Image
                  borderRadius="round"
                  height={100}
                  source={{ uri: profile.avatar_url }}
                  width={100}
                />
              ) : (
                <Text variant="header">
                  {initials ?? '?'}
                </Text>
              )}
            </Box>
            <Input
              containerProps={{ marginBottom: 's' }}
              editable={false}
              label="Email"
              value={email}
            />
            <Input
              autoCapitalize="none"
              containerProps={{ marginBottom: 's' }}
              editable={!loading}
              label="Username"
              onChangeText={setUsername}
              placeholder="Enter username"
              value={username}
            />
            <Input
              containerProps={{ marginBottom: 's' }}
              editable={!loading}
              label="Full Name"
              onChangeText={setFullName}
              placeholder="Enter full name"
              value={fullName}
            />
            <Input
              autoCapitalize="none"
              containerProps={{ marginBottom: 's' }}
              editable={!loading}
              label="Avatar URL"
              onChangeText={setAvatarUrl}
              placeholder="Enter avatar URL"
              value={avatarUrl}
            />
            <Input
              autoCapitalize="none"
              editable={!loading}
              label="Website"
              onChangeText={setWebsite}
              placeholder="Enter website URL"
              value={website}
            />
          </Box>

          <Button
            containerProps={{ marginBottom: 's' }}
            loading={loading}
            onPress={handleUpdateProfile}
            title="Update Profile"
          />

          <Button
            onPress={handleLogout}
            title="Logout"
            variant="danger"
          />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SettingsScreen;
