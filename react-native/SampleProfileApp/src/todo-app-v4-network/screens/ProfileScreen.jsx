import React, { useEffect } from 'react';
import { Button, Image, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authThunks';
import createStyles from '../themes/Styles';

const styles = createStyles();

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

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

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.image }} style={styles.profileImage} />
      <Text style={styles.title}>{`${user.firstName} ${user.lastName}`}</Text>
      <Text style={styles.bodyBold}>Username: {user.username}</Text>
      <Text style={styles.body}>Email: {user.email}</Text>
      <Text style={styles.body}>Gender: {user.gender}</Text>
      <View style={styles.spacer} />
      <Button title="Go to my Todos" onPress={() => navigation.navigate('Todo')} />
      <View style={styles.spacer} />
      <Button title="View all todos" onPress={() => navigation.navigate('AllTodos')} />
      <View style={styles.spacer} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default ProfileScreen;
