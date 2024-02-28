import React from "react";
import { Button } from "react-native";
import { Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";


export default function HomeScreen({navigation}) {

    return (
        <SafeAreaProvider>
            <View className="flex-1 justify-center items-center bg-blue-700">
                <Text className="font-bold text-5xl">Home screen testing</Text>

                <Text>New Record</Text>
                <Button title="go to new record" onPress={() => navigation.navigate("NewRecord")} />
                
            </View>
        </SafeAreaProvider>
    )
}