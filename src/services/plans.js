import server from "../config/Axios";

export function getAllPlans({ role }) {
    return server.get('/plans', {
        headers: {
            'X-Role': role
        }
    })
}
export function managePlan({ role, isHide, plan_id }) {
    return server.put('/plans', null, {
        headers: {
            'X-Role': role
        },
        params: isHide ? {
            plan_id,
            isHide
        } : {
            plan_id,
        }
    })
}
export function addPlan({ role, plan, totalQuestions, totalAnswers, price, TotalDays }) {
    return server.post('/plans', {
        plan,
        totalQuestions,
        totalAnswers,
        price,
        TotalDays
    }, {
        headers: {
            'X-Role': role
        }
    })
}
export function orderPlan({ role, amount }) {
    return server.post('/plans/order', {
        amount
    }, {
        headers: {
            'X-Role': role
        }
    })
}
export function ConfirmOrder({ role, razorpay_order_id, plan_id }) {
    return server.post('/plans/confirm-order', {
        razorpay_order_id,
        plan_id
    }, {
        headers: {
            'X-Role': role
        }
    })
}

export default {
    getAllPlans,
    managePlan,
    addPlan,
    orderPlan,
    ConfirmOrder,
}