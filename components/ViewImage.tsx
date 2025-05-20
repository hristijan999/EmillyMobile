import React from 'react';
import { View, StyleSheet } from 'react-native';
import ViewImagee from '../components/viewImage/viewImage';
import { RouteProp } from '@react-navigation/native';

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
    ViewImage: { data: Roba };
};

type ViewImageRouteProp = RouteProp<RootStackParamList, 'ViewImage'>;

interface ViewImageProps {
    route: ViewImageRouteProp;
}

const ViewImage = ({ route }: ViewImageProps) => {


    return (
        <View style={styles.container}>
            <ViewImagee route={route} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default ViewImage;