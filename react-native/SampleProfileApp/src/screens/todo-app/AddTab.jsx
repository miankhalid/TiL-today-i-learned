import React from 'react';
import { View, Text } from 'react-native';
import { useColorScheme } from 'react-native';
import createStyles from '../../themes/Styles';

export default function AddTab() {
  const scheme = useColorScheme(); // "light" or "dark"
  const styles = createStyles(scheme);

  return (
    <View style={styles.container}>
      <Text>⚙️ Add Screen</Text>
    </View>
  );
}
