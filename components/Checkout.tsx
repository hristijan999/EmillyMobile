import {View} from "react-native";
import Checkout from "@/components/checkout/Checkout";
import React from "react";

import {RouteProp} from "@react-navigation/native";

interface Roba {
    id: number;
    type: string;
    price: number;
    imageHash: string;
    opis: string;
    detalenOpis: string;
    lista_Sliki: string[];
    lista_size: string[];
    sizePicked: string;
    popust: boolean;
    CenaSoPopust: number;
}

type RootStackParamList = {
    Checkout: { data: Roba };
};

type CheckoutRouteProp = RouteProp<RootStackParamList, 'Checkout'>;

interface CheckoutProps {
    route: CheckoutRouteProp;
}

const Checkoutt = ({ route }: CheckoutProps$$) => {


    return (
        <View style={styles.container}>
            <Checkout route={route} />
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
};

export default Checkoutt;