import { View, Text, Image, TouchableOpacity, ScrollView, Switch } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import BackIcon from "../assets/icons/back.png"
import { useState } from "react"


export default function Settings({ navigation }) {
    const [savePassword, setSavePassword] = useState(false)
    const [onlyWifi, setOnlyWifi] = useState(false)
    const [ads, setAds] = useState(false)
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <ScrollView style={{
                    width: "100%",
                    height: "100%",
                    padding: 20,
                }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: 'center',
                        }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={BackIcon} style={{
                                width: 30,
                                height: 30,
                                objectFit: "contain"
                            }} />
                        </TouchableOpacity>
                        <Text
                            style={{
                                marginLeft: 10,
                                fontSize: 20,
                            }}>Sozlamalar</Text>
                    </View>
                    <View
                        style={{
                            marginTop: 30,
                        }}>
                        <Text
                            style={{
                                color: "blue"
                            }}>Yuklab olish</Text>
                        <View
                            style={{
                                width: "100%",
                                height: 70,
                                marginVertical: 20,
                            }}>
                            <Text
                                style={{
                                    fontSize: 20,
                                }}>Yuklab olish joyi</Text>
                            <Text
                                style={{
                                    color: "gray"
                                }}>/storage/emulated/0/document/download/videoDownloader</Text>
                        </View>
                        <View style={{
                            height: 1,
                            width: "100%",
                            backgroundColor: "lightgray",
                            marginBottom: 20,
                        }}></View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: 20,
                            }}>
                            <Text style={{
                                fontSize: 20,
                            }}>Faqat wifi orqali yuklash</Text>
                            <Switch
                                onValueChange={() => setOnlyWifi(!onlyWifi)}
                                value={onlyWifi} />
                        </View>
                        <View style={{
                            height: 1,
                            width: "100%",
                            backgroundColor: "lightgray",
                            marginBottom: 20,
                        }}></View>
                        <Text style={{
                            color: "blue"
                        }}>Brauzer</Text>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginVertical: 20,
                                alignItems: "center",
                                paddingHorizontal: 0.001,
                            }}>
                            <View>
                                <Text
                                    style={{
                                        fontSize: 16,
                                    }}>Reklamalarni block qilish</Text>
                                <Text>{ads ? "Yoniq" : "O'chiq"}</Text>
                            </View>
                            <Switch
                                onValueChange={() => setAds(!ads)}
                                value={ads} />
                        </View>
                        <View style={{
                            height: 1,
                            width: "100%",
                            backgroundColor: "lightgray",
                            marginBottom: 20,
                        }}></View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: "center",
                                paddingHorizontal: 0.001,
                            }}>
                            <View
                                style={{
                                    marginBottom: 20,
                                }}>
                                <Text
                                    style={{
                                        fontSize: 15,
                                    }}>Parollingizni saqlang</Text>
                                <Text>Taniqli</Text>
                            </View>
                            <Switch
                                onValueChange={() => setSavePassword(!savePassword)}
                                value={savePassword} />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider >
    )
}