import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import eShop from "../components/eShop";



const Stack = createStackNavigator();

const App = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 ,backgroundColor:'white'}}>
            <SafeAreaView style={{ flex: 1, backgroundColor:'white'}}>

                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="eShop" component={eShop} />
                    </Stack.Navigator>

            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

export default App;
