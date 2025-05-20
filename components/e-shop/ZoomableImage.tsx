import React from 'react';
import { Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDecay,
    useAnimatedGestureHandler,
    runOnJS,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_HEIGHT = SCREEN_WIDTH * 1.4;

const ZoomableImage = ({ uri }: { uri: string }) => {
    const scale = useSharedValue(1);
    const focalX = useSharedValue(0);
    const focalY = useSharedValue(0);

    const pinchGesture = Gesture.Pinch()
        .onUpdate((e) => {
            scale.value = e.scale;
            focalX.value = e.focalX;
            focalY.value = e.focalY;
        })
        .onEnd(() => {
            scale.value = withTiming(1, { duration: 200 });
        });

    const animatedStyle = useAnimatedStyle(() => {
        const dx = focalX.value - SCREEN_WIDTH / 2;
        const dy = focalY.value - IMAGE_HEIGHT / 2;

        return {
            width: SCREEN_WIDTH,
            height: IMAGE_HEIGHT,
            transform: [
                { translateY: dy },
                { translateX: dx },
                { scale: scale.value },
                { translateY: -dy },
                { translateX: -dx },

            ],
        };
    });

    return (
        <GestureDetector gesture={pinchGesture}>


            <Animated.Image
                source={{ uri }}
                style={animatedStyle}

            />

        </GestureDetector>
    );
};

export default ZoomableImage;
