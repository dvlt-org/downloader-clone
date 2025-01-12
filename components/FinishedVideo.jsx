import { View, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { GetSize } from "../functions/file.functions"
import DotsIcon from "../assets/icons/dots.png"
import * as FileSystem from "expo-file-system"
import axios from "axios"
import CheckBox from "expo-checkbox"
import React from "react"


const host = `http://192.168.100.14:5000`


const Video = ({
    navigation,
    deleteMenu,
    handleCheck,
    id,
    file,
    deleteLoading,
    selected
}) => {
    const [check, setCheck] = React.useState(false)
    const [fileSize, setFileSize] = React.useState(0)

    const directory = FileSystem.documentDirectory

    // React.useEffect(() => {
    //     const getOneFile = async () => {
    //         try {

    //             const result = await axios.get(`${host}/api/file/${file._id}`)
    //             if (result.data) setActiveFile(result.data)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     getOneFile()
    // }, [])




    const videoDirectory = directory + file.name + ".mp4"
    console.log("videoDirectory: ", videoDirectory)

    const size = GetSize(videoDirectory)
    size.then((sizeOfFile) => setFileSize((sizeOfFile.size / (1024 * 1024))))

    return (
        <View style={{
            flexDirection: "row",
            marginVertical: 10,
        }}>
            {
                (selected.includes(id) & deleteLoading)
                    ?
                    <View style={{
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 100
                    }}>
                        <ActivityIndicator size={"small"} />
                    </View>
                    :
                    (
                        <>
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
                        </>
                    )
            }
        </View>
    )
}

export default Video