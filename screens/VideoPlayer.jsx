import { Video } from "expo-av"
import { TouchableOpacity, View, Text, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import FontIcon from "react-native-vector-icons/FontAwesome"

const VideoPlayer = (props) => {
    const navigation = props.navigation
    const route = props.route
    return (
        <SafeAreaView>
            <View
                style={{
                    position: "relative",
                    padding: 20,
                }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        position: "absolute",
                        padding: 20,
                        zIndex: 1,
                    }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack()
                        }}>
                        <FontIcon
                            name='arrow-left'
                            size={25}
                            style={{
                                textAlign: "center",
                                borderRadius: 50,
                                backgroundColor: "black",
                                padding: 10,
                            }}
                            color={"white"}
                        />
                    </TouchableOpacity>
                    <Text style={{
                        marginLeft: 20,
                        fontSize: 25,
                        fontWeight: "400"
                    }}>ORTGA QAYTISH</Text>
                </View>
                {route.params.videoUri
                    ?
                    <Video
                        source={{
                            uri: route.params.videoUri,
                        }}
                        useNativeControls // Tabiiy boshqaruvni yoqadi
                        resizeMode="contain" // Video hajmini moslashtirish
                        isLooping // Qayta boshlashni yoqish
                        onError={(error) => console.log(error)}
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 10,
                            padding: 10,
                        }}
                    />
                    :
                    <ActivityIndicator size="small" />}
            </View>
        </SafeAreaView>
    )
}

export default VideoPlayer