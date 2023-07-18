import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { addAdmin } from "../../../redux/feature/Admin/adminAuth/Auth"

// eslint-disable-next-line react/prop-types
function ProtectedRouter({ children }) {
    const dispatch = useDispatch()
    const admin = JSON.parse(localStorage.getItem('admin'))
    const Admin = useSelector(state => state.admin.admin)
    if (admin) {
        if (!Admin) {
            dispatch(addAdmin(admin))
        }
        if (location.pathname === '/admin/signup' || location.pathname === '/admin/login') {
            return <Navigate to={'/admin/dashboard'} />
        } else {
            return children
        }
    } else {
        if (location.pathname === '/admin/signup' || location.pathname === '/admin/login') {
            return children
        } else {
            return <Navigate to={"/admin/login"} />
        }
    }
}

export default ProtectedRouter