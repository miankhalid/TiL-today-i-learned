import React, { useEffect } from 'react';
import { Button, TextInput, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedProps,
    useAnimatedStyle,
    useSharedValue, withSpring,
    withTiming
} from 'react-native-reanimated';
import createStyles from '../../themes/Styles';

const styles = createStyles();

export default function AnimationsScren() {
    const width = useSharedValue(50);
    const height = useSharedValue(50);
    const translateX = useSharedValue(0);

    const handleEnlarge = () => {
        width.value = withSpring(width.value + 25, Easing.inOut(Easing.quad));
        height.value = withTiming(height.value + 25, {
            duration: 400,
            easing: Easing.inOut(Easing.bounce),
        });
    };

    const handleTranslate = () => {
        translateX.value = withSpring(translateX.value + 10);
    };

    /** animated style example
    useAnimatedStyle lets you access the value stored in a shared value.
    Thanks to that we could multiply the value by 2 before assigning it to style.
    This hook has one more advantage over passing animations to inline styles.
    It allows you to keep all the animation-related logic in one place.
    */
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: withSpring(translateX.value * 2) }],
    }));

    // animated props example
    const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
    const sliderValue = useSharedValue(0);
    const animatedProps = useAnimatedProps(() => {
        // This will format the number as a string with one decimal
        const text = `$${sliderValue.value.toFixed(1)}`;
        // Return the prop you want to animate
        return { text: text };
    });

    // (In a real app, you'd update sliderValue with a slider or gesture)
    useEffect(() => {
        sliderValue.value = withTiming(100, { duration: 2000 });
    }, []);

    return (
        <View style={styles.container}>
            <Button onPress={handleEnlarge} title="Enlarge" />
            <Button onPress={handleTranslate} title="Translate" />
            <Animated.View
                style={[{
                    width, height, backgroundColor: 'violet',
                    animatedStyles
                }, animatedStyles]}
            />
            <AnimatedTextInput
                style={styles.text}
                editable={false}
                animatedProps={animatedProps}
            />
        </View>
    );
}
