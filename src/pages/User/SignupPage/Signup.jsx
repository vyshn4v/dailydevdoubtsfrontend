import { Box, Button, Container, Stack, Typography } from '@mui/material'
import useColors from '../../../assets/Colors'
import InputBar from '../../../components/InputBar/InputBar'
import Footer from '../../../components/Footer/Footer'
import { useGoogleLogin } from '@react-oauth/google'
import GoogleIcon from '@mui/icons-material/Google';
import { useEffect, useState } from 'react'
import { SignupUser, SignupWithGoogle } from '../../../redux/feature/User/userAuth/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
function Signup() {
    const { buttonColor, cardBg, fontColor } = useColors()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [id, setId] = useState(0)
    const { user, isLoading, isError, isSuccess, errorMessage } = useSelector((state) => state.user)
    const validationSchema = Yup.object().shape({

        name: Yup.string()
            .required('Username is required')
            .min(6, 'Username must be at least 6 characters'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        phone: Yup.string().required('Phone is required').length(10, '10 digit required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
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
        dispatch(SignupUser(data))
    }


    useEffect(() => {
        if (isLoading && id >= 0) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setId(toast.loading("please wait..."))
        }
        if (isError) {
            if (errorMessage) {
                toast.update(id, { render: errorMessage, type: "error", isLoading: false, autoClose: 2000 })
            } else {
                toast.update(id, { render: "Signup failed", type: "error", isLoading: false, autoClose: 2000 })
            }
        }
        if (isSuccess) {
            if (user.isSignupWithGoogle) {
                toast.update(id, { render: "Signup completed", type: "success", isLoading: false, autoClose: 2000 })
            } else {
                toast.update(id, { render: "Signup completed please verify", type: "success", isLoading: false, autoClose: 2000 })
            }
            localStorage.setItem('user', JSON.stringify(user))
            navigate("/verify-otp")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, isLoading, isError, isSuccess, navigate])
    let textField = [
        { placeholder: "Enter the name", type: "text", name: "name" },
        { placeholder: "Enter the email", type: "text", name: "email" },
        { placeholder: "Enter the phone number", type: "number", name: "phone" },
        { placeholder: "Enter the password", type: "password", name: "password" },
        { placeholder: "Confirm password", type: "password", name: "confirmPassword" }
    ]

    const login = useGoogleLogin({
        onSuccess: data => {
            dispatch(SignupWithGoogle(data.access_token))
        },
        onError: () => {
            console.log('Login Failed');
        },
    })

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
                    backdropFilter: "blur(30px)",
                    padding: '10px',
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
                    }}>Signup</Typography>
                    <Container>
                        {
                            textField?.map((field, index) => <>
                                <InputBar register={{ ...register(field.name) }} key={index} placeholder={field.placeholder} type={field.type} name={field.name} padding={true} />
                                <Typography sx={{ fontSize: '10px', paddingTop: "4px", color: "violet" }}>{errors?.[field.name]?.message}</Typography>
                            </>)
                        }
                    </Container>
                    <Button variant='contained' sx={{ marginTop: "10px", color: fontColor, bgcolor: buttonColor, "&:hover": { bgcolor: buttonColor } }} onClick={handleSubmit(onSubmit)} >Signup</Button>
                    <Typography sx={{
                        color: fontColor,
                        marginTop: "20px"
                    }}>Already have an account? <Link to={'/login'} style={{ textDecoration: "none", color: fontColor }}>Login</Link></Typography>
                </Box>

                <Button variant='text' sx={{
                    minWidth: "100%",
                    height: "40px",
                    bgcolor: cardBg,
                    "&:hover": {
                        bgcolor: cardBg,
                    },
                    color: fontColor,
                }}
                    startIcon={<GoogleIcon />}
                    onClick={() => login()}
                >
                    Signup with Google
                </Button>
                <Footer />
            </Stack>
        </>
    )
}

export default Signup