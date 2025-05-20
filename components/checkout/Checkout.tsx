import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    TextInput,
    Alert
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import axios from 'axios';

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

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Checkout = ({route}: CheckoutProps) => {
    const {data} = route.params;
    let cena=0;

    if(data.popust){
        cena=data.CenaSoPopust;
    }
    else{
        cena=data.price;
    }


    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
    });
    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{9,}$/;

        if (!formData.email.match(emailRegex)) {
            Alert.alert('Грешка', 'Внесете валидна емаил адреса');
            return false;
        }
        if (!formData.phone.match(phoneRegex)) {
            Alert.alert('Грешка', 'Внесете валиден телефонски број');
            return false;
        }
        return true;
    };
    const sendData: () => Promise<void> = async () => {
        try {
            const response = await axios.post('http://192.168.0.102:9090/SendMail', {
                key1: data,
                key2: formData,
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <View style={styles.container}>
            <ScrollView>
                <View >
                    <View style={styles.formContainer}>
                        {/* Delivery Information Form */}
                        <Text style={styles.formTitle}>Информации за достава</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Име"
                            placeholderTextColor="#9e9e9e"
                            value={formData.firstName}
                            onChangeText={(text) => setFormData({...formData, firstName: text})}
                            autoCapitalize="words"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Презиме"
                            placeholderTextColor="#9e9e9e"
                            value={formData.lastName}
                            onChangeText={(text) => setFormData({...formData, lastName: text})}
                            autoCapitalize="words"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Емаил"
                            placeholderTextColor="#9e9e9e"
                            value={formData.email}
                            onChangeText={(text) => setFormData({...formData, email: text})}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Телефон"
                            placeholderTextColor="#9e9e9e"
                            value={formData.phone}
                            onChangeText={(text) => setFormData({...formData, phone: text})}
                            keyboardType="phone-pad"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Адреса за достава"
                            placeholderTextColor="#9e9e9e"
                            value={formData.address}
                            onChangeText={(text) => setFormData({...formData, address: text})}
                            multiline={true}
                            numberOfLines={1}
                        />
                    </View>







                    <Image
                        source={{uri: data.imageHash}}
                        style={styles.image}
                    />
                    <View>
                        <Text style={styles.productInfo}>{data.opis}</Text>
                        <Text style={styles.productInfo}>{data.detalenOpis}</Text>

                        <View style={styles.golemina}>
                            <Text >Цена: </Text>
                            <Text style={styles.size}>{cena}</Text>
                        </View>

                    </View>

                    <View style={styles.golemina}>
                        <Text >Големина: </Text>
                        <Text style={styles.size}>{data.sizePicked}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => {
                       if(validateForm()) {
                       sendData()
                       }
                    }}
                >
                    <Text style={styles.submitButtonText}>Нарачај</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 0,
        height:screenHeight,
        width: screenWidth,
    },
    productInfo: {
        padding: 0,
    },
    image: {
        width: screenWidth,
        height: 550,

    },
    golemina:{
        flexDirection: 'row',
    },
    size:{
        fontSize: 15,
        fontWeight: 'bold',
    },
    // form
    formContainer: {
        padding: 16,
    },
    formTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 8,
        marginBottom: 12,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
        color: '#000000',
    },
    submitButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Checkout;