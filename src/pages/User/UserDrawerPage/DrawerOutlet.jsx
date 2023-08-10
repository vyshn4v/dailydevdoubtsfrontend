import { Outlet, useNavigate } from "react-router-dom"
import Header from "../../../components/Header/Header"
import PlanModal from "../../../components/PlanModal/PlanModal"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

function DrawerOutlet() {
    const [modalOpen, setModalOpen] = useState(false)
    const navigate = useNavigate()
    const handleClose = () => {
        setModalOpen(false)
    }
    const user = useSelector(state => state.user.user)
    useEffect(() => {
        if (new Date(user?.plan?.expired_date) < new Date()) {
            setModalOpen(true)
        }
    }, [user])
    const handleNavigateToPlans = () => {
        setModalOpen(false)
        navigate('/plans')
    }
    return (
        <>
            {
                (location.pathname !== '/forgot-password' && location.pathname !== '/signup' && location.pathname !== '/login' && location.pathname !== '/login') && <PlanModal open={modalOpen} handleClose={handleClose} handlenaviagateToPlans={handleNavigateToPlans} />
            }
            <Header />
            <Outlet />
        </ >
    )
}

export default DrawerOutlet