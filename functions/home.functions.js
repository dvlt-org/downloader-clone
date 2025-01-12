import axios from "axios"

const host = `http://192.168.100.14:5000`

export const createQuery = async (userId, title) => {
    if (userId) {
        try {
            const res = await axios.post(`${host}/api/query`, {
                name: title,
                user_id: userId
            })
            console.log("query yaratildi...: ", res.data)
        } catch (error) {
            console.log("platform click error", error)
        }
    }
}


export const updateQuery = async (activeQuery, title) => {
    if (activeQuery._id) {
        try {
            const updatedQuery = await axios.put(`${host}/api/query/${activeQuery._id}`, {
                name: title
            })
            console.log("query updated: ", updatedQuery.data)
            return updatedQuery.data;
        } catch (error) {
            console.log("updateQuery error: ", error)
        }
    } else {
        console.log("activeQuery mavjud emas !")
    }
}