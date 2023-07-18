import server from "../config/Axios"

export function getDashBoardData({  token }) {
    return server.get("dashboard", {
        headers: {
            authorization: "Bearer " + token,
            'X-Role':'admin',
        }
    },)
}
export default{
    getDashBoardData
}