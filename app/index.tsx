import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';


import Eshop from "../components/eShop";
import ViewImage from "../components/ViewImage";
import Checkout from "../components/Checkout";


const Stack = createStackNavigator();

const App = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 ,backgroundColor:'white'}}>
            <SafeAreaView style={{ flex: 1, backgroundColor:'white'}}>

                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Eshop" component={Eshop} />
                        <Stack.Screen name="ViewImage" component={ViewImage} />
                        <Stack.Screen name="Checkout" component={Checkout} />
                    </Stack.Navigator>

            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

export default App;
