import { Outlet } from "react-router-dom"
import Header from "../../../components/Header/Header"

function DrawerOutlet() {
    return (
        <>
            <Header />
            <Outlet />
        </ >
    )
}

export default DrawerOutlet