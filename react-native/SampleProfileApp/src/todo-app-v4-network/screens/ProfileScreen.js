import React, { useContext, useEffect } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import createStyles from '../themes/Styles';

const styles = createStyles();

const ProfileScreen = () => {
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      console.log(`Profile screen loaded for user: ${user.username}`);
    }
  }, [user]);

  if (!user) {
    // This should ideally not be shown for long due to the navigator's loading state
    return (
      <View style={styles.container}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.image }} style={styles.profileImage} />
      <Text style={styles.title}>{`${user.firstName} ${user.lastName}`}</Text>
      <Text style={styles.bodyBold}>Username: {user.username}</Text>
      <Text style={styles.body}>Email: {user.email}</Text>
      <Text style={styles.body}>Gender: {user.gender}</Text>
      <View style={{ marginTop: 20 }} />
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default ProfileScreen;
