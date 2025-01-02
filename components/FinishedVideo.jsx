import React from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import DotsIcon from "../assets/icons/dots.png"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import CheckBox from "expo-checkbox"


const Video = ({ navigation, deleteMenu, handleCheck, id }) => {
    console.log("Finish", navigation)
    const [paused, setPaused] = React.useState(false)
    const [check, setCheck] = React.useState(false)
    const [dotsMenu, setDotsMenu] = React.useState(false)

    return (
        <View style={{
            flexDirection: "row",
            marginVertical: 10,
        }}>
            <Image source={{
                uri: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_67661aa03f13fa34f1aec4bf_67661aa03f13fa34f1aec4c0/smart_crop_516x290"
            }} width={100} height={100} style={{
                objectFit: "cover",
                borderRadius: 10,
            }} />
            <View>
                <View
                    style={{
                        padding: 10,
                    }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: "space-between",
                        width: "85%",
                    }}>
                        <Text
                            style={{
                                width: "80%",
                                height: "100%"
                            }}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >name of vidoe.mp4</Text>
                        {!deleteMenu ? (
                            <TouchableOpacity onPress={() => {
                                setDotsMenu(true)
                                navigation.navigate("VideoInfo")
                            }}>
                                <Image source={DotsIcon} style={{
                                    width: 20,
                                    height: 20,
                                    objectFit: "contain"
                                }} />
                            </TouchableOpacity>
                        ) : (
                            <CheckBox value={check} onValueChange={() => {
                                setCheck(!check)
                                handleCheck(id, check)
                            }}
                                color={check ? "#0dce80" : "gray"}
                            />
                        )}
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: "center",
                        marginTop: 10
                    }}>
                        <MaterialIcons name="movie" size={20} color={"lightgray"} />
                        <Text style={{
                            marginLeft: 10,
                            color: 'lightgray'
                        }}>40/mb</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Video