import { View, Text, TouchableOpacity } from "react-native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import RenameIcon from "../assets/icons/rename.png"
import BrowserIcon from "../assets/icons/browser.png"
import { Image } from "react-native"
import * as FileSystem from "expo-file-system"

import { DeleteFromDirectory } from "../functions/file.functions"
import axios from "axios"
import { host } from "../constants/requests"

import { useSelector, useDispatch } from "react-redux"
import { queryChanging } from "../state/userSlice"

export default function VidoeInfoSheet(props) {
    const dispatch = useDispatch()
    const queryChangingValue = useSelector(store => store.user.queryChanging)
    const directory = FileSystem.documentDirectory
    const route = props.route
    const navigation = props.navigation

    const handleDelete = async () => {
        const res = await axios.delete(host + "/api/file/" + route.params.file._id)
        console.log("video-info:", res.data)
        DeleteFromDirectory(directory + route.params.file.name + ".mp4")
            .then(() => {
                console.log("Directorydan o'chirib tashlandi...")
            })
            .catch((err) => {
                console.log("directorydan o'chirib tashlanmadi:", err)
            })
        dispatch(queryChanging(!queryChangingValue))
        console.log("query changed:", queryChangingValue)
        navigation.goBack()
    }

    return (
        <View style={{
            padding: 30,
        }}>
            <Text style={{
                fontSize: 30,
            }}>{route.params.file.name}.mp4</Text>
            <View style={{
                height: 1,
                width: "100%",
                backgroundColor: "lightgray",
                marginVertical: 10
            }}>

            </View>
            <View>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    marginBottom: 20,
                    alignItems: "center"
                }}>
                    <MaterialIcons name="folder" size={30} />
                    <Text style={{
                        fontSize: 16,
                        marginLeft: 10,
                        fontWeight: "500",

                    }}>Yashirin faylga qo'shish</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    marginBottom: 20,
                    alignItems: "center"
                }}>
                    <MaterialIcons name="share" size={30} />
                    <Text style={{
                        fontSize: 16,
                        marginLeft: 10,
                        fontWeight: "500",

                    }}>Ulashish</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    marginBottom: 20,
                    alignItems: "center"
                }}>
                    <Image source={RenameIcon} style={{
                        width: 30,
                        height: 30,
                    }} />
                    <Text style={{
                        fontSize: 16,
                        marginLeft: 10,
                        fontWeight: "500",

                    }}>Nomini o'zgartirish</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    marginBottom: 20,
                    alignItems: "center"
                }}>
                    <Image source={BrowserIcon} style={{
                        width: 30,
                        height: 30,
                    }} />
                    <Text style={{
                        fontSize: 16,
                        marginLeft: 10,
                        fontWeight: "500",

                    }}>Browserdan ochish</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    marginBottom: 20,
                    alignItems: "center"
                }}
                    onPress={handleDelete}
                >
                    <MaterialIcons name="delete" size={30} />
                    <Text style={{
                        fontSize: 16,
                        marginLeft: 10,
                        fontWeight: "500",

                    }}>O'chirish</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}