import React from 'react';
import { View, Text, Button } from 'react-native';
import { useColorScheme } from 'react-native';
import createStyles from '../../themes/Styles';

export default function TabOneScreen({ navigation }) {
  const scheme = useColorScheme(); // "light" or "dark"
  const styles = createStyles(scheme);

  return (
    <View style={styles.container}>
      <Text>📌 Tab One Screen</Text>
    </View>
  );
}
