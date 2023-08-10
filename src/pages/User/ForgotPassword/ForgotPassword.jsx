import { Box, Button, Container, Stack, Typography } from '@mui/material'
import  { useState } from 'react'
import InputBar from '../../../components/InputBar/InputBar'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../../components/Footer/Footer'
import UseColors from '../../../assets/Colors'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import AuthService from '../../../services/userAuth'
import { toast } from 'react-toastify'
function ForgotPassword() {
    const { cardBg, fontColor, buttonColor } = UseColors()
    const [phoneNumber, setPhoneNumber] = useState('')
    const navigate=useNavigate()
    function handleOtp(e) {
        console.log(e.target.value);
        setPhoneNumber(e.target.value);
    }
    function generateOtp() {
        if(phoneNumber?.toString().length!==10){
            toast.error('phone number must be 10 digit')
            return 
        }
        AuthService.generateOtp({ phone: phoneNumber }).then(() => {
            toast.success('An otp sent to your phone number')
        }).catch(() => {
            toast.error('otp not send to number')
        })
    }
    const validationSchema = Yup.object().shape({
        phone: Yup.string()
            .required('Phone is required').matches(/^\d{1,10}$/, 'Phone must be 1 to 10 digits')
            .length(10, 'phone must be exactly 10 number'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(16, 'Password must not exceed 16 characters'),
        otp: Yup.string()
            .required('Otp is required').length(6, 'Otp must be exactly 6 characters')
    });
    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });
    function onSubmit(data) {
        console.log(data);
        AuthService.changePassword(data).then(()=>{
            toast.success('password changed successfully')
            navigate('/login')
        }).catch(()=>{
            toast.error('failed to change password')
        })
    }
    let textField = [
        { placeholder: "Enter the Phone number", type: "number", name: "phone", onChange: handleOtp,button: <Button onClick={generateOtp}>GET OTP</Button>  },
        { placeholder: "Enter new password", type: "password", name: "password", onchange: "handleLogin" },
        { placeholder: "Enter the otp", type: "number", name: "otp", onchange: "handleLogin", },
    ]
    return (
        <>
            <Stack direction='column' sx={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: "center",
                borderRadius: "10px"
            }} spacing={10}>
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
                        fontSize: "20px"
                    }}>DAILYDEVDOUBTS</Typography>
                    <Typography sx={{
                        marginTop: '10px',
                        color: fontColor,
                        fontSize: "15px"
                    }}>Forgot password</Typography>
                    <Container>
                        {
                            textField.map((field, index) => <>
                                <Controller
                                    error={errors?.[field.name]}
                                    key={index}
                                    control={control}
                                    type={field.type}
                                    name={field.name}
                                    
                                    render={({ fields }) => (
                                        <InputBar padding={true} {...fields} {...field} register={{ ...register(field.name) }} />
                                    )}
                                />

                                <Typography sx={{ fontSize: '10px', paddingTop: "4px", color: "violet" }}>
                                    {errors?.[field.name]?.message}
                                </Typography>

                            </>)
                        }
                    </Container>
                    <Button variant='contained' sx={{ marginTop: "10px", color: fontColor, bgcolor: buttonColor, "&:hover": { bgcolor: buttonColor } }} onClick={handleSubmit(onSubmit)} >Change Password</Button>
                    <Typography sx={{
                        color: fontColor,
                        marginTop: "10px"
                    }}>have an account? <Link to={'/login'} style={{ textDecoration: "none", color: fontColor }}>Login</Link></Typography>
                </Box>
                <Footer />
            </Stack >
        </>
    )
}

export default ForgotPassword