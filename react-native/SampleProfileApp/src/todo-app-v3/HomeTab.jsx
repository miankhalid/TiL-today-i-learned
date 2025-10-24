import React from 'react';
import {
    SectionList,
    Text,
    useColorScheme
} from 'react-native';
import createStyles from './themes/Styles';
import TodoItem from './components/TodoItem';
import { useTodos } from './context/useTodos';

export default function HomeTab() {
    const scheme = useColorScheme(); // "light" or "dark"
    const styles = createStyles(scheme);
    const { todos, deletedTodos, markComplete, deleteTodo, editTodo } = useTodos();

    const incompleteTodos = todos.filter(item => !item.done);

    const sections = [
        {
            title: 'Incomplete',
            data: incompleteTodos,
        },
        {
            title: 'Deleted',
            data: deletedTodos,
        },
    ];

    const renderSectionHeader = ({ section: { title } }) => (
        <Text style={[styles.heading3, styles.sectionHeader]}>{title}</Text>
    );

    return (
        <SectionList
            sections={sections}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, section }) => (
                <TodoItem
                    todo={item}
                    onComplete={() => markComplete(item.id)}
                    onDelete={() => deleteTodo(item.id)}
                    onEdit={editTodo}
                    isDeleted={section.title === 'Deleted'}
                />
            )}
            renderSectionHeader={renderSectionHeader}
            style={styles.container}
        />
    );
}
