import * as FileSystem from "expo-file-system"
import * as MediaLibrary from "expo-media-library"
import { addProgress, queryChanging } from "../state/userSlice"

export const saveFiles = async (video, dispatch, downloadDispatch, queryChangingValue) => {
    console.log("queryChangingValue:", queryChangingValue)
    try {
        if (video) {
            const fileName = video.name + ".mp4"
            const downloadingResumble = FileSystem.createDownloadResumable(
                video.downloadUrl,
                FileSystem.documentDirectory + fileName,
                {},
                (progress) => {
                    dispatch(addProgress({
                        id: video._id,
                        progress: progress
                    }))
                }
            )
            // loading !
            downloadDispatch({
                type: "add",
                payload: {
                    downloadingResumble,
                    video,
                }
            })

            // permission to media library
            const { status } = await MediaLibrary.requestPermissionsAsync()
            if (status !== "granted") {
                console.log("Mediani yuklab olishga ruxsat berilmadi !")
                return 0;
            }


            const { uri } = await downloadingResumble.downloadAsync()
            console.log("file muvaffaqiyatli yuklab olindi !")

            const asset = await MediaLibrary.createAssetAsync(uri)
            await MediaLibrary.createAlbumAsync("Download", asset, false)
            console.log("galareyaga saqlandi !")
            dispatch(queryChanging(!queryChangingValue))
        } else {
            console.log("video malumotlari mavjud emas !")
        }
    } catch (error) {
        console.log("save error", error)
    }
}
