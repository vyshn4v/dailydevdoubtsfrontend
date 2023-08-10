import server from "../config/Axios";

export function loginWithGoogle(token) {
    return server.get("auth/login-with-google", {
        params: {
            googleTOken: token
        }
    })
}
export function adminLogin({ email, password }) {
    return server.get("auth/admin-login", {
        params: {
            "email": email,
            "password": password
        }
    })
}
export function signupWithGoogle(token) {
    return server.post("auth/signup-with-google", {
        googleTOken: token
    })
}
export function verifyUserOtp(token, Otp) {
    return server.post("user/otp", {

        Otp: Otp
    }, {
        headers: {
            authorization: "Bearer " + token
        },
    })
}
export function signupWithEmailAndPassword({ name, email, phone, password, confirmPassword }) {
    return server.post("auth/signup", {
        username: name, email, phone: Number(phone), password, confirm_password: confirmPassword
    })
}
export function loginWithEmailAndPassword({ email, password }) {
    return server.get("auth/login", {
        params: {
            email, password
        }
    })
}
export function generateOtp({ phone }) {
    return server.get("auth/otp", {
        params: {
            phoneNumber:phone
        }
    })
}
export function changePassword({ password,otp,phone
 }) {
    return server.put("auth/change-password",null, {
        params: {
            password,otp,phoneNumber:phone
        }
    })
}

export default {
    generateOtp,
    changePassword
}