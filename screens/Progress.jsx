import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Video from "../components/Video"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import { useContext } from "react"
import { downloadContext } from "../context/downloadContext"

export default function Progress({ navigation }) {
    const { state, downloadDispatch } = useContext(downloadContext)
    const downloadVideos = state.videos

    return (
        <SafeAreaView>
            <View style={{
                padding: 10,
                backgroundColor: "#afe2ec",
                width: 'auto',
                marginHorizontal: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Text
                    style={{
                        fontSize: 20,
                        width: "60%"
                    }}>DAVOM ETILMOQDA...</Text>

                <TouchableOpacity
                    onPress={() => navigation.navigate("FeedBack")}
                >
                    <MaterialIcon name="message" size={20}
                        style={{
                            width: 20,
                        }}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView style={{
                marginHorizontal: 10,
            }}>
                {
                    downloadVideos.map((item, index) => (<Video video={item} key={index} />))
                }
            </ScrollView>
        </SafeAreaView>
    );
}
