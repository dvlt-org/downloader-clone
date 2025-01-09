import React from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import DotsIcon from "../assets/icons/dots.png"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import CheckBox from "expo-checkbox"
import * as FileSystem from "expo-file-system"
import { GetSize } from "../functions/file.functions"


const host = `http://192.168.100.14:5000`


const Video = ({ navigation, deleteMenu, handleCheck, id, file }) => {
    console.log("Finish", navigation)
    const [check, setCheck] = React.useState(false)
    const [dotsMenu, setDotsMenu] = React.useState(false)
    const [fileSize, setFileSize] = React.useState(0)

    const directory = FileSystem.documentDirectory

    const videoDirectory = directory + file.name + ".mp4"
    console.log("videoDirectory:", videoDirectory)


    const size = GetSize(videoDirectory)
    size.then((sizeOfFile) => setFileSize((sizeOfFile.size / (1024 * 1024))))

    return (
        <View style={{
            flexDirection: "row",
            marginVertical: 10,
        }}>
            <TouchableOpacity
                onPress={() => navigation.navigate("VideoPlayer", {
                    videoUri: videoDirectory
                })}>
                <Image source={{
                    uri: host + `/${file.image}`
                }} width={100} height={100} style={{
                    objectFit: "cover",
                    borderRadius: 10,
                }} />
            </TouchableOpacity>
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
                        >{file.name}.mp4</Text>
                        {!deleteMenu ? (
                            <TouchableOpacity onPress={() => {
                                setDotsMenu(true)
                                navigation.navigate("VideoInfo", {
                                    file
                                })
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
                        <MaterialIcons name="movie" size={20} color={"gray"} />
                        <Text style={{
                            marginLeft: 10,
                            color: 'gray',
                            fontWeight: "bold"
                        }}>{fileSize.toFixed(2)} M/B</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Video