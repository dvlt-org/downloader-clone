import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FinishedVideo from "../components/FinishedVideo.jsx"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import FontIcon from "react-native-vector-icons/FontAwesome"

import DotsMenuIcon from "../assets/icons/dots.png"
import FolderLock from "../assets/icons/folderLock.png"
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import { DeleteFromDirectory } from "../functions/file.functions.js"
import * as FileSystem from "expo-file-system"

import generateId from "../functions/generateId.js"
import { downloadContext } from "../context/downloadContext.js"

// constants
import { host } from '../constants/requests.js'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Finished({ navigation }) {
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [deleteItem, setDeleteItem] = useState(false)
    const [selected, setSelected] = useState([])
    const [userId, setUserId] = useState("")
    const [files, setFiles] = useState([])

    const { state, dispatch } = useContext(downloadContext)
    const { querysChanging } = state

    useEffect(() => {
        const getUserId = async () => {
            const id = await AsyncStorage.getItem("user_id")
            if (id) setUserId(id)
            else {
                const newId = generateId()
                await AsyncStorage.setItem("user_id", newId)
            }
        }
        getUserId()
        const getFiles = async () => {
            try {
                const files = await axios.get(host + "/api/file/" + userId)
                setFiles(files.data.reverse())
            } catch (error) {
                console.log("Files error:", error)
            }
        }
        getFiles()
    }, [querysChanging])


    const handleCheck = (check_id, check) => {
        if (!check) {
            setSelected(prev => ([...prev, check_id]))
        } else if (selected.includes(check_id)) {
            setSelected(prev => prev.filter(item => item !== check_id))
        }
    }

    const handleDelete = async () => {
        setDeleteLoading(true)
        if (!selected) return 0;
        try {
            for (let oneSelected of selected) {
                const oneSelectedFile = files.filter(file => file._id === oneSelected)
                console.log("oneSelectedFile:", oneSelectedFile[0].name)
                const res = await axios.delete(host + "/api/file/" + oneSelected)
                console.log("handleDelete:", res.data)
                DeleteFromDirectory(FileSystem.documentDirectory + oneSelectedFile[0].name + ".mp4")
                dispatch({
                    type: "querysChanging",
                    payload: !querysChanging
                })
                setSelected([])
                setDeleteLoading(false)
            }
        } catch (error) {
            console.log("delete error:", error)
        }
    }

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
                        files.length > 0
                            ?
                            files?.map(file => (
                                <FinishedVideo
                                    navigation={navigation}
                                    deleteMenu={deleteItem}
                                    deleteLoading={deleteLoading}
                                    setDeleteLoading={setDeleteLoading}
                                    handleCheck={handleCheck}
                                    file={file}
                                    key={file._id}
                                    id={file._id}
                                    selected={selected}
                                />
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
