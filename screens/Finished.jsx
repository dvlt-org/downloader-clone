import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FinishedVideo from "../components/FinishedVideo.jsx"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import FontIcon from "react-native-vector-icons/FontAwesome"

import DotsMenuIcon from "../assets/icons/dots.png"
import FolderLock from "../assets/icons/folderLock.png"
import { useEffect, useState } from 'react'
import axios from 'axios'

import { useSelector, useDispatch } from 'react-redux'
import { queryChanging } from "../state/userSlice.js"
import { DeleteFromDirectory } from "../functions/file.functions.js"
import * as FileSystem from "expo-file-system"

// constants
import { host } from '../constants/requests.js'

export default function Finished({ navigation }) {
    const [deleteItem, setDeleteItem] = useState(false)
    const [selected, setSelected] = useState([])
    const [files, setFiles] = useState([])

    const dispatch = useDispatch()

    const userId = useSelector(store => store.user.userId)
    const queryChangingValue = useSelector(store => store.user.queryChangingValue)
    console.log('%cUserId', userId, 'color: red;');
    console.log('%cQuery changing', queryChangingValue, 'color: red;');

    useEffect(() => {
        const getFiles = async () => {
            try {
                const files = await axios.get(host + "/api/file/" + userId)
                setFiles(files.data.reverse())
            } catch (error) {
                console.log("Files error:", error)
            }
        }
        getFiles()
    }, [queryChangingValue])

    const handleCheck = (check_id, check) => {
        if (!check) {
            setSelected(prev => ([...prev, check_id]))
        } else if (selected.includes(check_id)) {
            setSelected(prev => prev.filter(item => item !== check_id))
        }
    }

    const handleDelete = async () => {
        if (!selected) return 0;
        try {
            for (let oneSelected of selected) {
                const oneSelectedFile = files.filter(file => file._id === oneSelected)
                console.log("oneSelectedFile:", oneSelectedFile[0].name)
                const res = await axios.delete(host + "/api/file/" + oneSelected)
                DeleteFromDirectory(FileSystem.documentDirectory + oneSelectedFile[0].name + ".mp4")
                console.log("we are venom:", FileSystem.documentDirectory + oneSelectedFile.name + ".mp4")
            }
            dispatch(queryChanging(!queryChangingValue))
        } catch (error) {
            console.log("delete error:", error)
        }
    }

    console.log(files)

    return (
        <View>
            <SafeAreaView >
                <View style={{
                    marginHorizontal: 10,
                }}>
                    <View style={{
                        padding: 10,
                        backgroundColor: "#afe2ec",
                        marginVertical: 3,
                        borderRadius: 10,
                        flexDirection: 'row',
                        justifyContent: "space-between",
                    }}>
                        {deleteItem && <FontIcon onPress={() => {
                            setDeleteItem(false)
                            setSelected([])
                        }} name='arrow-left' size={30} />}
                        <Text
                            style={{
                                fontFamily: "inter-medium",
                                fontSize: 20,
                            }}>
                            {
                                deleteItem ? `${selected.length} video tanlandi` : "YUKLAB BO'LINDI"
                            }
                        </Text>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("FolderLock")}>
                                <Image source={FolderLock} style={{
                                    width: 30,
                                    height: 30,
                                    objectFit: "contain",
                                }} />
                            </TouchableOpacity>

                            {
                                !deleteItem ?
                                    <TouchableOpacity
                                        onPress={() => setDeleteItem(!deleteItem)}>
                                        <Image source={DotsMenuIcon} style={{
                                            width: 30,
                                            height: 30,
                                            marginLeft: 10,
                                        }} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        onPress={handleDelete}>
                                        <MaterialIcon name='delete' size={30} style={{
                                            marginLeft: 10,
                                        }} />
                                    </TouchableOpacity>
                            }
                        </View>
                    </View>
                </View>
                <ScrollView style={{
                    marginHorizontal: 10,
                }}>
                    {
                        files.length > 1
                            ?
                            files?.map(file => (
                                <FinishedVideo navigation={navigation} deleteMenu={deleteItem} handleCheck={handleCheck} file={file} key={file._id} id={file._id} />
                            ))
                            :
                            <View>
                                <Text style={{
                                    textAlign: "center",
                                    marginTop: 30,
                                    fontSize: 16,
                                    fontWeight: "500"
                                }}>Hozircha sizda yuklangan videolar yo'q.</Text>
                            </View>
                    }
                </ScrollView>
            </SafeAreaView>
        </View >
    )
}
