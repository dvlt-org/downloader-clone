import {
    View,
    Text,
    TouchableWithoutFeedback,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator
} from "react-native"
import React, { useContext, useEffect, useState } from "react"
import FontIcon from "react-native-vector-icons/FontAwesome"
import { downloadContext } from "../context/downloadContext"
import DotsIcon from "../assets/icons/dots.png"
import * as Font from "expo-font"


// querys
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createQuery } from "../functions/home.functions"
import { host } from "../constants/requests"
import DrawerElement from "./DrawerElement"
import axios from "axios"


export default function DrawerContent(navigation) {
    const [currentQueryIndex, setCurrentQueryIndex] = useState(0)
    const [indexChanging, setIndexChanging] = useState(true)
    const [menuLoading, setMenuLoading] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const [siteName, setSiteName] = useState("")
    const [userId, setUserId] = useState("")
    const [querys, setQuerys] = useState([])
    const [menu, setMenu] = useState(false)

    const { state, dispatch } = useContext(downloadContext)
    const { activeQuery, querysChanging } = state


    // load fonts
    useEffect(() => {
        const loadFont = async () => {
            await Font.loadAsync({
                "inter-bold": require("../font/inter/Inter_18pt-Bold.ttf"),
                "inter-medium": require("../font/inter/Inter_18pt-Medium.ttf")
            });
        };
        loadFont();
    }, [])


    useEffect(() => {
        const getUserId = async () => {
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
        getUserId()
    }, [querysChanging])


    useEffect(() => {
        if (querys.length === 0) {
            createQuery(userId, "Home-Page")
            dispatch({
                type: "querysChanging",
                payload: !querysChanging
            })
        }
        if (Array.isArray(activeQuery.history) && ((activeQuery.history.length > 0) & indexChanging)) {
            setCurrentQueryIndex(activeQuery.history.length - 1)
            getName()
        }
        if (activeIndex) {
            dispatch({
                type: "activeQueryUpdate",
                payload: querys[activeIndex]
            })
        }
    }, [querys, activeIndex])


    const handleQueryDelete = async (queryId) => {
        try {
            const res = await axios.delete(`${host}/api/query/${queryId}`)
            console.log(res.data)
            setActiveIndex(0)

            dispatch({
                type: "querysChanging",
                payload: !querysChanging
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteAll = async () => {
        try {
            for (let query of querys) {
                setMenuLoading(true)
                const res = await axios.delete(`${host}/api/query/${query._id}`)
                if (res) setMenuLoading(false)
                console.log(res.data)
            }

            dispatch({
                type: "querysChanging",
                payload: !querysChanging
            })
            setMenu(false)
        } catch (error) {
            console.log(error)
        }
    }
    const handlePrevious = () => {
        setIndexChanging(false)
        setCurrentQueryIndex(prev => {
            if (prev > 0) {
                return prev = prev - 1
            } else {
                return prev = 0
            }
        })
    }

    const handleNext = () => {
        if (Array.isArray(activeQuery.history) && (currentQueryIndex !== activeQuery.history.length)) {
            setIndexChanging(false)
            setCurrentQueryIndex(prev => prev = prev + 1)
        }
    }

    const handleNew = () => {
        try {
            createQuery(userId, "Home-Page")

            dispatch({
                type: "querysChanging",
                payload: !querysChanging
            })

        } catch (error) {
            console.log(error)
        }
    }

    const getName = () => {
        if (currentQueryIndex >= 0) {
            if (Array.isArray(activeQuery.history) && (currentQueryIndex > activeQuery.history.length - 1)) {
                // return activeQuery?.name.toString()
                setSiteName(activeQuery?.name.toString())
            } else if (Array.isArray(activeQuery.history) && (currentQueryIndex < activeQuery.history.length)) {
                // return Array.isArray(activeQuery.history) && activeQuery?.history[currentQueryIndex].query.name.toString()
                setSiteName(Array.isArray(activeQuery.history) && activeQuery?.history[currentQueryIndex].query.name.toString())
            } else if (Array.isArray(activeQuery.history) && !activeQuery.history[0]) {
                // return activeQuery?.name.toString()
                setSiteName(activeQuery?.name.toString())
            }
        }
    }

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
                            <TouchableOpacity
                                onPress={handleDeleteAll}
                            >
                                {!menuLoading ? <Text style={{
                                    fontSize: 14,
                                    marginVertical: 10,
                                    flexDirection: "row",
                                }}>
                                    Hamma sahifalarni yopish
                                </Text> : (
                                    <ActivityIndicator style={{
                                        marginLeft: 10,
                                    }} size={"small"} color={"black"} />
                                )
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )
            }
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
            <FlatList
                data={querys}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index }) => (
                    <DrawerElement
                        query={item}
                        handleQueryDelete={handleQueryDelete}
                        activeIndex={activeIndex}
                        index={index}
                        setActiveIndex={setActiveIndex}
                        siteName={siteName}
                    />
                )}
            />
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
                        <FontIcon name="arrow-left" size={25} color={"#000"}
                            onPress={handlePrevious}
                        />
                        <FontIcon name="home" size={25} color={"#000"} onPress={() => {
                            navigation.navigation.closeDrawer()
                        }} />
                        <FontIcon name="arrow-right" size={25} color={"#000"}
                            onPress={handleNext}
                        />
                        <FontIcon name="plus" onPress={handleNew} size={25} color={"#000"} />
                    </View>
                </View>
            </View>
        </View >
    )
}