import Materialicons from "react-native-vector-icons/MaterialIcons"
import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text, Image, ScrollView, TouchableOpacity, Modal } from "react-native"
import BackImg from "../assets/icons/back.png"
import { downloadContext } from "../context/downloadContext"
import DotsImg from "../assets/icons/dots.png"
import { useContext, useState } from "react"
import { TouchableWithoutFeedback } from "react-native"
import { hasIcon } from "../functions/drawer.functions"
import { Button } from "react-native"


export default function History({ navigation }) {
    const [historyMenu, setHisotryMenu] = useState(false)
    const [deleteMenu, setDeleteMenu] = useState(false)

    const { state, dispatch } = useContext(downloadContext)

    const { activeQuery } = state

    console.log("activeQuery", activeQuery)

    const handleMenuClick = () => {
        setHisotryMenu(!historyMenu)
    }

    const handleClickOver = () => {
        setHisotryMenu(false)
    }

    const handleGoBack = () => {
        navigation.goBack()
    }

    const handleDeleteAll = () => {
        setDeleteMenu(true)
    }
    return (
        <SafeAreaView>
            <TouchableWithoutFeedback
                onPress={handleClickOver}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                }}
            >
                <View style={{
                    paddingHorizontal: 20,
                    width: "100%",
                    justifyContent: 'center',
                }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "97%"
                        }}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginBottom: 10,
                            }}
                        >
                            <TouchableOpacity
                                onPress={handleGoBack}
                            >
                                <Image source={BackImg} style={{
                                    width: 40,
                                    height: 40,
                                    resizeMode: "contain"
                                }} />
                            </TouchableOpacity>
                            <Text
                                style={{
                                    marginLeft: 20,
                                    fontSize: 20,
                                    fontWeight: "500",
                                }}
                            >Tarix</Text>
                        </View>
                        <Materialicons name="delete" size={30} onPress={handleDeleteAll} />
                    </View>
                    <Modal
                        visible={deleteMenu}
                        transparent={true}
                        animationType="fade"
                        onRequestClose={deleteMenu}
                    >
                        <View

                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'rgba(0, 0, 0, 0.7)', // 0.7 shaffof orqa fon
                            }}
                        >
                            <View>
                                <Text
                                    style={{
                                        color: "white",
                                        fontSize: 17,
                                    }}
                                >Rostdanham hamma tarix o'chirilsinmi ?</Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    marginVertical: 10,
                                }}
                            >
                                <Button title="ha" color={"green"} onPress={() => {
                                    setDeleteMenu(false)
                                }} />
                                <View style={{
                                    marginHorizontal: 10,
                                }}></View>
                                <Button title="yo'q" color={"red"} onPress={() => {
                                    setDeleteMenu(false)
                                }} />
                            </View>
                        </View>
                    </Modal>
                    <ScrollView>
                        {
                            Array.isArray(activeQuery.history) && activeQuery.history.map(history => {
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        width: "97%",
                                        borderBottomColor: "#000",
                                        borderBottomWidth: 1,
                                        borderStyle: "solid",
                                        marginTop: 10,
                                        position: "relative"
                                    }}
                                >
                                    <View>
                                        <Text style={{
                                            fontSize: 20,
                                            fontWeight: "bold",
                                        }}
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                        >{history.name}</Text>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                marginVertical: 10,
                                            }}
                                        >
                                            {hasIcon(history.name)}
                                            <Text style={{
                                                fontSize: 16,
                                                marginLeft: 10,
                                                color: "gray"
                                            }}
                                                numberOfLines={1}
                                                ellipsizeMode="tail"
                                            >{history.name}</Text>
                                        </View>
                                    </View>
                                    <TouchableWithoutFeedback
                                        onPress={handleMenuClick}
                                    >
                                        <Image source={DotsImg} style={{
                                            width: 30,
                                            height: 30,
                                            resizeMode: "contain"
                                        }} />
                                    </TouchableWithoutFeedback>
                                    {
                                        historyMenu && (
                                            <HistoryMenu />
                                        )
                                    }
                                </View>
                            })
                        }
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView >
    )
}

const HistoryMenu = () => {
    return (
        <View
            style={{
                position: "absolute",
                top: 50,
                right: 10,
                width: 200,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 11 },
                shadowOpacity: 0.57,
                shadowRadius: 15.19,
                elevation: 23,
                padding: 10,
                zIndex: 999,
                backgroundColor: "#efefef",
                flex: 1,  // Qo'shildi
            }}
        >
            <TouchableOpacity style={{ width: '100%', flexDirection: "row" }}>
                <Materialicons name="content-copy" size={25} />
                <Text style={{ marginLeft: 10, width: "50%" }}>Nusxalash</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: '100%', flexDirection: "row", justifyContent: "space-between" }}>
                <Materialicons name="share" size={25} />
                <Text style={{ marginLeft: 10, width: "50%" }}>Ulashish</Text>
            </TouchableOpacity>
        </View>
    )
}