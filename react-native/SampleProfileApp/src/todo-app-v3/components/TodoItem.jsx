import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import createStyles from '../themes/Styles';

export default function TodoItem({ todo, onComplete, onDelete, onEdit, isDeleted }) {
    const scheme = useColorScheme(); // "light" or "dark"
    const styles = createStyles(scheme);

    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(todo.text);

    const saveEdit = () => {
        onEdit(todo.id, editedText)
        setIsEditing(false);
    }

    return (
        <View style={styles.listItem}>
            {isDeleted ? (
                <Text style={styles.body}>{todo.text}</Text>
            ) : !isEditing ? (
                <View style={styles.row}>
                    <Text style={styles.body}>{todo.text}</Text>

                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
                            <Text style={styles.buttonText}>✏️</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={onComplete}>
                            <Text style={styles.buttonText}>✅</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={onDelete}>
                            <Text style={styles.buttonText}>❌</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View style={styles.row}>
                    <TextInput
                        style={styles.input}
                        value={editedText}
                        onChangeText={setEditedText}
                        multiline={true}
                        numberOfLines={2}
                    />

                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.button} onPress={saveEdit}>
                            <Text style={styles.buttonText}>💾</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => setIsEditing(false)}>
                            <Text style={styles.buttonText}>❌</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View >
    );
}
