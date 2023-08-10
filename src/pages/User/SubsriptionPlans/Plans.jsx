import { useCallback, useEffect, useState } from "react"
import { ConfirmOrder, getAllPlans, orderPlan } from "../../../services/plans"
import { toast } from "react-toastify"
import PlanCard from "../../../components/PlanCard/PlanCard"
import { Grid } from "@mui/material"
import useRazorpay from "react-razorpay"
import { useNavigate } from "react-router-dom"
function Plans() {
    const [plans, setPlans] = useState([])
    const [Razorpay] = useRazorpay();
    const navigate = useNavigate()
    const handlePayment = useCallback(async (amount, planId) => {
        const order = await orderPlan({ amount, role: 'user' });
        const options = {
            "key": "rzp_test_s95DAqTWX9T5DX", // Enter the Key ID generated from the Dashboard 
            "name": "DaliyDevDoubts",
            "amount": order.data.data.amount,
            "order_id": order.data.data.id, // For one time payment
            "handler": function (response) {
                console.log('response', response);
                ConfirmOrder({ role: 'user', razorpay_order_id: response.razorpay_order_id, plan_id: planId }).then((res) => {
                    toast.success('Plan upgraded')
                    localStorage.setItem('user', JSON.stringify({ ...JSON.parse(localStorage.getItem('user')), plan: res.data.data }))
                    navigate('/')
                }).catch((err) => {
                    console.log(err);
                })

            },
        };

        const rzpay = new Razorpay(options);
        rzpay.open();
    }, [Razorpay]);

    useEffect(() => {
        getAllPlans({ role: 'user' }).then((res) => {
            setPlans(res.data.data)
        }).catch(() => {
            toast.error('failed to load plans')
        })
    }, [])
    return (
        <>

            <Grid container display={'flex'} justifyContent={'center'} >

                {
                    plans?.map((plan, index) => {
                        return <Grid item key={index} display={'flex'} justifyContent={'center'}>
                            <PlanCard data={plan} handlePayment={handlePayment} />
                        </Grid>
                    })
                }
            </Grid>
        </>
    )
}

export default Plans