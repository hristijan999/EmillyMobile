import React, {useEffect, useState} from 'react';
import {
    useAnimatedStyle,
    useSharedValue,
    interpolate,
    Extrapolation,
} from 'react-native-reanimated';

import Animated from 'react-native-reanimated';
import { colors } from '../../styles/global';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';


interface HeaderProps {
    scrollY: number;
    onSelectCategory: (category: string) => void;
}

const header: React.FC<HeaderProps> = ({ scrollY,onSelectCategory  }) => {
    const animatedScrollY = useSharedValue(0);

    // Manage which dropdown is open: 'men', 'women', or null
    const [activeDropdown, setActiveDropdown] = useState<'men' | 'women' | null>(null);

    useEffect(() => {
        animatedScrollY.value = scrollY;
    }, [scrollY]);

    const toggleDropdown = (dropdown: 'men' | 'women') => {
        setActiveDropdown(prev => (prev === dropdown ? null : dropdown));
    };



    const animatedStyle = useAnimatedStyle(() => {
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

    return (
        <Animated.View style={[styles.container, animatedStyle]} testID="header-container">
            <Animated.Image
                source={{
                    uri: 'https://gateway.pinata.cloud/ipfs/QmTwebymmmakVNnkmSsTVPNu6H5rLBosFLJZbiw2sUYmuS',
                }}
                style={styles.image}
                resizeMode="contain"
                testID="header-image"
            />
            <View style={styles.navigacija}>
                <View style={styles.dropdownContainer}>
                    <TouchableOpacity
                        onPress={() => toggleDropdown('men')}
                        style={[
                            styles.dropdownButton,
                            activeDropdown === 'men' && styles.activeButton,
                        ]}
                    >
                        <Text style={styles.dropdownButtonText}>Мажи</Text>
                    </TouchableOpacity>

                    {activeDropdown === 'men' && (
                        <Animated.View style={[styles.dropdownContent]}>
                            <TouchableOpacity style={styles.dropdownItem} onPress={() => onSelectCategory("Kostum")}>
                                <Text>Костум</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem} onPress={() => onSelectCategory("Konduri")}>
                                <Text>Кондури</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem} onPress={() => onSelectCategory("Sako")}>
                                <Text>Сако</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem} onPress={() => onSelectCategory("Kosula")}>
                                <Text>Кошула</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem} onPress={() => onSelectCategory("MaskiKaput")}>
                                <Text>Капут</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    )}
                </View>

                {/* Women's dropdown */}
                <View style={styles.dropdownContainer}>
                    <TouchableOpacity
                        onPress={() => toggleDropdown('women')}
                        style={[
                            styles.dropdownButton,
                            activeDropdown === 'women' && styles.activeButton,
                        ]}
                    >
                        <Text style={styles.dropdownButtonText}>Жени</Text>
                    </TouchableOpacity>

                    {activeDropdown === 'women' && (
                        <Animated.View style={[styles.dropdownContent]}>
                            <TouchableOpacity style={styles.dropdownItem}  onPress={() => onSelectCategory("Fustan")}>
                                <Text>Фустани</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem} onPress={() => onSelectCategory("Kruni")}>
                                <Text>Круни</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem} onPress={() => onSelectCategory("ZenskiKaput")}>
                                <Text>Капут</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem} onPress={() => onSelectCategory("ZenskiKaput")}>
                                <Text>Капут</Text>
                            </TouchableOpacity>

                        </Animated.View>
                    )}
                </View>
                <View style={styles.dropdownContainer}>
                    <TouchableOpacity style={styles.dropdownItem} onPress={() => onSelectCategory("Попуст")}>
                        <Text style={styles.dropdownButtonText}>Попуст</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>
    );
};
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingVertical: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    image: {
        width: 180,
        height: 80,
    },
    navigacija:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },

    dropdownButton: {
        padding: 10,
    },
    dropdownButtonText: {
        fontSize: 16,
        fontWeight: '500',
    },
    dropdownContent: {
        position: 'absolute',
        top: 40,
        backgroundColor: 'white',
        minWidth: 150,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 4,
    },
    dropdownItem: {
        padding: 10,

        borderBottomColor: '#f0f0f0',
    },
    dropdownContainer: {
        position: 'relative',
        marginHorizontal: 10,
    },

    activeButton: {
        borderRadius: 5,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 3,
    },
});
export default header;