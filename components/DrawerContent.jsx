import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import FontIcon from "react-native-vector-icons/FontAwesome"
import { View, Text, ScrollView, TouchableWithoutFeedback, Image, Animated, TouchableOpacity } from "react-native"
import HomeMenu from "../components/HomeMenu"
import DotsIcon from "../assets/icons/dots.png"
import Browser from "../assets/icons/browser.png"
import * as Font from "expo-font"
import React, { useRef, useState } from "react"


export default function DrawerContent() {
    const [menu, setMenu] = useState(false)

    const newTabAnimation = useRef(new Animated.Value(-150)).current


    const handleTabAnimationStart = () => {
        Animated.timing(newTabAnimation, {
            toValue: 0,
            useNativeDriver: true,
            duration: 200,
        }).start()
    }

    React.useEffect(() => {
        const loadFont = async () => {
            await Font.loadAsync({
                "inter-bold": require("../font/Inter_18pt-Bold.ttf"),
                "inter-medium": require("../font/Inter_18pt-Medium.ttf")
            })
        }
        loadFont()
    }, [])
    return (
        <View
            style={{
                height: "100%",
                justifyContent: "space-between",
                position: "relative",
            }}>
            {menu && (
                <TouchableWithoutFeedback onPress={() => setMenu(false)}>
                    <View
                        style={{
                            height: "100%",
                            width: "100%",
                            flexDirection: 'row',
                            justifyContent: "center",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            alignItems: "center",
                            zIndex: 10,
                            position: "absolute",
                            top: 0,
                            left: 0,
                        }}>
                        <View style={{
                            padding: 10,
                            backgroundColor: "white",
                            width: "80%",
                            borderRadius: 10,
                        }}>
                            <TouchableOpacity>
                                <Text style={{
                                    fontSize: 20,
                                    marginBottom: 10,
                                }}>Brauzeni yopish</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={{
                                    fontSize: 20,
                                    marginBottom: 10,
                                }}>Hozirgi sahifani yopish</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={{
                                    fontSize: 20,
                                    marginBottom: 10,
                                }}>Hamma sahifalarni yopish</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )
            }

            <ScrollView>
                <View

                    style={{
                        padding: 20,
                        backgroundColor: "#e9ecef",
                        position: "relative"
                    }}>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%",
                        }}>
                        <Text
                            style={{
                                fontSize: 20,
                                fontFamily: "inter-bold",
                                fontWeight: "400,"
                            }}>Tabs</Text>
                        <TouchableWithoutFeedback onPress={() => setMenu(!menu)}>
                            <Image source={DotsIcon} style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                            }} />
                        </TouchableWithoutFeedback>
                    </View>
                </View>

                <View
                    style={{
                        padding: 20,
                    }}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                            marginVertical: 10,
                        }}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}>
                            <Image source={Browser} style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                            }} />
                            <Text style={{
                                marginLeft: 20,
                                fontSize: 15,
                            }}>Instagram</Text>
                        </View>
                        <MaterialIcon name="close" size={25} onPress={() => {
                            console.log("Hello world on this planet")
                        }} />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                            marginVertical: 10,
                        }}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}>
                            <Image source={Browser} style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                            }} />
                            <Text style={{
                                marginLeft: 20,
                                fontSize: 15,
                            }}>Instagram</Text>
                        </View>
                        <MaterialIcon name="close" size={25} onPress={() => {
                            console.log("Hello world on this planet")
                        }} />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                            marginVertical: 10,
                        }}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}>
                            <Image source={Browser} style={{
                                width: 25,
                                height: 25,
                                objectFit: "contain",
                            }} />
                            <Text style={{
                                marginLeft: 20,
                                fontSize: 15,
                            }}>Instagram</Text>
                        </View>
                        <MaterialIcon name="close" size={25} onPress={() => {
                            console.log("Hello world on this planet")
                        }} />
                    </View>
                </View>
            </ScrollView>
            <View>
                <View
                    style={{
                        padding: 20,
                        backgroundColor: "#e9ecef"
                    }}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%",
                        }}>
                        <FontIcon name="arrow-left" size={20} color={"#000"} />
                        <FontIcon name="home" size={20} color={"#000"} />
                        <FontIcon name="arrow-right" size={20} color={"#000"} />
                        <FontIcon name="plus" size={20} color={"#000"} />
                    </View>
                </View>
            </View>
        </View >
    )
}