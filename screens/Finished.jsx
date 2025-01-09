import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FinishedVideo from "../components/FinishedVideo.jsx"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import FontIcon from "react-native-vector-icons/FontAwesome"

import DotsMenuIcon from "../assets/icons/dots.png"
import FolderLock from "../assets/icons/folderLock.png"
import { useEffect, useState } from 'react'
import axios from 'axios'

import { useSelector } from 'react-redux'


// constants
const host = `http://192.168.100.14:5000`

export default function Finished({ navigation }) {
    const [deleteItem, setDeleteItem] = useState(false)
    const [selected, setSelected] = useState([])
    const [files, setFiles] = useState([])

    const userId = useSelector(store => store.user.userId)
    const queryChanging = useSelector(store => store.user.queryChanging)
    console.log('%cUserId', userId, 'color: red;');
    console.log('%cQuery changing', queryChanging, 'color: red;');

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
    }, [queryChanging])

    const handleCheck = (check_id, check) => {
        if (!check) {
            setSelected(prev => ([...prev, check_id]))
        } else if (selected[check_id]) {
            setSelected(prev => prev.filter(item => item !== check_id))
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
                        {deleteItem && <FontIcon onPress={() => setDeleteItem(false)} name='arrow-left' size={30} />}
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
                                    <TouchableOpacity>
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
                                <FinishedVideo navigation={navigation} deleteMenu={deleteItem} handleCheck={handleCheck} file={file} key={file._id} />
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
