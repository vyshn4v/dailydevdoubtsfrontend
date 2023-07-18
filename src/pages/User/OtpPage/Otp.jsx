import { useState } from "react";
import OTPInput from "react-otp-input";
import useColors from "../../../assets/Colors";
import { Button, Stack, Typography } from "@mui/material";
import { verifyUserOtp } from "../../../services/userAuth";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { changeStatus } from "../../../redux/feature/User/userAuth/Auth";
import { useNavigate } from "react-router-dom";

function Otp() {
    const {bgColor,cardBg,fontColor } = useColors()
    const [otp, setOtp] = useState('');
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    function handleOtpSubmit() {
        const id = toast.loading("Otp is verifying...")
        verifyUserOtp(user.token, otp).then((response) => {
            if (response.data.status) {
                toast.update(id, { render: "Otp verified successfully", type: "success", isLoading: false, autoClose: 2000 })
                dispatch(changeStatus())
                navigate('/')
            } else {
                toast.update(id, { render: "Failed to verify Otp", type: "error", isLoading: false, autoClose: 2000 })
            }
        }).catch(() => {
            toast.update(id, { render: "Failed to verify Otp", type: "error", isLoading: false, autoClose: 3000 })
        })
    }
    return (
        <>
            <Stack gap={10} sx={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                <Typography sx={{
                    color: fontColor,
                    fontSize: "30px"
                }}>
                    OTP</Typography>
                <Typography sx={{
                    color: fontColor,
                    fontSize: "20px"
                }}>
                    an otp will sent to your phone</Typography>
                <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    containerStyle={{ display: 'flex', justifyContent: 'center', backgroundColor: bgColor, gap: 10 }}
                    inputStyle={{ width: "50px", height: "50px" }}
                    renderInput={(props) => <input {...props} />}
                />
                <Button variant='text' sx={{
                    minWidth: "100%",
                    height: "40px",
                    bgcolor: cardBg,
                    "&:hover": {
                        bgcolor: cardBg,
                    },
                    color: fontColor,
                }}
                    onClick={handleOtpSubmit}
                >
                    Submit
                </Button>

            </Stack >
        </>
    )
}

export default Otp