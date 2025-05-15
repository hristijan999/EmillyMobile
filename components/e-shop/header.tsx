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
}

// const header: React.FC<HeaderProps> = ({ scrollY }) => {
//
//     const animatedScrollY = useSharedValue(0);
//     const [menDropdownVisible, setMenDropdownVisible] = useState(false);
//     const [womenDropdownVisible, setWomenDropdownVisible] = useState(false);
//
//
//
//
//     useEffect(() => {
//         animatedScrollY.value = scrollY;
//     }, [scrollY]);
//
//     // Create animated styles based on scroll position
//     const animatedStyle = useAnimatedStyle(() => {
//         const opacity = interpolate(
//             animatedScrollY.value,
//             [0, 100],
//             [1, 0.0],
//             Extrapolation.CLAMP
//         );
//
//         return {
//             opacity,
//         };
//     });
//
//     return (
//         <Animated.View style={[styles.container, animatedStyle]} testID="header-container">
//             <Animated.Image
//                 source={{
//                     uri: 'https://gateway.pinata.cloud/ipfs/QmTwebymmmakVNnkmSsTVPNu6H5rLBosFLJZbiw2sUYmuS',
//                 }}
//                 style={styles.image}
//                 resizeMode="contain"
//                 testID="header-image"
//             />
//                 <View style={styles.navigacija}>
//                     <View style={styles.dropdownContainer}>
//                         <TouchableOpacity
//                             onPress={() => toggleDropdown('men')}
//                             style={[
//                                 styles.dropdownButton,
//                                 activeDropdown === 'men' && styles.activeButton
//                             ]}
//                         >
//                             <Text style={styles.dropdownButtonText}>Мажи</Text>
//                         </TouchableOpacity>
//
//                         {activeDropdown === 'men' && (
//                             <Animated.View style={[styles.dropdownContent, { maxHeight: dropdownHeight }]}>
//                                 <TouchableOpacity style={styles.dropdownItem}>
//                                     <Text>Кошули</Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity style={styles.dropdownItem}>
//                                     <Text>Панталони</Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity style={styles.dropdownItem}>
//                                     <Text>Јакни</Text>
//                                 </TouchableOpacity>
//                             </Animated.View>
//                         )}
//                     </View>
//
//                     {/* Women's dropdown */}
//                     <View style={styles.dropdownContainer}>
//                         <TouchableOpacity
//                             onPress={() => toggleDropdown('women')}
//                             style={[
//                                 styles.dropdownButton,
//                                 activeDropdown === 'women' && styles.activeButton
//                             ]}
//                         >
//                             <Text style={styles.dropdownButtonText}>Жени</Text>
//                         </TouchableOpacity>
//
//                         {activeDropdown === 'women' && (
//                             <Animated.View style={[styles.dropdownContent, { maxHeight: dropdownHeight }]}>
//                                 <TouchableOpacity style={styles.dropdownItem}>
//                                     <Text>Фустани</Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity style={styles.dropdownItem}>
//                                     <Text>Блузи</Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity style={styles.dropdownItem}>
//                                     <Text>Здолништа</Text>
//                                 </TouchableOpacity>
//                             </Animated.View>
//                         )}
//                     </View>
//
//
//                 </View>
//         </Animated.View>
//
//     );
// };
//

//
// export default header;

const header: React.FC<HeaderProps> = ({ scrollY }) => {
    const animatedScrollY = useSharedValue(0);

    // Manage which dropdown is open: 'men', 'women', or null
    const [activeDropdown, setActiveDropdown] = useState<'men' | 'women' | null>(null);

    useEffect(() => {
        animatedScrollY.value = scrollY;
    }, [scrollY]);

    const toggleDropdown = (dropdown: 'men' | 'women') => {
        setActiveDropdown(prev => (prev === dropdown ? null : dropdown));
    };

    // You can animate dropdownHeight if needed, or just hardcode it:
    const dropdownHeight = 150;

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
                        <Animated.View style={[styles.dropdownContent, { maxHeight: dropdownHeight }]}>
                            <TouchableOpacity style={styles.dropdownItem}>
                                <Text>Кошули</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem}>
                                <Text>Панталони</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem}>
                                <Text>Јакни</Text>
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
                        <Animated.View style={[styles.dropdownContent, { maxHeight: dropdownHeight }]}>
                            <TouchableOpacity style={styles.dropdownItem}>
                                <Text>Фустани</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem}>
                                <Text>Блузи</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem}>
                                <Text>Здолништа</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    )}
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
        paddingVertical: 10,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    image: {
        width: 150,
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
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    dropdownContainer: {
        position: 'relative', // So dropdownContent absolute is relative to this container
        marginHorizontal: 10,
    },

    activeButton: {
        backgroundColor: '#007AFF', // iOS blue color for active state
        borderRadius: 5,
        // Optional: add shadow for more emphasis
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 3, // Android shadow
    },
});
export default header;