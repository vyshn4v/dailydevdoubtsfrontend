import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../../../redux/feature/User/userAuth/Auth"
import { Navigate, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import PlanModal from "../../../components/PlanModal/PlanModal"

// eslint-disable-next-line react/prop-types
function ProtectedRouter({ children }) {
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('user'))
    const User = useSelector(state => state.user.user)
 
    if (user) {
        if (!User) {
            dispatch(addUser(user))
        }
        if (!user.isVerified) {
            if (location.pathname === '/verify-otp') {
                return children
            } else {
                return <Navigate to={"/verify-otp"} />
            }
        } else {

            if (location.pathname === '/signup' || location.pathname === '/login' || location.pathname === '/verify-otp') {
                return <Navigate to={'/'} />
            }
            else {
                return children
            }
        }

    } else {
        if (location.pathname === '/signup' || location.pathname === '/login'|| location.pathname === '/forgot-password') {
            return children
        } else {
            return <Navigate to={"/login"} />
        }
    }
}

export default ProtectedRouter