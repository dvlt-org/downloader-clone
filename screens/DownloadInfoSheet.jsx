import { View, Text, Image, TouchableOpacity } from "react-native";
import { useContext, useState } from "react";
import { host } from "../constants/requests";
import { saveFiles } from "../functions/view.functions"
import axios from "axios"

import MaterialIcons from "react-native-vector-icons/MaterialIcons"

import ClosePng from "../assets/icons/close.png"
import DownloadPng from "../assets/icons/download.png"
import { downloadContext } from "../context/downloadContext";


export default function DownloadInfoSheet(props) {
    const [formatActive, setFormatActive] = useState(1)
    const { state, dispatch } = useContext(downloadContext)

    const { querysChanging } = state

    const file = props.route.params.file

    const handleClose = async () => {
        props.navigation.goBack()
        try {
            const res = await axios.delete(`${host}/api/file/${file._id}`)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const downloadVideo = () => {
        saveFiles(file, dispatch, querysChanging, formatActive)
        props.navigation.goBack()
    }


    return (
        <View
            style={{
                padding: 20,
                height: "100%",
                width: "100%"
            }}>
            <View style={{
                flexDirection: "row",
                height: 100,
                width: "100%"
            }}>
                <View>
                    <Image source={{ uri: host + `/${file?.image}` }} style={{
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                        borderRadius: 10,
                    }} />
                </View>
                <View style={{
                    marginLeft: 10,
                }}>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: "500",
                    }}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >{file.name}.mp4</Text>
                    <MaterialIcons name="movie" size={25} color={"gray"}
                        style={{
                            marginTop: 20,
                        }} />
                </View>
            </View>
            <View
                style={{
                    marginTop: 10,
                    flexDirection: "row",
                }}>
                {
                    Object.keys(file?.downloadUrl).map((format, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setFormatActive(index)}
                        >
                            <View
                                style={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: 10,
                                    borderWidth: formatActive == index ? 5 : 3,
                                    borderStyle: "solid",
                                    borderColor: "#0ac8f3",
                                    justifyContent: "center",
                                    marginLeft: 20,
                                }}>
                                <Text
                                    style={{
                                        textAlign: "center",
                                        fontWeight: "bold",
                                        fontSize: 12,
                                    }}>{format}p</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 30,
                    marginHorizontal: "auto",
                }}
            >
                <TouchableOpacity style={{
                    justifyContent: "center",
                    alignItems: "center"
                }}
                    onPress={handleClose}
                >
                    <Image source={ClosePng} style={{
                        width: 30,
                        height: 30,
                        objectFit: "cover",
                    }} />
                    <Text style={{
                        textAlign: "center", fontWeight: "bold",
                        marginTop: 5,
                    }}>Yopish</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 50,
                }}
                    onPress={downloadVideo}
                >
                    <Image source={DownloadPng} style={{
                        width: 30,
                        height: 30,
                        objectFit: "cover",
                    }} />
                    <Text style={{
                        textAlign: "center", fontWeight: "bold",
                        marginTop: 5,
                    }}>Yuklab olish</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}