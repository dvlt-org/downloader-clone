// icons
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import DotsIcon from "../assets/icons/dots.png"

// import from react native
import {
    View, Text, TextInput,
    ScrollView, Dimensions,
    Image, TouchableWithoutFeedback,
    TouchableOpacity,
} from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { useEffect, useRef, useState } from "react"
const { width } = Dimensions.get("window")

// components
import HomeMenu from "../components/HomeMenu.jsx"
import { dataOfSites } from "../constants/downloadingSites.js"


// aysnc storage
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useDispatch, useSelector } from "react-redux"

// funksiyalar
import generateId from "../functions/generateId.js"
import { addQuerys, login, queryChanging } from "../state/userSlice.js"
import { createQuery } from "../functions/home.functions.js"
import axios from "axios"


// file system

const host = `http://192.168.100.14:5000`

export default function Home({ navigation }) {
    const [inputError, setInputError] = useState("")
    const [userId, setUserId] = useState('')
    const [menu, setMenu] = useState(false)
    const [title, setTitle] = useState("")
    // useRef
    const triggerCreateQuery = useRef(false)
    const textInputRef = useRef(null)


    // state values
    const dispatch = useDispatch()
    const querysChanging = useSelector(store => store.user.queryChanging)
    useEffect(() => {
        const getUserId = async () => {
            const newId = await AsyncStorage.getItem("user_id")
            if (newId) {
                setUserId(newId)
                const res = await axios.get(`${host}/api/query/${newId}`)
                dispatch(login(newId))
                dispatch(addQuerys(res.data))
            }
            else {
                const newGeneratedId = generateId()
                dispatch(login(newGeneratedId))
            }
        }
        getUserId()
    }, [handleSearch, title, querysChanging, triggerCreateQuery])

    console.log("userId:", userId)


    const querys = useSelector(state => state.user.querys)

    // update title
    useEffect(() => {
        if (title && triggerCreateQuery.current) {
            createQuery(userId, title)
        }
    }, [triggerCreateQuery, title])


    const handleSearch = async () => {
        const googleUrl = `https://www.google.com/search?q=${title}&oq=${title}&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDwyDggDEEUYJxg7GIAEGIoFMhAIBBBFGBMYJxg7GIAEGIoFMgYIBRBFGDwyBggGEEUYPDIGCAcQRRg80gEINDg0MmowajeoAgCwAgA&sourceid=chrome&ie=UTF-8`
        if (!title) {
            setInputError("Iltimos video urlini kiriting yoki pastdagi hohlagan siteni bosing !")
        }
        else if (title.length <= 10) {
            setTitle(googleUrl)
            createQuery(userId, title)
            dispatch(queryChanging(!queryChanging))
            triggerCreateQuery.current = true
            navigation.navigate("View", {
                url: title,
            })
        } else {
            createQuery(userId, title)
            dispatch(queryChanging(!queryChanging))
            triggerCreateQuery.current = true
            navigation.navigate("View", {
                url: title
            })
        }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <TouchableWithoutFeedback onPress={() => {
                    setMenu(false)
                    setInputError(false)
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
                                <TouchableOpacity onPress={() => {
                                    setMenu(!menu)
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
                            <View>
                                <Text style={{
                                    color: "red",
                                    marginTop: 5,
                                }}>
                                    {inputError && inputError}
                                </Text>
                            </View>
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
                                    ref={textInputRef}
                                    placeholder="Linkni kiriting !"
                                    numberOfLines={1}
                                    onChangeText={(text) => {
                                        setTitle(text)
                                        triggerCreateQuery.current = false
                                    }}
                                    onSubmitEditing={handleSearch}
                                    style={{
                                        fontWeight: "bold",
                                        width: "90%",
                                        height: 50,
                                    }} />
                                <TouchableOpacity
                                    onPress={handleSearch}>
                                    <MaterialIcons
                                        name="search"
                                        size={30}
                                        color={"black"}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
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
                                        triggerCreateQuery.current = true
                                        dispatch(queryChanging(!querysChanging))
                                        navigation.navigate("View", {
                                            url: item.url
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
                        <View>
                            <Text style={{
                                color: "gray",
                                fontSize: 13,
                                marginBottom: 10,
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
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
