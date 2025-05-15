# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Features

### Scroll-Based Header Opacity

The app includes a header that gradually fades out as the user scrolls down the page:

- **Smooth Opacity Transition**: Header opacity decreases from 1 to 0 as the user scrolls from 0 to 100 pixels
- **Optimized Performance**: Uses React Native Reanimated for smooth animations with native performance
- **Scroll Position Tracking**: Efficiently tracks scroll position with appropriate throttling

Implementation details:
```jsx
// In Header component
useEffect(() => {
    // Update the animated value when scrollY changes
    animatedScrollY.value = scrollY;
}, [scrollY]);

// Create animated styles based on scroll position
const animatedStyle = useAnimatedStyle(() => {
    // Interpolate opacity from 1 to 0 as scrollY increases from 0 to 100
    const opacity = interpolate(
        animatedScrollY.value,
        [0, 100],
        [1, 0.0],
        Extrapolation.CLAMP
    );

    return {
        opacity,
    };
});

// Apply the animated style to the header container
<Animated.View style={[styles.container, animatedStyle]}>
    {/* Header content */}
</Animated.View>
```

### Pinch-to-Zoom Images

The app includes a pinch-to-zoom feature for images displayed in the FlatList:

- **Pinch Gesture**: Use two fingers to zoom in and out of images
- **Pan Gesture**: When zoomed in, drag to move around the image
- **Double Tap**: Double tap to zoom in or reset zoom level

The implementation uses:
- `react-native-gesture-handler` for gesture recognition
- `react-native-reanimated` for smooth animations

Each image in the carousel supports independent zooming, allowing users to interact with images naturally.

## NativeWind Integration

This project uses [NativeWind](https://www.nativewind.dev/) (v4) for styling, which brings the power of Tailwind CSS to React Native. Here's what's included:

- **TailwindCSS Configuration**: The `tailwind.config.js` file is set up to scan your app files for classes.
- **Styling Components**: Use the `className` prop to style your components with Tailwind classes.
- **Example Component**: Check out `app/components/NativeWindExample.tsx` for examples of NativeWind usage.

### Using NativeWind

```jsx
// Example of using NativeWind classes
<View className="p-4 bg-blue-500 rounded-lg">
  <Text className="text-white font-bold">Hello NativeWind!</Text>
</View>
```

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.
- [NativeWind documentation](https://www.nativewind.dev/): Learn how to use Tailwind CSS in React Native.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
