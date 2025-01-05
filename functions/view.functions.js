import * as FileSystem from "expo-file-system"
import * as MediaLibrary from "expo-media-library"
import { changeDownloadProgress, changeDownloadVideo } from "../state/userSlice"

export const saveFiles = async (video, setDownloadProgress, setDownloadLoading, setDownloadVideo, dispatch) => {
    console.log("menimcha dispatchda hech qanday muammo yo'q")
    try {
        if (video) {
            console.log("save files funksiyasi boshlandi...")
            const fileName = video.name + ".mp4"
            const downloadingResumble = FileSystem.createDownloadResumable(
                video.downloadUrl,
                FileSystem.documentDirectory + fileName,
                {},
                (progress) => {
                    setDownloadProgress((progress.totalBytesWritten / progress.totalBytesExpectedToWrite) * 100)
                    dispatch(changeDownloadProgress((progress.totalBytesWritten / progress.totalBytesExpectedToWrite) * 100))
                    console.log("progress o'zgarmoqda !")
                }
            )
            // loading !
            setDownloadLoading(false)
            setDownloadVideo(downloadingResumble)
            dispatch(changeDownloadVideo(downloadingResumble))


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
        } else {
            console.log("video malumotlari mavjud emas !")
        }
    } catch (error) {
        console.log("save error", error)
    }
}
