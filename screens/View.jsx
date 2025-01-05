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
import { WebView } from "react-native-webview"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { saveFiles } from "../functions/view.functions"
import ReloadIcon from "../assets/icons/reload.png"
import DotsIcon from "../assets/icons/dots.png"
import React, { useEffect, useRef, useState } from 'react'
import HomeMenu from "../components/HomeMenu"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"


import { SafeAreaView } from "react-native-safe-area-context"


const host = `http://192.168.100.14:5000`

const injectJs = `
       setInterval(() => {
         const video = document.querySelector("video")
        if(video) {
            window.ReactNativeWebView.postMessage(video.paused ? "paused" : "playing");
        }else {
            window.ReactNativeWebView.postMessage('no-video');
        }
        }, 1000)
        true;
`


const { width } = Dimensions.get("window")

const HomeView = (props) => {
    const [downloadLoading, setDownloadLoading] = useState(false)
    const [downloadProgress, setDownloadProgress] = useState(0)
    const [downloadVideo, setDownloadVideo] = useState(null)
    const [downloadUrl, setDownloadUrl] = useState("")
    const [video, setVideo] = useState(false)
    const [menu, setMenu] = useState(false)
    const [title, setTitle] = useState("")

    const navigation = props.navigation
    const route = props.route

    const viewRef = useRef(null)
    const dispatch = useDispatch()
    const querys = useSelector(store => store.user.querys)
    const userId = useSelector(store => store.user.userId)

    const handleDownloader = async () => {
        setDownloadLoading(true)
        if (video) {
            try {
                const res = await axios.post(`${host}/api/file`, {
                    name: Date.now(),
                    url: downloadUrl,
                    user_id: userId
                })
                if (res.data) setDownloadLoading(false)
                console.log(res.data, "File yaratildi... !")
                saveFiles(res.data, setDownloadProgress, setDownloadLoading, setDownloadVideo, dispatch)
            } catch (error) {
                console.log(error, "file yaratilmadi !")
            }
        } else {
            console.log("Bu sahifada video mavjud emas !")
        }
    }

    return (
        <SafeAreaView>
            <TouchableWithoutFeedback
                onPress={() => setMenu(false)}>
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
                            width: width / 1.1,
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
                                navigation.goBack()
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
                                borderRadius: 20,
                                paddingRight: 20,
                                width: "60%",
                                justifyContent: "space-between",
                            }}
                        >
                            <TextInput
                                numberOfLines={1}
                                value={route.params.url}
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
                        <TouchableOpacity onPress={() => {
                            setMenu(!menu)
                        }}>
                            <Image source={DotsIcon} style={{
                                height: 40,
                                width: 30,
                                objectFit: "contain",
                            }} />
                        </TouchableOpacity>
                        {
                            menu && (
                                <View style={{
                                    position: "absolute",
                                    top: 10,
                                    right: 20,
                                    width: "70%",
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
                        width,
                        height: Dimensions.get("window").height - Dimensions.get("window").height / 6,
                        marginVertical: 20,
                        position: "relative"
                    }}>
                        <WebView source={{
                            uri: route.params.url
                        }}
                            ref={viewRef}
                            injectedJavaScript={injectJs}
                            onMessage={(event) => {
                                const message = event.nativeEvent.data
                                if (message !== "paused" && message !== "no-video") {
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
                        {
                            video
                            &&
                            <TouchableOpacity
                                onPress={handleDownloader}
                                activeOpacity={1}
                                disabled={!downloadLoading}>
                                <View
                                    style={{
                                        width: 50,
                                        height: 50,
                                        justifyContent: "center",
                                        position: "absolute",
                                        right: 70,
                                        bottom: 200,
                                        backgroundColor: "purple",
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
                        }
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default HomeView;