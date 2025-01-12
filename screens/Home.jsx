// icons
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import DotsIcon from "../assets/icons/dots.png"

// import from react native
import {
    View,
    Text,
    TextInput,
    ScrollView,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { useEffect, useRef, useState, useContext } from "react"

// components
import HomeMenu from "../components/HomeMenu.jsx"
import { dataOfSites } from "../constants/downloadingSites.js"

// aysnc storage
import AsyncStorage from "@react-native-async-storage/async-storage"

// funksiyalar
import generateId from "../functions/generateId.js"
import { createQuery, updateQuery } from "../functions/home.functions.js"
import axios from "axios"

// file system
import { host } from "../constants/requests.js"
import { hasIcon } from "../functions/drawer.functions.js"

// animation
import Animated, { useAnimatedStyle, useSharedValue, withTiming, } from "react-native-reanimated"

// components
import SearchItem from "../components/SearchItems.jsx"

// context api
import { downloadContext } from "../context/downloadContext.js"

export default function Home({ navigation }) {
    const [searchMenu, setSearchMenu] = useState(false)
    const [querys, setQuerys] = useState([])
    const [userId, setUserId] = useState("")
    const [menu, setMenu] = useState(false)
    const [title, setTitle] = useState("")

    // context api
    const { state, dispatch } = useContext(downloadContext)

    // animation
    const transform = useSharedValue(-150)
    const opacity = useSharedValue(0)
    const transformToTop = useSharedValue(0)
    const opacityOfBackground = useSharedValue(1)

    // animation

    const inputReanimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: transformToTop.value }],
        }
    }, [])

    const opacityReanimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacityOfBackground.value
        }
    }, [])

    const menuReanimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{
                translateY: transform.value,
            }]
        }
    }, [])

    // animation functions

    const handleInputAnimation = () => {
        opacityOfBackground.value = withTiming(0.3, { duration: 200 })
        transformToTop.value = withTiming(-70, { duration: 500 })
        setSearchMenu(true)
    }

    // state values
    const querysChanging = state.querysChanging
    const activeQuery = state.activeQuery


    useEffect(() => {
        const getUserId = async () => {
            const newId = await AsyncStorage.getItem("user_id")
            if (newId) {
                setUserId(newId)
                const res = await axios.get(`${host}/api/query/${newId}`)
                setQuerys(res.data)

                dispatch({
                    type: "querysChanging",
                    payload: !state.querysChanging
                })
            }
            else {
                const newGeneratedId = generateId()

                await AsyncStorage.setItem("user_id", newGeneratedId).then(() => {
                    console.log("user id changed", newGeneratedId)
                })
            }
        }
        getUserId()
    }, [querysChanging])

    useEffect(() => {
        if (!menu) {
            opacity.value = 0;
            transform.value = -150
        }
    }, [menu])


    const handleSearch = async () => {
        const googleUrl = `https://www.google.com/search?q=${title}`
        if (title.length <= 10) {
            setTitle(googleUrl)
            if (activeQuery._id) {
                console.log("queryni o'zgartilmoqda...")
                updateQuery(activeQuery, title)
            } else {
                createQuery(userId, title)
            }
            navigation.navigate("View", {
                url: googleUrl,
            })

            dispatch({
                type: "querysChanging",
                payload: !querysChanging
            })
        } else {
            if (activeQuery._id) {
                console.log("queryni o'zgartilmoqda...")
                updateQuery(activeQuery, title)
            } else {
                createQuery(userId, title)
            }
            navigation.navigate("View", {
                url: title
            })
            dispatch({
                type: "querysChanging",
                payload: !querysChanging
            })
        }
    }



    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <TouchableWithoutFeedback onPress={() => {
                    setMenu(false)
                    transformToTop.value = withTiming(0, { duration: 200 })
                    opacityOfBackground.value = withTiming(1, { duration: 200 })
                    setSearchMenu(false)
                    setTitle("")
                }}>
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
                                onPress={() => {
                                    navigation.openDrawer()
                                }}>
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
                                            color: "black"
                                        }}
                                    >{querys.length}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <View
                                style={{
                                    flexDirection: "row",
                                    position: "relative"
                                }}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("FeedbackSlider")}>
                                    <MaterialIcons name="question-mark"
                                        size={25} style={{
                                            marginLeft: 10,
                                        }} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("Settings")}
                                >
                                    <MaterialIcons
                                        name="settings"
                                        size={25}
                                        style={{
                                            marginLeft: 20
                                        }}
                                    />
                                </TouchableOpacity>
                                {
                                    menu && (
                                        <Animated.View style={[
                                            {
                                                position: "absolute",
                                                top: 50,
                                                right: 0,
                                                width: "200%",
                                                padding: 10,
                                                backgroundColor: "#efefef",
                                                zIndex: 11,
                                                borderRadius: 10,
                                                shadowColor: "#000",
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 4,
                                                },
                                                shadowOpacity: 0.32,
                                                shadowRadius: 5.46,

                                                elevation: 9,
                                            }, menuReanimatedStyle]}>
                                            <HomeMenu
                                                userId={userId}
                                                title={title}
                                                navigation={navigation}
                                                isView
                                            />
                                        </Animated.View>
                                    )
                                }
                                <TouchableOpacity onPress={() => {
                                    setMenu(!menu)
                                    transform.value = withTiming(0, { duration: 300, })
                                    opacity.value = withTiming(1, { duration: 400, })
                                }}>
                                    <Image source={DotsIcon} style={{
                                        width: 25,
                                        height: 25,
                                        objectFit: "contain",
                                        marginLeft: 10,
                                    }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View
                            style={{
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                            <Animated.View
                                style={[
                                    {
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
                                    },
                                    inputReanimatedStyle
                                ]}>
                                <TextInput
                                    placeholder="Linkni kiriting !"
                                    numberOfLines={1}
                                    onChangeText={(text) => {
                                        setTitle(text)
                                    }}
                                    onSubmitEditing={handleSearch}
                                    style={{
                                        fontWeight: "bold",
                                        width: "90%",
                                        height: 50,
                                    }}
                                    onPress={handleInputAnimation}
                                />

                                <TouchableOpacity
                                    onPress={handleSearch}>
                                    <MaterialIcons
                                        name="search"
                                        size={30}
                                        color={"black"}
                                    />
                                </TouchableOpacity>
                            </Animated.View>
                            {
                                searchMenu && (
                                    <SearchItem
                                        navigation={navigation}
                                        searchMenu={searchMenu}
                                        title={title}
                                        setSearchMenu={setSearchMenu}
                                    />
                                )
                            }
                        </View>
                        <Animated.View style={[opacityReanimatedStyle]}>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={{
                                    marginVertical: 20,
                                }}>
                                {dataOfSites.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={{
                                            width: 80,
                                            height: 80,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                        onPress={() => {
                                            setTitle(item.url)
                                            navigation.navigate("View", {
                                                url: item.url
                                            })
                                            dispatch({
                                                type: "querysChanging",
                                                payload: !querysChanging
                                            })
                                        }}
                                    >
                                        {item.iconName ? (
                                            <FontAwesomeIcons name={item.iconName} size={40} color={item.iconColor} />
                                        ) : (
                                            <Image source={item.iconImage} style={{
                                                width: 40,
                                                height: 40,
                                                objectFit: "contain"
                                            }} />
                                        )}
                                        <Text>
                                            {item.title}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </Animated.View>
                        <Animated.View style={[opacityReanimatedStyle]}>
                            <Text style={{
                                color: "gray",
                                fontSize: 13,
                                marginBottom: 10,
                            }}>
                                Yaqinda foydalanilgan sitelar !
                            </Text>
                            <ScrollView style={{
                                marginTop: 10,
                                paddingVertical: 10,
                            }}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            >
                                {
                                    querys.map(query => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (query.name !== "Home-Page") {
                                                    navigation.navigate("View", {
                                                        url: query.name
                                                    })
                                                }
                                                dispatch({
                                                    type: "querysChanging",
                                                    payload: !querysChanging
                                                })
                                            }}
                                            key={query._id}
                                            style={{
                                                width: 80,
                                                height: 50,
                                                marginRight: 10,
                                            }}>
                                            <View style={{
                                                flexDirection: "row",
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}>
                                                {hasIcon(query.name)}
                                            </View>
                                            <Text
                                                style={{
                                                    textAlign: "center"
                                                }}
                                                numberOfLines={1}
                                            >{query.name}</Text>
                                        </TouchableOpacity>
                                    ))
                                }
                            </ScrollView>
                        </Animated.View>
                        <Animated.View style={[
                            {
                                height: "50%",
                                justifyContent: "center",
                                alignItems: 'center'
                            },
                            opacityReanimatedStyle
                        ]}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    width: "80%",
                                    alignItems: 'center',
                                }}>

                                <TouchableWithoutFeedback>
                                    <MaterialIcons name="message" size={15} color={"#abab97"} style={{
                                        marginRight: 10,
                                    }} />
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
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
