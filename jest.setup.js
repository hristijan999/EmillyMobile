// Mock the expo-router module
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
  Link: 'Link',
  Stack: 'Stack',
}));

// Mock the NativeWind styling
jest.mock('nativewind', () => ({
  styled: (component) => component,
}));

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  const RealGestureHandler = jest.requireActual('react-native-gesture-handler');
  return {
    ...RealGestureHandler,
    GestureDetector: ({ children }) => children,
    GestureHandlerRootView: ({ children }) => children,
    Gesture: {
      Pinch: () => ({
        onStart: () => ({}),
        onUpdate: () => ({}),
        onEnd: () => ({}),
      }),
      Pan: () => ({
        onStart: () => ({}),
        onUpdate: () => ({}),
        onEnd: () => ({}),
      }),
      Tap: () => ({
        numberOfTaps: () => ({
          onEnd: () => ({}),
        }),
      }),
      Simultaneous: () => ({}),
      Exclusive: () => ({}),
    },
  };
});

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  // Mock the useAnimatedStyle hook
  Reanimated.useAnimatedStyle = () => ({});
  return {
    ...Reanimated,
    default: {
      ...Reanimated,
      View: require('react-native').View,
      Image: require('react-native').Image,
      ScrollView: require('react-native').ScrollView,
      FlatList: require('react-native').FlatList,
    },
  };
});

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');