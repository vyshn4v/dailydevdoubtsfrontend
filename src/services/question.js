import axios from "axios";
import server from "../config/Axios";

export function imageUpload(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    // formData.append("tags", "browser_upload");
    // formData.append("api_key", import.meta.env.VITE_IMAGEUR_CLIENT_ID);
    // formData.append("public_id", "sample_image");
    // formData.append("timestamp", Date.now() / 1000);
    return axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`, formData)
}

export function getAllQuestions({ start, limit, sort, search, token, role }) {
    return server.get("question/all", {
        headers: {
            'X-Role': role,
            authorization: "Bearer " + token
        },
        params: {
            start,
            sort,
            limit,
            search
        }
    })
}
export function getQuestion({ question_id, token, role }) {
    return server.get("question", {
        headers: {
            authorization: "Bearer " + token,
            'X-Role': role
        },
        params: {
            question_id
        }
    })
}
export function upVoteQuestion({ question_id, token, role }) {
    return server.get("question/vote", {
        headers: {
            'X-Role': role,
        },
        params: {
            question_id,
            upvote: true
        }
    })
}
export function downVoteQuestion({ question_id, token, role }) {
    return server.get("question/vote", {
        headers: {
            'X-Role': role,
        },
        params: {
            question_id
        }
    })
}
export function approveQuestions({ id, token }) {
    return server.put("question", null, {
        params: {
            id,
            isApprove: true
        },
        headers: {
            'X-Role': "admin",
            authorization: "Bearer " + token
        }
    })
}
export function rejectQuestions({ id, token }) {
    return server.put("question", null, {
        params: {
            id,
            isApprove: false
        },
        headers: {
            'X-Role': "admin",
            authorization: "Bearer " + token
        }
    })
}
export function addQuestion(data, token) {
    return server.post("question", data, {
        headers: {
            'X-Role': 'user',
            authorization: "Bearer " + token
        }
    })
}
export function reportQuestion(data) {
    return server.post("question/report", data, {
        headers: {
            'X-Role': 'user',
        }
    })
}
export function addToBookmarkQuestion({ id }) {
    return server.put("question/bookmark", null, {
        params: {
            question_id: id,
            isAdd: true
        },
        headers: {
            'X-Role': 'user',
        }
    }
    )
}
export function removeFromBookmarkQuestion({ id }) {
    return server.put("question/bookmark", null, {
        params: {
            question_id: id,
        },
        headers: {
            'X-Role': 'user',
        }
    }
    )
}
export function getReportQuestions({ start, limit, sort, search, token }) {
    return server.get("question/reported-questions", {
        headers: {
            authorization: 'Bearer ' + token,
            'X-Role': 'user',

        },
        params: {
            start,
            limit,
            sort,
            search
        }
    })
}
export function getBookmarkedQuestions({ token }) {
    return server.get("question/bookmark", {
        headers: {
            authorization: 'Bearer ' + token,
            'X-Role': 'user',
        }
    })
}

export default {
    getQuestion,
    upVoteQuestion,
    downVoteQuestion,
    reportQuestion,
    getReportQuestions,
    approveQuestions,
    rejectQuestions,
    addToBookmarkQuestion,
    removeFromBookmarkQuestion,
    getBookmarkedQuestions
}