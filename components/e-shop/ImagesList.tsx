import React, { useEffect, useState, useRef } from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {useAnimatedStyle, useSharedValue, withTiming,} from 'react-native-reanimated';

import ZoomableImage from './ZoomableImage';
import { colors, spacing, globalStyles } from '../../styles/global';
import Header from './header';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    Dimensions,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from 'react-native';
import axios from 'axios';
import { roba } from '@/library/constants';

const screenWidth = Dimensions.get('window').width;

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

    const ImagesList = () => {
        const [data, setData] = useState<Roba[]>([]);
        const [scrollY, setScrollY] = useState(0);
        const [currentIndexMap, setCurrentIndexMap] = useState<Record<number, number>>({});
        const navigation = useNavigation<any>();
        const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
        const handleCategorySelect = (category: string) => {
            setSelectedCategory(category);
        };

        useEffect(() => {
            axios.get(roba).then((response) => {
                setData(response.data);
            });
        }, []);


        let filteredData: Roba[] = [];

        if (selectedCategory && selectedCategory !== "Попуст") {
            filteredData = data.filter(item =>
                item.type.toLowerCase() === selectedCategory.toLowerCase()
            );
        } else if (selectedCategory === "Попуст") {
            filteredData = data.filter(item => item.popust);
        } else {
            filteredData = data;
        }




        const handleScroll = (
            event: NativeSyntheticEvent<NativeScrollEvent>,
            postId: number
        ) => {
            const offsetX = event.nativeEvent.contentOffset.x;
            const index = Math.round(offsetX / screenWidth);
            setCurrentIndexMap((prev) => ({...prev, [postId]: index}));
        };

        const renderImageCarousel = (item: Roba) => {
            const images = [item.imageHash, ...item.lista_Sliki];
            const currentIndex = currentIndexMap[item.id] ?? 0;


            return (
                <View>
                    <FlatList
                        data={images}
                        horizontal
                        pagingEnabled
                        keyExtractor={(uri, index) => `${uri}-${index}`}
                        showsHorizontalScrollIndicator={false}
                        onScroll={(event) => handleScroll(event, item.id)}
                        renderItem={({item: uri}) => (
                            <TouchableOpacity 
                                activeOpacity={0.9}
                                onPress={() => navigation.navigate('ViewImage', { data: item })}
                                style={{ width: screenWidth, height: screenWidth * 1.4 }}
                            >
                                <ZoomableImage uri={uri} />
                            </TouchableOpacity>
                        )}
                    />

                    {/*tockite*/}
                    <View style={styles.dotContainer}>
                        {images.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.dot,
                                    index === currentIndex ? styles.activeDot : {},
                                ]}
                            />
                        ))}
                    </View>
                </View>
            );
        };

        return (
            <View style={styles.view}>
                <Header scrollY={scrollY} onSelectCategory={handleCategorySelect} />

                <FlatList
                    testID="images-flatlist"
                    data={filteredData}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item }) => (
                        <View style={styles.postContainer}>
                            {renderImageCarousel(item)}
                            <Text style={styles.text}>{item.detalenOpis}</Text>

                            {item.popust ? (
                                <View style={styles.priceContainer}>
                                    <Text style={styles.discountedPrice}>{item.CenaSoPopust}</Text>
                                    <Text style={styles.originalPrice}>{item.price}den.</Text>
                                </View>
                            ) : (
                                <Text style={styles.text}>{item.price} den.</Text>
                            )}
                        </View>
                    )}
                    onScroll={(event) => {

                        setScrollY(event.nativeEvent.contentOffset.y);
                    }}

                    scrollEventThrottle={16}
                />
            </View>
        );
    };

const styles = StyleSheet.create({
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 10,
    },
    discountedPrice: {
        color: 'green',
        fontWeight: 'bold',
        fontSize: 16,
    },
    originalPrice: {
        color: 'gray',
        textDecorationLine: 'line-through',
        fontSize: 14,
    },
    postContainer: {
        marginBottom: 30,
    },
    listContent: {
        paddingTop: 100, // Add padding to account for the fixed header
    },
    text: {
        padding: 10,
        fontSize: 16,
    },
    dotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 8,
    },
    dot: {
        width: 15,
        height: 6,
        borderRadius: 6,
        backgroundColor: '#ccc',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#000',
    },
    view:{
        backgroundColor:colors.background,
        flex: 1,
    },
});

export default ImagesList;
