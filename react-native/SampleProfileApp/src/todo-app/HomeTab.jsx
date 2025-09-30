import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useColorScheme } from 'react-native';
import createStyles from '../themes/Styles';

export default function HomeTab({ navigation }) {
  const scheme = useColorScheme(); // "light" or "dark"
  const styles = createStyles(scheme);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text>📌 Home Screen</Text>
      </View>
    </ScrollView>
  );
}
