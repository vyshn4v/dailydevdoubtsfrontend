import server from "../config/Axios";

export function addAnswer({ question_id, html, role }) {
    return server.post("answer", {
        question_id,
        html
    },
        {
            headers: {
                'X-Role': role,
            }
        })
}
export function editAnswer({ answer_id, html, role }) {
    return server.put("answer", {
        answer_id,
        html
    },
        {
            headers: {
                'X-Role': role,
            }
        })
}
export function editAnswerRequest({ answer_id, html,role }) {
    return server.post("answer/edit-request", {
        answer_id,
        html
    },
        {
            headers: {
                'X-Role': role,
            }
        })
}
export function approveAnswerRequest({ answer_id, role }) {
    return server.put("answer/edit-request",null,
        {
            headers: {
                'X-Role': role,
            },
            params: {
                answer_id,
            }
        })
}
export function voteAnswer({ answer_id, upvote, role }) {
    return server.put("/answer/vote", null, {
        headers: {
            'X-Role': role,
        },
        params: {
            answer_id,
            upvote
        }
    })
}

export default {
    addAnswer,
    voteAnswer,
    editAnswer
}