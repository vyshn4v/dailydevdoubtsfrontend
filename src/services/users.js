import server from "../config/Axios";

export function getAllUsers({ start, search,limit, sort, token, role }) {
    return server.get('user/all-users', {
        headers: {
            'X-Role': `${role}`,
            authorization: "Bearer " + token
        },
        params: {
            start,
            search,
            sort,
            limit
        }
    })
}
export function manageUsers({ id, isBanned, token, role }) {
    return server.put("user/manage", null, {
        headers: {
            'X-Role': role,
            authorization: "Bearer " + token
        },
        params: {
            user_id: id,
            isBanned
        }
    })
}

export function getProfile({ user, role }) {
    return server.get('user/profile', {
        headers: {
            'X-Role': role
        },
        params: {
            ...user
        }
    })
}
export function uploadProfile(image) {
    return server.put('user/profile', image,{
        headers:{
            "X-Role":'user'
        }
    })
}
export function followUnfollowUser({ user, follow }) {
    return server.put('user/follow-unfollow', null, {
        params: {
            user_id: user,
            follow
        },
        headers:{
            'X-Role': 'user',
        }
    })
}

export default {
    getAllUsers,
    manageUsers,
    getProfile,
    uploadProfile,
    followUnfollowUser
}
