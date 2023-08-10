import server from "../config/Axios";

export function getAdevertisements({ role }) {
    return server.get("/advertisement",
        {
            headers: {
                'X-Role': role,
            },
        })
}
export function postAdvertisement({ image, label, expiryDate, websiteUrl }) {
    let form = new FormData()
    form.append('image', image)
    form.append('label', label)
    form.append('expiryDate', expiryDate)
    form.append('websiteUrl', websiteUrl)
    return server.post("/advertisement", form,
        {
            headers: {
                'X-Role': "admin",
            },
        })
}
export function deleteAdvertisement({ ad_id }) {
    return server.delete("/advertisement",
        {
            headers: {
                'X-Role': "admin",
            },
            params: {
                ad_id
            }
        })
}
export default {
    getAdevertisements,
    postAdvertisement,
    deleteAdvertisement
}