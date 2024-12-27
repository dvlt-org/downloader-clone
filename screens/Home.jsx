// icons
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import ReloadIcon from "../assets/icons/reload.png"
import DotsIcon from "../assets/icons/dots.png"

// import from react native
import { View, Text, TextInput, ScrollView, Dimensions, Image, TouchableWithoutFeedback, TouchableOpacity, ActivityIndicator } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { WebView } from "react-native-webview"
import { useRef, useState } from "react"

// components
import HomeMenu from "../components/HomeMenu.jsx"
import { dataOfSites } from "../constants/downloadingSites.js"


// Constants
import { namesOfDownloadingSites } from "../constants/downloadingSites.js"


const { width } = Dimensions.get("window")


export default function Home({ navigation }) {
    const [view, setView] = useState(false)
    const [title, setTitle] = useState("")
    const [menu, setMenu] = useState(false)
    const handleHome = () => {
        setView(false)
    }

    const viewRef = useRef(null)
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <TouchableWithoutFeedback onPress={() => setMenu(false)}>
                    {
                        !view ? (
                            <View style={{
                                marginHorizontal: 20,
                            }}>

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: "space-between",
                                        marginTop: 10,
                                    }}>
                                    <TouchableWithoutFeedback
                                        onPress={() => navigation.openDrawer()}>
                                        <View
                                            style={{
                                                width: 30,
                                                height: 30,
                                                flexDirection: "row",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                borderWidth: 2,
                                                borderColor: "gray",
                                            }}>
                                            <Text
                                                style={{
                                                    fontSize: 20,
                                                }}
                                            >4</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            position: "relative"
                                        }}>
                                        <MaterialIcons name="question-mark" size={25} style={{
                                            marginLeft: 10
                                        }} />
                                        <MaterialIcons
                                            name="settings"
                                            size={25}
                                            style={{
                                                marginLeft: 10
                                            }}
                                            onPress={() => navigation.navigate("Settings")} />
                                        <TouchableOpacity onPress={() => setMenu(!menu)}>
                                            <Image source={DotsIcon} style={{
                                                width: 25,
                                                height: 25,
                                                objectFit: "contain",
                                            }} />
                                        </TouchableOpacity>
                                        {
                                            menu && (
                                                <View style={{
                                                    position: "absolute",
                                                    top: 10,
                                                    right: 20,
                                                    width: "200%",
                                                    padding: 10,
                                                    backgroundColor: "#e5e5e5",
                                                    zIndex: 11,
                                                    borderRadius: 10,
                                                }}>
                                                    <HomeMenu />
                                                </View>
                                            )
                                        }
                                    </View>
                                </View>
                                <View
                                    style={{
                                        width: "100%",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>

                                    <View
                                        style={{
                                            flexDirection: "row",
                                            width: "100%",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            marginVertical: 10,
                                            borderWidth: 1,
                                            borderColor: "#e9ecef",
                                            borderRadius: 15,
                                            padding: 5,
                                            marginTop: 30,
                                            backgroundColor: "#e9ecef",
                                        }}>
                                        <TextInput
                                            placeholder="Linkni kiriting !"
                                            numberOfLines={1}
                                            onChangeText={(text) => setTitle(text)}
                                            onSubmitEditing={() => setView(true)}
                                            style={{
                                                fontWeight: "bold",
                                                width: "90%",
                                            }} />
                                        <MaterialIcons
                                            name="search"
                                            size={25}
                                            onPress={() => setView(true)}
                                        />
                                    </View>
                                </View>
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    style={{
                                        marginVertical: 10,
                                    }}>
                                    {dataOfSites.map((item, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={{
                                                width: 80,
                                                height: 50,
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                            onPress={() => item.onPress(setTitle, setView)}
                                        >
                                            {item.iconName ? (
                                                <FontAwesomeIcons name={item.iconName} size={30} color={item.iconColor} />
                                            ) : (
                                                <Image source={item.iconImage} style={{
                                                    width: 30,
                                                    height: 30,
                                                    objectFit: "contain"
                                                }} />
                                            )}
                                            <Text>
                                                {item.title}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                                <View>
                                    <Text style={{
                                        color: "gray",
                                        fontSize: 12,
                                    }}>
                                        Yaqinda foydalanilgan sitelar !
                                    </Text>
                                    <View style={{
                                        marginTop: 10,
                                    }}>
                                        <TouchableOpacity
                                            style={{
                                                width: 80,
                                                height: 50,
                                            }}>
                                            <FontAwesomeIcons
                                                name="instagram"
                                                size={30}
                                                color={"purple"}
                                                style={{
                                                    textAlign: "center"
                                                }} />
                                            <Text
                                                style={{
                                                    textAlign: "center"
                                                }}>Instagram</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{
                                    height: "50%",
                                    justifyContent: "center",
                                    alignItems: 'center'
                                }}>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            width: "80%",
                                        }}>

                                        <TouchableWithoutFeedback>
                                            <MaterialIcons name="message" size={20} color={"#abab97"} />
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback
                                            style={{
                                                marginLeft: 10,
                                            }}>
                                            <Text
                                                style={{
                                                    color: "#abab97",
                                                    textAlign: "center",
                                                    textDecorationLine: 'underline',
                                                    fontSize: 14
                                                }}
                                                onPress={() => navigation.navigate("FeedBack", { name: "FeedBack" })}
                                            >Sizda taklif yoki savollar bormi ?
                                                <Text
                                                    style={{
                                                        color: "#79796e"
                                                    }}>
                                                    Bizga ayting</Text>
                                            </Text>
                                        </TouchableWithoutFeedback>
                                    </View>
                                </View>
                            </View>
                        ) : (
                            <TouchableWithoutFeedback
                                onPress={() => setMenu(false)}>
                                <View
                                    style={{
                                        position: "relative",
                                    }}
                                >
                                    <View
                                        style={{
                                            paddingLeft: 20,
                                            paddingTop: 5,
                                            flexDirection: "row",
                                            width: width / 1.1,
                                            justifyContent: "space-between"
                                        }}>
                                        <TouchableWithoutFeedback
                                            onPress={() => navigation.openDrawer()}>
                                            <View
                                                style={{
                                                    width: 30,
                                                    height: 30,
                                                    flexDirection: "row",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    borderWidth: 2,
                                                    borderColor: "gray",
                                                }}>
                                                <Text
                                                    style={{
                                                        fontSize: 20,
                                                    }}
                                                >4</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <MaterialIcons
                                            name="home"
                                            size={30}
                                            color={"black"}
                                            onPress={handleHome}
                                        />
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                backgroundColor: "lightblue",
                                                borderRadius: 20,
                                                paddingRight: 20,
                                                width: "60%",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <TextInput
                                                numberOfLines={1}
                                                value={title}
                                                onChangeText={(text) => setTitle(text)}
                                                placeholderTextColor={"gray"}
                                                style={{
                                                    color: "gray",
                                                    overflow: "hidden"
                                                }} />
                                            <TouchableOpacity onPress={() => viewRef.current.reload()}>
                                                <Image source={ReloadIcon} style={{
                                                    width: 20,
                                                    height: 20,
                                                    objectFit: 'contain'
                                                }} />
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableWithoutFeedback onPress={() => setMenu(!menu)}>
                                            <Image source={DotsIcon} style={{
                                                height: 40,
                                                width: 30,
                                                objectFit: "contain",
                                            }} />
                                        </TouchableWithoutFeedback>
                                        {
                                            menu && (
                                                <View style={{
                                                    position: "absolute",
                                                    top: 10,
                                                    right: 20,
                                                    width: "50%",
                                                    padding: 10,
                                                    backgroundColor: "#e5e5e5",
                                                    zIndex: 11,
                                                    borderRadius: 10,
                                                }}>
                                                    <HomeMenu />
                                                </View>
                                            )
                                        }
                                    </View>
                                    <View style={{
                                        width: "100%",
                                        height: "100%",
                                        marginVertical: 20,
                                    }}>
                                        <WebView source={{
                                            uri: title
                                        }}
                                            ref={viewRef}
                                            renderLoading={() => {
                                                return (
                                                    <ActivityIndicator
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                        }}
                                                        size={"large"} color={"black"} />
                                                )
                                            }}
                                            startInLoadingState={true}
                                            onNavigationStateChange={(e) => console.log(e)}
                                        />
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    }
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
