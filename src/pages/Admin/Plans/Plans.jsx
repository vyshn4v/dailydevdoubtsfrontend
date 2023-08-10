import { Container, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { addPlan, getAllPlans } from '../../../services/plans'
import TableComponent from '../../../components/Table/Table'
import CustomModal from '../../../components/AddPlanCustomModal/CustomModal'
import { toast } from 'react-toastify'
import plansService from '../../../services/plans'
import CustomConfirmation from '../../../components/CustomConfimation/CustomConfirmation'
function Plans() {
    const [plans, setPlans] = useState()
    const [name, setName] = useState()
    const [totalQuestions, setTotalQuestions] = useState()
    const [totalAnswers, setTotalAnswers] = useState()
    const [TotalPrice, setTotalPrice] = useState()
    const [TotalDays, setTotalDays] = useState()
    const [rearrangedData, setRearrangedData] = useState()
    const hidePlan = (id) => {
        plansService.managePlan({ role: 'admin', plan_id: id }).then((res) => {

            console.log("res.data", res.data);
            setPlans(prev => prev.map((plan) => plan._id === res.data.data._id ? res.data.data : plan))
            toast.success('success fully hide plan')
        }).catch(() => {
            toast.error('error while hide subscription plan')
        })
    }
    const showPlan = (id) => {
        plansService.managePlan({ role: 'admin', plan_id: id, isHide: true }).then((res) => {
            setPlans(prev => prev.map((plan) => plan._id === res.data.data._id ? res.data.data : plan))
        }).catch(() => {
            toast.error('error while unhiding subscription plan')
        })
    }
    useEffect(() => {
        getAllPlans({ role: 'admin' }).then((res) => {
            setPlans(res.data.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    useEffect(() => {
        let data = plans?.map((plan) => {
            return {
                Plan: plan.plan?.toUpperCase(),
                TotalQuestions: plan.totalQuestions,
                TotalAnswers: plan.totalAnswers,
                Price: plan.price,
                Status: plan.isActive ? "In use" : "Not use",
                Action: plan.isActive ? (<CustomConfirmation button={'Hide'} title={'Are you sure ?'} handleConfirmAction={() => hidePlan(plan._id)} body={"To hide this plan user can't access or purchase this plan"} />) : (<CustomConfirmation button={'Show'} title={'Are you sure ?'} handleConfirmAction={() => showPlan(plan._id)} body={"To show this plan user can access or purchase this plan"} />)
            }
        })
        setRearrangedData(data)
    }, [plans])
    const handleSubscriptionPlanSubmit = () => {
        if (!totalQuestions || !totalAnswers || !TotalPrice || !TotalDays || !rearrangedData) {
            toast.error("Enter the fields")
            return
        }
        addPlan({ role: 'admin', plan: name, totalQuestions, totalAnswers, price: TotalPrice, TotalDays }).then((res) => {
            setPlans(prev => [...prev, res.data.data])
            setTotalQuestions('')
            setTotalAnswers('')
            setName('')
            setTotalPrice('')
            setTotalDays('')
            setRearrangedData('')
        }).catch(() => {
            toast.error('Failed to update subscription plan ')
        })
    }

    const managePlansState = (e) => {
        if (e.target.name === 'name') {
            setName(e.target.value)
        }
        if (e.target.name === 'TotoalQuestions') {
            setTotalQuestions(e.target.value)
        }
        if (e.target.name === 'TotalAnswer') {
            setTotalAnswers(e.target.value)
        }
        if (e.target.name === 'TotalDays') {
            setTotalDays(e.target.value)
        }
        if (e.target.name === 'TotalPrice') {
            setTotalPrice(e.target.value)
        }
    }


    return (
        <Container sx={{ marginTop: 10 }}>
            <Grid container xs={12}>
                <Grid item xs={6} justifyContent={'flex-end'}>
                    <Typography sx={{
                        fontSize: "30px",
                        marginLeft: "20px",
                        marginBottom: "20px"
                    }}>
                        Subscription Plans
                    </Typography>
                </Grid>
                <Grid item xs={6} display={'flex'} justifyContent={'flex-end'}>
                    <CustomModal button={'Add plans'} managePlansState={managePlansState} state={{
                        name,
                        totalQuestions,
                        totalAnswers,
                        TotalPrice,
                        TotalDays
                    }} handleSubmit={handleSubscriptionPlanSubmit} />
                </Grid>
                <Grid item xs={12}>
                    <Grid item gap={3} justifyContent={'center'}>
                        <TableComponent data={rearrangedData} />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Plans