import { Outlet } from "react-router-dom"
import AdminHeader from "../../../components/Header/AdminHeader"

function DrawerOutlet() {
   
    return (
        <>
            <AdminHeader />
            <Outlet />
        </ >
    )
}

export default DrawerOutlet