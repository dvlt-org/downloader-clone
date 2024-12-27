import { View, Text, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Video from "../components/Video.jsx"
import FolderLock from "../assets/icons/folderLock.png"

export default function Finished({navigation}) {
    console.log(navigation)

    return (
        <SafeAreaView >
            <View style={{
                marginHorizontal: 10,
            }}>
                <View style={{
                    padding: 10,
                    backgroundColor: "#00ccf5",
                    marginVertical: 3,
                    borderRadius: 10,
                    flexDirection: 'row',
                    justifyContent: "space-between",
                }}>
                    <Text
                        style={{
                            fontFamily: "inter-medium",
                            fontSize: 20,
                        }}>YUKLAB BO'LINDI
                    </Text>
                    <TouchableOpacity 
                    onPress={() => navigation.navigate("FolderLock")}>
                        <Image source={FolderLock} style={{
                            width: 30,
                            height: 30,
                            objectFit: "contain",
                        }} />
                    </TouchableOpacity>

                </View>
                <Video type="downloaded" />
                <Video type="downloaded" />
                <Video type="downloaded" />
                <Video type="downloaded" />
                <Video type="downloaded" />
                <Video type="downloaded" />
            </View>
        </SafeAreaView>

    )
}
