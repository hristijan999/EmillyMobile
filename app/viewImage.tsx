import {View, Text, ScrollView} from "react-native";
import {Link} from "expo-router";

export default function ViewImage() {
    return (
        <ScrollView className="flex-1 bg-gray-100">
            <View className="flex-1 justify-center items-center p-4">
                <Text className="text-3xl text-blue-500 font-bold">View Image</Text>
                <Link href="/" className="mt-4">
                    <Text className="text-blue-500">Go back</Text>
                </Link>
            </View>
        </ScrollView>
    );

}
