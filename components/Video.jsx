import React, { useEffect } from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import { useSelector } from "react-redux"

const host = `http://192.168.100.14:5000/`


const Video = ({ type, video }) => {
    const [paused, setPaused] = React.useState(false)
    const progresses = useSelector(store => store.user.downloadingProgress)

    const progress = progresses[video.video._id]
    const progressPercent = (progress?.totalBytesWritten / progress?.totalBytesExpectedToWrite) * 100;
    const bytesToMB = (bytes) => (bytes / (1024 * 1024)).toFixed(2);

    const handleVideo = async () => {
        try {
            if (paused) {
                console.log("paused")
                await video.downloadingResumble.resumeAsync()
                setPaused(false)
            } else {
                console.log("not paused")
                await video.downloadingResumble.pauseAsync()
                setPaused(true)
            }
        } catch (error) {
            console.log("pause error:", error)
        }
    }

    return (
        progressPercent !== 100
        &&
        <View style={{
            flexDirection: "row",
            marginVertical: 10,
        }}>
            <Image source={{
                uri: host + video.video.image
            }} width={100} height={100} style={{
                objectFit: "cover",
                borderRadius: 10,
            }} />
            <View style={{
                marginLeft: 20,
                width: "100%",
            }}>
                <Text style={{
                    marginVertical: 5,
                    fontSize: 16,
                    fontWeight: "bold",
                }}>{`${video.video.name}.mp4`}</Text>
                {
                    type !== "downloaded" && (
                        <View style={{
                            width: "100%",
                            backgroundColor: "#cecfc7",
                            height: 10,
                            borderRadius: 5,
                            position: "relative",
                            zIndex: -1
                        }}>
                            <View style={{
                                position: "absolute",
                                left: 0,
                                width: `${progressPercent}%`,
                                backgroundColor: "#0496ff",
                                height: "100%",
                                borderRadius: 5,
                            }}></View>
                        </View>
                    )
                }
                <View>
                    <View style={{
                        flexDirection: "row",
                        marginHorizontal: 0.001,
                        marginVertical: 5,
                    }}>
                        <Text style={{
                            fontSize: 12,
                            color: "#000",
                            fontWeight: "bold",
                        }}>{bytesToMB(progress?.totalBytesExpectedToWrite)}</Text>
                        <Text style={{
                            fontSize: 15,
                            marginHorizontal: 5,

                        }}>/</Text>
                        <Text style={{
                            fontSize: 12,
                            color: "#000",
                            fontWeight: "bold",
                        }}>{bytesToMB(progress?.totalBytesWritten)}MB</Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        marginHorizontal: 0.001,
                        alignItems: "center",
                        marginTop: 5,
                    }}>
                    <TouchableOpacity
                        onPress={handleVideo}
                        style={{
                            width: 50,
                            height: 50,
                        }}
                    >
                        <Icon name={paused ? "play" : "pause"} size={20} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Video