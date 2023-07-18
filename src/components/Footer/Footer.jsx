import { Typography } from '@mui/material'
import useColors from '../../assets/Colors'

function Footer() {
    const {fontColor } = useColors()
    return (
        <>
            <Typography component={'span'} sx={{ color: fontColor }}>
                Copyright 2023  All Right Reserved dailydevdoubts
            </Typography>
        </>
    )
}

export default Footer