import axios from "axios"

const host = `http://192.168.100.14:5000`

export const createQuery = async (userId, title) => {
    if (userId) {
        try {
            console.log(userId, title, "home functions")
            const res = await axios.post(`${host}/api/query`, {
                name: title,
                user_id: userId
            })
            console.log("query yaratildi !", res.data)
        } catch (error) {
            console.log("platform click error", error)
        }
    }
}
