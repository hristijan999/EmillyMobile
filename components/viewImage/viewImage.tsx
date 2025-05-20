import React, { useState,useRef,useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    ScrollView,

    Image,
    TouchableOpacity,
    NativeSyntheticEvent, NativeScrollEvent
} from 'react-native';
import { RouteProp,useNavigation } from '@react-navigation/native';
import ZoomableImage from '../e-shop/ZoomableImage';
import ImagesList from '../e-shop/ImagesList';

type ScrollViewType = {
    scrollTo: (options: { x?: number; y?: number; animated?: boolean }) => void;
    scrollToEnd: (options?: { animated?: boolean }) => void;
    scrollBy: (options: { x?: number; y?: number; animated?: boolean }) => void;
} & ScrollView;
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

const screenWidth = Dimensions.get('window').width;

const ViewImage = ({ route }: ViewImageProps) => {
    const { data } = route.params;
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigation = useNavigation<any>();

    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    console.log(selectedSize);



    const scrollViewRef = useRef<ScrollViewType>(null);
    const scrollDownRelative = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({
                y: 100,
                animated: true
            });
        }
    };

    useEffect(() => {
        if (selectedSize !== null) {
            scrollDownRelative();
        }
    }, [selectedSize]);



    const images = [data.imageHash, ...data.lista_Sliki];

    if (selectedSize != null) {
        data.sizePicked = selectedSize;
    }
    console.log("ova e odbrano "+data.sizePicked);
    const handleScroll = (event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / screenWidth);
        setCurrentIndex(index);
    };

    return (
        <View style={styles.container}>
            <ScrollView ref={scrollViewRef}
                        scrollEventThrottle={16} >

            <FlatList
                style={styles.image}
                data={images}
                horizontal
                pagingEnabled
                keyExtractor={(uri, index) => `${uri}-${index}`}
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                renderItem={({item: uri}) => (


                        <ZoomableImage uri={uri}  />

                )}
            />
            {/* Pagination dots */}
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



                    <Text style={styles.title}>{data.opis}</Text>
                    <Text style={styles.description}>{data.detalenOpis}</Text>

                    {/* Price display */}
                    {data.popust ? (
                        <View style={styles.priceContainer}>
                            <Text style={styles.discountedPrice}>{data.CenaSoPopust} den.</Text>
                            <Text style={styles.originalPrice}>{data.price} den.</Text>
                        </View>
                    ) : (
                        <Text style={styles.price}>{data.price} den.</Text>
                    )}

                    {/* Size options */}
                    {data.lista_size && data.lista_size.length > 0 && (
                        <View style={styles.sizeContainer}>
                            <Text style={styles.sizeTitle}>Available Sizes:</Text>
                            <View style={styles.sizeList}>

                                {data.lista_size.map((size, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => {

                                            setSelectedSize(size);
                                        }}
                                        style={[
                                            styles.sizeItem,
                                            selectedSize === size && styles.selectedSizeItem,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.sizeText,
                                                selectedSize === size && styles.selectedSizeText,
                                            ]}
                                        >
                                            {size}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                                {selectedSize && (
                                    <TouchableOpacity
                                        style={styles.actionButton}
                                        onPress={() => {
                                            navigation.navigate('Checkout', { data: data })

                                        }}
                                    >
                                        <Text style={styles.actionButtonText}>Add to Cart</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    )}
                </ScrollView>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 0,
        height: '100%',
        width: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop:0,
        marginBottom: 0,
    },
    image: {
        width: screenWidth,
        marginBottom: 0,

    },
    dotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 0,
        marginBottom: 0,
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
    description: {
        fontSize: 16,
        marginBottom: 16,
        lineHeight: 24,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    discountedPrice: {
        color: 'green',
        fontWeight: 'bold',
        fontSize: 18,
    },
    originalPrice: {
        color: 'gray',
        textDecorationLine: 'line-through',
        fontSize: 16,
    },
    sizeContainer: {
        marginTop: 16,
    },
    selectedSizeItem: {
        borderColor: '#000',
        backgroundColor: '#cdeffd', // highlighted background
    },
    selectedSizeText: {
        color: '#000', // darker text when selected
        fontWeight: 'bold',
    },
    sizeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    sizeList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    sizeItem: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        margin: 4,
    },
    sizeText: {
        fontSize: 18,
    },
    actionButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
        width: '100%', // or specific width as needed
    },
    actionButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default ViewImage;