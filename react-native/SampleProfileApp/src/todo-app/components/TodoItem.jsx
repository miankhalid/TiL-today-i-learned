import React from 'react';
import { Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import createStyles from '../../themes/Styles';

export default function TodoItem({ todo, onComplete, onDelete }) {
    const scheme = useColorScheme(); // "light" or "dark"
    const styles = createStyles(scheme);
    return (
        <View style={styles.row}>
            <Text style={styles.body} >{todo.text}</Text>

            {/* <TouchableOpacity style={styles.button} onPress={() => { }}>
                <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity> */}

            <TouchableOpacity style={styles.button} onPress={onComplete}>
                <Text style={styles.buttonText}>Complete</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={onDelete}>
                <Text style={styles.buttonText}>❌</Text>
            </TouchableOpacity>
        </View >
    );
}
