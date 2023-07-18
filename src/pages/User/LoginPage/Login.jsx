import { Box, Button, Container, Stack, Typography } from '@mui/material'
import useColors from '../../../assets/Colors'
import InputBar from '../../../components/InputBar/InputBar'
import Footer from '../../../components/Footer/Footer'
import { useGoogleLogin } from '@react-oauth/google';
import GoogleIcon from '@mui/icons-material/Google';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginUser, LoginWithGoogle } from '../../../redux/feature/User/userAuth/Auth';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
function Login() {
    const { buttonColor, cardBg, fontColor } = useColors()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [id, setId] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, isLoading, isError, isSuccess, errorMessage } = useSelector(state => state.user)
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
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });


    function handleLogin(e) {
        if (e.target.name === 'email') {
            setEmail(e.target.value)
        }
        if (e.target.name === 'password') {
            setPassword(e.target.value)
        }
    }
    useEffect(() => {
        if (isLoading) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setId(toast.loading("please wait..."))
        }
        if (isError) {
            if (errorMessage) {
                toast.update(id, { render: errorMessage, type: "error", isLoading: false, autoClose: 2000 })
            } else {
                toast.update(id, { render: "Login failed", type: "error", isLoading: false, autoClose: 2000 })
            }
        }
        if (isSuccess) {
            toast.update(id, { render: "Login success", type: "success", isLoading: false, autoClose: 2000 })
            localStorage.setItem('user', JSON.stringify(user))
            navigate('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, isLoading, isError, isSuccess, navigate])
    function onSubmit(data) {
        console.log(data);
        dispatch(LoginUser(data))
    }
    let textField = [
        { placeholder: "Enter the email", type: "text", name: "email", onchange: handleLogin, },
        { placeholder: "Enter the password", type: "password", name: "password", onchange: handleLogin },
    ]
    const login = useGoogleLogin({
        onSuccess: (data) => {
            console.log(data);
            dispatch(LoginWithGoogle(data.access_token))
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
                    }}>Login</Typography>
                    <Container>
                        {
                            textField.map((field, index) => <>
                                <InputBar error={errors?.[field.name]}
                                    register={{ ...register(field.name) }}
                                    key={index}
                                    placeholder={field.placeholder}
                                    type={field.type}
                                    onChange={field.onchange}
                                    name={field.name}
                                    padding={true} />
                                <Typography sx={{ fontSize: '10px', paddingTop: "4px", color: "violet" }}>
                                    {errors?.[field.name]?.message}
                                </Typography>

                            </>)
                        }
                    </Container>
                    <Button variant='contained' sx={{ marginTop: "10px", color: fontColor, bgcolor: buttonColor, "&:hover": { bgcolor: buttonColor } }} onClick={handleSubmit(onSubmit)} >Login</Button>
                    <Typography sx={{
                        color: fontColor,
                        marginTop: "20px"
                    }}>Don't have an account? <Link to={'/signup'} style={{ textDecoration: "none", color: fontColor }}>Signup</Link></Typography>
                </Box>
                <Button variant='text' sx={{
                    minWidth: "100%",
                    height: "40px",
                    bgcolor: buttonColor,
                    "&:hover": {
                        bgcolor: buttonColor,
                    },
                    color: fontColor,

                }}
                    startIcon={<GoogleIcon />}
                    onClick={() => login()}
                >
                    Login with Google
                </Button>
                <Footer />
            </Stack >
        </>
    )
}

export default Login