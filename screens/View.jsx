import {
    View,
    Text,
    TouchableWithoutFeedback,
    TextInput,
    TouchableOpacity,
    Dimensions,
    Image,
    ActivityIndicator
} from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withSpring } from "react-native-reanimated"
import React, { useContext, useEffect, useRef, useState } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { SafeAreaView } from "react-native-safe-area-context"
import { downloadContext } from "../context/downloadContext"
import ReloadIcon from "../assets/icons/reload.png"
import SearchItems from "../components/SearchItems"
import DotsIcon from "../assets/icons/dots.png"
import { WebView } from "react-native-webview"
import HomeMenu from "../components/HomeMenu"
import { host } from "../constants/requests"
import axios from "axios"




const injectJs = `
       setInterval(() => {
        const video = document.querySelector("video")
        if(video) {
            window.ReactNativeWebView.postMessage(video ? true : false);
        }else {
            window.ReactNativeWebView.postMessage('no-video');
        }
        }, 1000)
        true;
`


const WIDTH = Dimensions.get("window").width

const HomeView = (props) => {
    const [downloadLoading, setDownloadLoading] = useState(false)
    const [isDesktopMode, setIsDesktopMode] = useState(false)
    const [searchMenu, setSearchMenu] = useState(false)
    const [downloadUrl, setDownloadUrl] = useState("")
    const [video, setVideo] = useState(false)
    const [userId, setUserId] = useState("")
    const [querys, setQuerys] = useState([])
    const [menu, setMenu] = useState(false)
    const [title, setTitle] = useState("")

    const navigation = props.navigation
    const route = props.route

    const { state, dispatch } = useContext(downloadContext)


    const viewRef = useRef(null)
    useEffect(() => {
        setTitle(route.params.url)
        const getQuerys = async () => {
            const newId = await AsyncStorage.getItem("user_id")
            console.log("newId: ", newId)
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
        getQuerys()
    }, [])

    useEffect(() => {
        if (!menu) {
            opacity.value = 0;
            transform.value = -150
        }
    }, [menu])


    // animation 
    const transform = useSharedValue(-150)
    const opacity = useSharedValue(0)

    const menuReanimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{
                translateY: transform.value,
            }]
        }
    }, [])



    const handleDownloader = async () => {
        setDownloadLoading(true)
        try {
            const res = await axios.post(`${host}/api/file`, {
                name: Date.now(),
                url: downloadUrl,
                user_id: userId,
            })
            if (res.data) {
                console.log("file yaratildi...", res.data)
                setDownloadLoading(false)
                navigation.navigate("DownloadInfo", {
                    file: res.data
                })
            } else {
                console.log("file no'to'g'ri: ", res.data)
                setDownloadLoading(false)
            }
        } catch (error) {
            console.log(error, "file yaratilmadi !")
            setDownloadLoading(false)
        }
    }

    const handleSearch = () => {
        setSearchMenu(true)
    }

    return (
        <SafeAreaView>
            <TouchableWithoutFeedback
                onPress={() => {
                    setMenu(false)
                    setSearchMenu(false)
                }}>
                <View
                    style={{
                        position: "relative",
                        paddingVertical: 10,
                    }}
                >
                    <View
                        style={{
                            paddingLeft: 20,
                            paddingTop: 5,
                            flexDirection: "row",
                            width: WIDTH / 1.1,
                            justifyContent: "space-between"
                        }}>
                        <TouchableOpacity
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
                                        color: "black"
                                    }}
                                >{querys.length}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setTitle("")
                                console.log(navigation, "view navigation")
                                navigation.navigate("Stack")
                            }}
                        >
                            <MaterialIcons
                                name="home"
                                size={30}
                                color={"black"}
                            />
                        </TouchableOpacity>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                backgroundColor: "lightblue",
                                borderRadius: 15,
                                paddingRight: 20,
                                width: "60%",
                                justifyContent: "space-between",
                                paddingHorizontal: 2,
                            }}
                        >
                            <TextInput
                                numberOfLines={1}
                                value={title}
                                onChangeText={(text) => setTitle(text)}
                                placeholderTextColor={"gray"}
                                style={{
                                    color: "gray",
                                    overflow: "hidden",
                                }}
                                onPress={handleSearch}
                            />
                            <TouchableOpacity onPress={() => {
                                viewRef.current.reload()
                            }}>
                                <Image source={ReloadIcon} style={[
                                    {
                                        width: 20,
                                        height: 20,
                                        objectFit: 'contain'
                                    },
                                    menuReanimatedStyle
                                ]} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => {
                            setMenu(!menu)
                            opacity.value = withTiming(1, { duration: 100 })
                            transform.value = withSpring(0, { duration: 500 })
                        }}>
                            <Image source={DotsIcon} style={{
                                height: 40,
                                width: 30,
                                objectFit: "contain",
                            }} />
                        </TouchableOpacity>
                        {
                            menu && (
                                <Animated.View style={[
                                    {
                                        position: "absolute",
                                        top: 60,
                                        right: 0,
                                        width: "70%",
                                        padding: 10,
                                        backgroundColor: "#e5e5e5",
                                        zIndex: 11,
                                        borderRadius: 10,
                                        shadowOffset: {
                                            width: 0,
                                            height: 4,
                                        },
                                        shadowOpacity: 0.32,
                                        shadowRadius: 5.46,

                                        elevation: 9,
                                    },
                                    menuReanimatedStyle
                                ]}>
                                    <HomeMenu
                                        userId={userId}
                                        title={title}
                                        navigation={navigation}
                                        desktopMode={isDesktopMode}
                                        setIsDesktopMode={setIsDesktopMode}
                                    />
                                </Animated.View>
                            )
                        }
                    </View>
                    <View>
                        {
                            searchMenu && (
                                <SearchItems searched title={title} navigation={navigation} searchMenu={searchMenu} />
                            )
                        }
                    </View>
                    <View style={{
                        width: WIDTH,
                        height: Dimensions.get("window").height - Dimensions.get("window").height / 6,
                        marginVertical: 20,
                        position: "relative",
                        opacity: searchMenu ? 0 : 1
                    }}>
                        <WebView source={{
                            uri: title
                        }}
                            userAgent={isDesktopMode ? "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36" : undefined}
                            ref={viewRef}
                            injectedJavaScript={injectJs}
                            onMessage={(event) => {
                                const message = event.nativeEvent.data
                                if (message !== "no-video") {
                                    setVideo(true)
                                } else {
                                    setVideo(false)
                                }
                            }}
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
                            onNavigationStateChange={(e) => setDownloadUrl(e.url)}
                        />
                        <TouchableOpacity
                            onPress={handleDownloader}
                            activeOpacity={1}
                            disabled={downloadLoading && video}>
                            <View
                                style={{
                                    width: 70,
                                    height: 70,
                                    justifyContent: "center",
                                    position: "absolute",
                                    right: 70,
                                    bottom: 200,
                                    backgroundColor: video ? "purple" : "#ce5fa7",
                                    borderRadius: "50%",
                                }}
                            >
                                {
                                    downloadLoading
                                        ? <ActivityIndicator size={"small"} color={"white"} />
                                        : <MaterialIcons name="download" size={18} color={"white"}
                                            style={{
                                                textAlign: "center",
                                            }} />
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default HomeView;