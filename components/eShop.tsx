import React from 'react';
import { View, StyleSheet } from 'react-native';
import ImagesList from '../components/e-shop/ImagesList';

const eShop = () => {
    return (
        <View style={styles.container}>
            <ImagesList />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default eShop;