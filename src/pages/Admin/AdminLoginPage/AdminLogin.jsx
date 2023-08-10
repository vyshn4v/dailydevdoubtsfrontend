import { Box, Button, Container, Stack, Typography } from "@mui/material"
import UseColors from "../../../assets/Colors"
import InputBar from "../../../components/InputBar/InputBar"
import {  useNavigate } from "react-router-dom"
import Footer from "../../../components/Footer/Footer"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginAdmin } from "../../../redux/feature/Admin/adminAuth/Auth"
import { toast } from "react-toastify"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
function AdminLogin() {
    const { buttonColor, cardBg, fontColor } = UseColors()
    const [id, setId] = useState()
    const { admin, isLoading, isError, isSuccess, } = useSelector((state) => state.admin)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(16, 'Password must not exceed 16 characters'),
    });
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });
    function onSubmit(data) {
        dispatch(loginAdmin(data))
        // dispatch(LoginUser({ email, password }))
    }
    let textField = [
        { placeholder: "Enter the email", type: "text", name: "email" },
        { placeholder: "Enter the password", type: "password", name: "password" },
    ]
    useEffect(() => {
        if (isLoading && !id) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setId(toast.loading("please wait..."))
            console.log(id);
        }
        if (isError) {
            toast.update(id, { render: "Login failed", type: "error", isLoading: false, autoClose: 2000 })
        }
        if (isSuccess) {
            toast.update(id, { render: "Login success", type: "success", isLoading: false, autoClose: 2000 })
            localStorage.setItem('admin', JSON.stringify(admin))
            navigate('/admin/dashboard')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [admin, isLoading, isError, isSuccess, navigate])
    return (
        <>
            <Stack direction='column' sx={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: "center",
                borderRadius: "10px"
            }} spacing={10}>
                {/* <Header /> */}
                <Box sx={{
                    minWidth: "350px",
                    maxWidth: "400px",
                    height: "400px",
                    backdropFilter: "blur(30px)",
                    bgcolor: cardBg,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: "center",
                    borderRadius: "10px",
                }}>
                    <Typography sx={{
                        color: fontColor,
                        fontSize: "30px"
                    }}>Admin Login</Typography>
                    <Container>
                        {
                            textField.map((field, index) =>
                                <>
                                    <InputBar register={{ ...register(field.name) }} key={index} placeholder={field.placeholder} type={field.type} name={field.name} padding={true} />
                                    <Typography sx={{ fontSize: '10px', paddingTop: "4px", color: "violet" }}>{errors?.[field.name]?.message}</Typography>
                                </>)
                        }
                    </Container>
                    <Button variant='contained' sx={{ marginTop: "10px", color: fontColor, bgcolor: buttonColor, "&:hover": { bgcolor: buttonColor } }} onClick={handleSubmit(onSubmit)} >Login</Button>
                </Box>
                <Footer />
            </Stack >
        </>
    )
}

export default AdminLogin