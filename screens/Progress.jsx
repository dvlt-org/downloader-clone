import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Video from "../components/Video"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import { useSelector, useDispatch } from "react-redux"

export default function Progress({ navigation }) {
    const downloadVideos = useSelector(store => store.user.downloadVideos)
    console.log(downloadVideos, "from progress")

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
                    downloadVideos.map((item, index) => {
                        return (
                            <Video video={item} key={index}/>
                        )
                    })
                }
            </ScrollView>
        </SafeAreaView>
    );
}
