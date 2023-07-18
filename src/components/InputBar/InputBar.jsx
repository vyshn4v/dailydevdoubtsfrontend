import { InputAdornment, TextField } from "@mui/material"
import useColors from "../../assets/Colors"
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useState } from "react";
// eslint-disable-next-line react/prop-types
function InputBar({ placeholder, type, readOnly, onChange, name, padding, id, size, value, register, button }) {
    const { fontColor } = useColors()
    const [visible, setVisible] = useState(false)
    const handleVisibility = () => {
        setVisible(prev => !prev)
    }
    const style = {
        minWidth: "100%",
        "& .MuiFormLabel-root": {
            color: fontColor
        },
        "& .MuiInputBase-root": {
            color: fontColor
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                color: fontColor,
                borderColor: fontColor, // Set your desired border color here
            },
            '&:hover fieldset': {
                borderColor: fontColor, // Set your desired hover border color here
            },
            '&.Mui-focused fieldset': {
                borderColor: fontColor, // Set your desired focused border color here
            },
        },

    }
    return (
        <TextField id={id} size={size || "small"} type={visible ? "text" : type}
            InputProps={type === "password" ? { readOnly: readOnly, endAdornment: <InputAdornment >{visible ? <VisibilityOutlinedIcon onClick={handleVisibility} sx={{ color: fontColor, cursor: "pointer" }} /> : <VisibilityOffOutlinedIcon sx={{ color: fontColor, cursor: "pointer" }} onClick={handleVisibility} />}</InputAdornment> } : { readOnly: readOnly, endAdornment: button && < InputAdornment > {button ?? ""}</ InputAdornment> }}
            inputProps={{ style: { textTransform: "initial" } }}
            InputLabelProps={{
                style: { color: fontColor }
            }}

            {...register}
            name={name}
            value={value}
            onChange={onChange}
            label={placeholder}
            sx={padding ? { ...style, color: "white", marginTop: "10px" } : { ...style, color: "white" }}
        />
    )
}

export default InputBar