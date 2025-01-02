import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'

import MaterialIcon from "react-native-vector-icons/MaterialIcons"

import * as Font from "expo-font"
import { useEffect, useState } from "react"

export default function FolderLock({ navigation }) {
    const [isLoadFont, setIsLoadFont] = useState(false)
    const [password, setPassword] = useState([])

    useEffect(() => {
        const loadFont = async () => {
            try {
                await Font.loadAsync({
                    "sans-bold": require("../font/mono-sans/NotoSansMono-Bold.ttf"),
                    "sans-medium": require("../font/mono-sans/NotoSansMono-Light.ttf")
                })
                setIsLoadFont(true)
            } catch (error) {
                setIsLoadFont(false)
                console.log("Font error", error)
            }
        }
        loadFont()
    }, [])

    const correctPassword = [1, 2, 3, 4]

    const handlePassword = (value) => {
        if (password.length < 4) {
            setPassword(prev => ([...prev, value]))
        }

        if (password.length === 3) {
            if (JSON.stringify(password.concat(value)) === JSON.stringify(correctPassword)) {
                console.log("Password is correct");
                setPassword([])
            } else {
                console.log("Incorrect password");
                setPassword([]);  // Reset the password if incorrect
            }
        }
    }

    return (
        <SafeAreaView>
            <View
                style={{
                    backgroundColor: "#ffffff",
                    height: "100%",
                    width: "100%",
                }}>
                <View
                    style={{
                        padding: 30,
                        justifyContent: 'space-between',
                        alignItems: "center",
                        height: "100%",
                    }}>
                    <View style={{
                        flexDirection: 'row',
                        width: "100%",
                    }}>
                        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                            <MaterialIcon name="arrow-back" size={30} style={{
                                width: 30,
                                height: 30,
                                backgroundColor: "#ededed",
                                borderRadius: 20,
                            }} />
                        </TouchableWithoutFeedback>
                        <Text style={{
                            fontSize: 20,
                            marginLeft: 20,
                            fontFamily: "sans-bold"
                        }}>
                            {isLoadFont ? "Yashirin papka" : "Yuklanmoqda"}
                        </Text>
                    </View>

                    <View style={{
                        marginBottom: 50,
                        justifyContent: "center",
                        alignItems: 'center',
                    }}>
                        <View>
                            <Text style={{
                                fontSize: 12,
                                fontFamily: "sans-bold",
                                marginBottom: 50,
                            }}>Parolingizni kiriting !</Text>

                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}>
                                {
                                    password.map((item, index) => (
                                        <View
                                            key={index}
                                            style={{
                                                width: 10,
                                                height: 10,
                                                backgroundColor: item ? "black" : "gray",
                                                borderRadius: "50%",
                                                marginRight: 20,
                                            }}></View>
                                    ))
                                }
                            </View>
                        </View>

                        <View style={{
                            flexDirection: "row",
                            width: "100%",
                        }}>
                            {
                                [0, 1, 2].map((num, index) => (
                                    <TouchableOpacity
                                        onPress={() => handlePassword(num)}
                                        key={index}
                                        style={{
                                            width: 70,
                                            height: 70,
                                            flexDirection: 'row',
                                            justifyContent: "center",
                                            alignItems: "center",
                                            backgroundColor: "#efefef",
                                            margin: 10,
                                            borderRadius: "50%"
                                        }}>
                                        <Text style={{
                                            fontSize: 20,
                                        }}>{num.toString()}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>

                        <View style={{
                            flexDirection: "row",
                            width: "100%",
                        }}>
                            {
                                [3, 4, 5].map((num, index) => (
                                    <TouchableOpacity
                                        onPress={() => handlePassword(num)}
                                        key={index}
                                        style={{
                                            width: 70,
                                            height: 70,
                                            flexDirection: 'row',
                                            justifyContent: "center",
                                            alignItems: "center",
                                            backgroundColor: "#efefef",
                                            margin: 10,
                                            borderRadius: "50%"
                                        }}>
                                        <Text style={{
                                            fontSize: 20,
                                        }}>{num.toString()}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>

                        <View style={{
                            flexDirection: "row",
                            width: "100%",
                        }}>
                            {
                                [6, 7, 8].map((num, index) => (
                                    <TouchableOpacity
                                        onPress={() => handlePassword(num)}
                                        key={index}
                                        style={{
                                            width: 70,
                                            height: 70,
                                            flexDirection: 'row',
                                            justifyContent: "center",
                                            alignItems: "center",
                                            backgroundColor: "#efefef",
                                            margin: 10,
                                            borderRadius: "50%"
                                        }}>
                                        <Text style={{
                                            fontSize: 20,
                                        }}>{num.toString()}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>

                        <View style={{
                            flexDirection: "row",
                            width: "100%",
                        }}>
                            <TouchableOpacity
                                onPress={() => handlePassword(9)}
                                style={{
                                    width: 70,
                                    height: 70,
                                    flexDirection: 'row',
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#efefef",
                                    margin: 10,
                                    borderRadius: "50%"
                                }}>
                                <Text style={{
                                    fontSize: 20,
                                }}>9</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView >
    )
}
