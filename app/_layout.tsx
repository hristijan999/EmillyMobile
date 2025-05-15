import { Stack } from "expo-router";
import './globals.css';

export default function RootLayout() {
  return (
      <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: '#ffffff', // example background color
            },
          }}
      >
        <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
        />
      </Stack>
  );
}
