import { View, Text, TouchableOpacity } from "react-native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import RenameIcon from "../assets/icons/rename.png"
import BrowserIcon from "../assets/icons/browser.png"
import FontIcons from "react-native-vector-icons/FontAwesome"
import { Image } from "react-native"

export default function VidoeInfoSheet() {
    return (
        <View style={{
            padding: 30,
        }}>
            <Text style={{
                fontSize: 30,
            }}>Videonomi.mp4</Text>
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
                }}>
                    <FontIcons name="location-arrow" size={30} />
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
                }}>
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