import React, { useState } from 'react';
import {
    View, Text, Button, Pressable, TextInput, ScrollView,
    FlatList, SectionList, Image, Modal, ActivityIndicator,
    Switch, StatusBar, TouchableOpacity, useColorScheme
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import createStyles from '../themes/Styles';
import FastImage from 'react-native-fast-image';

const DATA = [
    { id: '1', title: 'Item One' },
    { id: '2', title: 'Item Two' },
];

const SECTIONS = [
    { title: 'Section 1', data: ['S1 Item 1', 'S1 Item 2'] },
    { title: 'Section 2', data: ['S2 Item 1', 'S2 Item 2'] },
];

export default function DemoScreen({ darkMode = true }) {

    const scheme = useColorScheme(); // "light" or "dark"
    const styles = createStyles(scheme);
    const [text, setText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Status bar adapts to scheme */}
            <StatusBar
                barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
                backgroundColor={styles.container.backgroundColor}
            />
            <ScrollView style={styles.scrollView}>
                <Text style={styles.heading1}>Demo Screen</Text>
                <Text style={styles.body}>
                    This demonstrates all base React Native components styled from
                    styles.js
                </Text>

                {/* Button */}
                <Button title="Native Button" onPress={() => { }} />

                {/* TouchableOpacity */}
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Touchable Button</Text>
                </TouchableOpacity>

                {/* Pressable */}
                <Pressable style={styles.buttonSecondary}>
                    <Text style={styles.buttonText}>Pressable Button</Text>
                </Pressable>

                {/* Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Enter text"
                    value={text}
                    onChangeText={setText}
                    placeholderTextColor={scheme === 'dark' ? '#aaa' : '#666'}
                />

                {/* Local Image */}
                <Image
                    source={require('../../assets/images/welcome.jpg')}
                    style={styles.image}
                />

                {/* Remote Image */}
                <Image
                    source={{ uri: 'https://reactnative.dev/docs/assets/p_cat1.png' }}
                    style={styles.image}
                />

                {/* URI Data Images */}
                <Image
                    style={{
                        width: 51,
                        height: 51,
                        resizeMode: 'cover',
                    }}
                    source={{
                        uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
                    }}
                />

                {/* Card */}
                <View style={styles.card}>
                    <Text style={styles.body}>This is a card</Text>
                </View>

                {/* Local GIF */}
                {/* https://github.com/DylanVann/react-native-fast-image */}
                <FastImage
                    style={styles.gif}
                    source={require('../../assets/images/fine.gif')}
                    resizeMode={FastImage.resizeMode.contain}
                />

                {/* Remote GIF */}
                <FastImage
                    style={styles.gif}
                    source={{
                        uri: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDZybzR5czQ4N3JuejRtM2VibG40bGx2bWJiZjM1dTZyYWI5dXJ3eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NWg7M1VlT101W/giphy.gif',
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />

                {/* FlatList */}
                <FlatList
                    data={DATA}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            <Text style={styles.listItemText}>{item.title}</Text>
                        </View>
                    )}
                />

                {/* SectionList */}
                <SectionList
                    sections={SECTIONS}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            <Text style={styles.listItemText}>{item}</Text>
                        </View>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.heading3}>{title}</Text>
                    )}
                />

                {/* Switch */}
                <View style={styles.rowBetween}>
                    <Text style={styles.body}>Enable option</Text>
                    <Switch value={isEnabled} onValueChange={setIsEnabled} />
                </View>

                {/* ActivityIndicator */}
                <ActivityIndicator size="large" color={styles.button.backgroundColor} />

                {/* Modal */}
                <TouchableOpacity
                    style={styles.buttonAccent}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.buttonText}>Open Modal</Text>
                </TouchableOpacity>
                <Modal transparent visible={modalVisible}>
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContent}>
                            <Text style={styles.body}>This is a modal</Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.buttonText}>Close Modal</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
}
