import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Video from "../components/Video"

export default function Progress() {
    return (
        <SafeAreaView>
            <View style={{
                padding: 10,
                backgroundColor: "#00ccf5",
                marginVertical: 3,
                marginHorizontal: 10,
                borderRadius: 10,
            }}>
                <Text
                    style={{
                        fontSize: 20,
                    }}>DAVOM ETILMOQDA...</Text>
            </View>
            <ScrollView style={{
                marginHorizontal: 10,
            }}>
                <Video />
                <Video />
                <Video />
                <Video />
            </ScrollView>
        </SafeAreaView>
    );
}
