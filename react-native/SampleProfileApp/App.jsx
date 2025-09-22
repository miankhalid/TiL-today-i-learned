import React, { useState } from 'react';
import {
  View, Text, Image, StyleSheet,
  TouchableOpacity, useColorScheme,
  StatusBar
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

// This is the base component for the application.
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

// This component holds all the screen's UI
function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  /* The state 'isFollowing' tracks the follow status.
   * It starts as 'false' (not following).
   */

  // WAY-1 -> what if we test with an object instead of useState?
  // let isFollowing = false;

  // WAY-2 -> and what if we go with useState?
  const [isFollowing, setIsFollowing] = useState(false);

  // This function is called when a button is pressed.
  // It toggles the 'isFollowing' state between true and false.
  const onFollowPress = () => {
    // WAY-1
    // isFollowing = !isFollowing;

    // WAY-2
    setIsFollowing(!isFollowing);

    console.log("isFollowing - " + isFollowing);
  };

  return (
    <View style={styles.cardContainer}>

      {/* Profile Info Section */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://reactnative.dev/docs/assets/p_cat1.png' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Abu Bakr</Text>
        <Text style={styles.jobTitle}>Scholar & Developer</Text>
        <Text style={styles.bio}>
          Building beautiful and performant mobile apps for iOS and Android.
          Lover of clean code, kehwa, books and hiking.
        </Text>
      </View>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>1.2K</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>145K</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>320</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>

      {/* Action Buttons Section */}
      <View style={styles.buttonsSection}>
        {/* The TouchableOpacity component provides feedback on touch. */}
        {/* The style and text change based on the 'isFollowing' state. */}
        <TouchableOpacity
          style={[styles.button, isFollowing ? styles.unfollowButton : styles.followButton]}
          onPress={onFollowPress}
        >
          <Text style={[styles.buttonText, isFollowing ? styles.unfollowButtonText : styles.followButtonText]}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.messageButton]}>
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

// StyleSheet.create is used for performance optimizations.
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F4F8', // A light background for the whole screen
  },
  cardContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
    padding: 20,
  },
  profileSection: {
    alignItems: 'center', // Centers children horizontally
    marginBottom: 25,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60, // Makes the image circular
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#007BFF',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  jobTitle: {
    fontSize: 16,
    color: '#777',
    marginTop: 4,
  },
  bio: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginTop: 12,
    paddingHorizontal: 20,
  },
  statsSection: {
    flexDirection: 'row', // Arranges stats horizontally
    justifyContent: 'space-around', // Distributes space evenly
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EAEAEA',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  buttonsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 25,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    flex: 1, // Makes buttons take equal width
    alignItems: 'center',
    marginHorizontal: 8,
  },
  followButton: {
    backgroundColor: '#007BFF',
  },
  unfollowButton: {
    backgroundColor: '#EAEAEA',
  },
  messageButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#B0B0B0',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  followButtonText: {
    color: '#FFFFFF',
  },
  unfollowButtonText: {
    color: '#333333',
  },
  messageButtonText: {
    color: '#333333',
  },
});

export default App;
