import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import createStyles from '../../themes/Styles';

export default function TodoItem({ todo, onComplete, onDelete, onEdit }) {
    const scheme = useColorScheme(); // "light" or "dark"
    const styles = createStyles(scheme);

    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(todo.text);

    const saveEdit = () => {
        onEdit(todo.id, editedText)
        setIsEditing(false);
    }

    return (
        <View style={styles.row}>
            {!isEditing ? (
                <>
                    <Text style={styles.body} >{todo.text}</Text>

                    <TouchableOpacity style={styles.button} onPress={() => { setIsEditing(true); }}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={onComplete}>
                        <Text style={styles.buttonText}>Complete</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={onDelete}>
                        <Text style={styles.buttonText}>❌</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <TextInput
                        style={styles.input}
                        value={editedText}
                        onChangeText={setEditedText}
                    />
                    <TouchableOpacity style={styles.button} onPress={saveEdit}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => setIsEditing(false)}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </>
            )
            }
        </View >
    );
}
