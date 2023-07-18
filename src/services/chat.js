import server from "../config/Axios"

export function getAllChats({ token }) {
    return server.get("chat", {
        headers: {
            authorization: "Bearer " + token,
            'X-Role': 'user',
        }
    })
}
export function createChat({ token, isGroup, name, users, image }) {
    const form = new FormData()
    form.append('image', image)
    form.append('isGroup', isGroup)
    form.append('name', name)
    form.append('users', JSON.stringify(users))
    return server.post("chat",form, {
        headers: {
            authorization: "Bearer " + token,
            'X-Role': 'user',
        },
    })
}
export function sendMessage({ message, token, chat_id }) {
    return server.post("/chat/message/" + chat_id, {
        message
    }, {
        headers: {
            authorization: "Bearer " + token,
            'X-Role': 'user',
        }
    },)
}

export function deleteChat({  token, chat_id }) {
    return server.delete("/chat/" + chat_id,{
        headers: {
            authorization: "Bearer " + token,
            'X-Role': 'user',
        }
    },)
}
export function leftChat({  token, chat_id }) {
    return server.delete("/chat/" + chat_id,{
        params:{
            left:true
        },
        headers: {
            authorization: "Bearer " + token,
            'X-Role': 'user',
        }
    },)
}



export default {
    getAllChats,
    createChat,
    sendMessage,
    deleteChat,
    leftChat
}