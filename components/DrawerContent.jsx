import { View, Text, ScrollView, TouchableWithoutFeedback, Image, TouchableOpacity } from "react-native"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import FontIcon from "react-native-vector-icons/FontAwesome"
import React, { useEffect, useState } from "react"
import Browser from "../assets/icons/browser.png"
import DotsIcon from "../assets/icons/dots.png"
import * as Font from "expo-font"

// data
import { dataOfSites } from "../constants/downloadingSites"


// state
import { useDispatch, useSelector } from "react-redux"
import { queryChanging } from "../state/userSlice"
import { ActivityIndicator } from "react-native"


// querys
import axios from "axios"
const host = `http://192.168.100.14:5000`


export default function DrawerContent(navigation) {
    const [menu, setMenu] = useState(false)
    const [menuLoading, setMenuLoading] = useState(0)

    const dispatch = useDispatch()


    const querys = useSelector(store => store.user.querys)
    const changinItem = useSelector(store => store.user.queryChanging)

    const handleQueryDelete = async (queryId) => {
        try {
            const res = await axios.delete(`${host}/api/query/${queryId}`)
            console.log(res.data)

            dispatch(queryChanging(!changinItem))
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
            dispatch(queryChanging(!changinItem))
            setMenu(false)
        } catch (error) {
            console.log(error)
        }
    }

    const closeDrawer = async () => {
        navigation.navigation.closeDrawer()
    }

    React.useEffect(() => {
        const loadFont = async () => {
            await Font.loadAsync({
                "inter-bold": require("../font/inter/Inter_18pt-Bold.ttf"),
                "inter-medium": require("../font/inter/Inter_18pt-Medium.ttf")
            })
        }
        loadFont()
    }, [])

    const hasIcon = (url) => {
        for (const item of dataOfSites) {
            if (url.toLowerCase().includes(item.title.toLowerCase())) {
                return item.iconName ? <FontIcon name={item.iconName} size={25} color={item.iconColor} /> : <Image source={item.iconImage} style={{
                    width: 25,
                    height: 25,
                    objectFit: "contain"
                }} />
            }
        }
        return (<Image source={Browser} style={{
            width: 25,
            height: 25,
            objectFit: "contain"
        }} />);
    };

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
                                <Text style={{
                                    fontSize: 14,
                                    marginVertical: 10,
                                    flexDirection: "row",
                                }}>
                                    Hamma sahifalarni yopish
                                    {
                                        menuLoading && <ActivityIndicator style={{
                                            marginLeft: 10,
                                        }} size={"small"} color={"black"} />
                                    }
                                </Text>
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
            <ScrollView>
                <View
                    style={{
                        padding: 20,
                    }}>
                    {
                        querys.length > 0 && (
                            querys.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            width: "100%",
                                            marginVertical: 10,
                                        }}>
                                        <View>
                                            {
                                                hasIcon(item.name)
                                            }
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                            }}>
                                            <Text style={{
                                                marginLeft: 20,
                                                fontSize: 17,
                                                fontWeight: "500",
                                                width: "70%",
                                            }}
                                                ellipsizeMode="tail"
                                                numberOfLines={1}
                                            >{item.name}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => {
                                            handleQueryDelete(item._id)
                                        }}>
                                            <MaterialIcon name="close" size={25} />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                )
                            })
                        )
                    }
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
                        <FontIcon name="home" size={20} color={"#000"} onPress={closeDrawer} />
                        <FontIcon name="arrow-right" size={20} color={"#000"} />
                        <FontIcon name="plus" size={20} color={"#000"} />
                    </View>
                </View>
            </View>
        </View >
    )
}