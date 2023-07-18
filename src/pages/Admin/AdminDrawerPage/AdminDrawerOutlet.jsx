import { Outlet } from "react-router-dom"
import DrawerComponent from "../../../components/userDrawer/Drawer"
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