import React, { useEffect } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { hasIcon } from "../functions/drawer.functions"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated"



export default function DrawerElement({
    handleQueryDelete,
    query,
    activeIndex,
    index,
    setActiveIndex,
    siteName
}) {
    const transform = useSharedValue(-400)

    const openReanimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: transform.value }]
        }
    }, [])

    useEffect(() => {
        transform.value = withTiming(0, { duration: 200 * index })
    }, [])

    const handleCloseAnimation = () => {
        transform.value = withTiming(-400, { duration: 500 })
    }



    return (
        <Animated.View
            style={[openReanimatedStyle]}
        >
            <TouchableOpacity
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    backgroundColor: activeIndex === index ? "#e9ecef" : "#fff",
                    height: 50,
                    paddingHorizontal: 20,
                }}
                onPress={() => {
                    setActiveIndex(index)
                }}
            >
                <View>
                    {
                        hasIcon(query.name)
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
                        width: "75%",
                        fontFamily: "inter-bold"
                    }}
                        ellipsizeMode="tail"
                        numberOfLines={1}
                    >{query.name}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    handleQueryDelete(query._id)
                    handleCloseAnimation()
                }}>
                    <MaterialIcon name="close" size={25} color={"black"} style={{
                        marginRight: 5,
                    }} />
                </TouchableOpacity>
            </TouchableOpacity>
        </Animated.View >
    )
}