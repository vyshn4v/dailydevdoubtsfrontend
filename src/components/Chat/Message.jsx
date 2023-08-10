/* eslint-disable react/prop-types */
import { Avatar, Box, Paper, Tooltip, Typography } from '@mui/material';

const DefaultChatMsg = ({ message, side }) => {

    return (
        <Box
            sx={{
                width: '100%',
                display: "flex",
                justifyContent: side ? "flex-start" : "flex-end",
                mb: 2,
            }}
        >
            {side && <Tooltip title={message?.user?.name}> <Avatar src={message?.user?.profile_image} /></Tooltip>}
            <Paper
                variant="outlined"
                sx={{
                    ml: '10px',
                    mr: '10px',
                    p: 2,
                    backgroundColor: side ? "primary.light" : "secondary.light",
                    borderRadius: side ? "20px 20px 20px 5px" : "20px 20px 5px 20px",
                }}
            >
                <Typography variant="body1">{message?.message}</Typography>
            </Paper>
            {side ??<Tooltip title={message?.user?.name}> <Avatar src={message?.user?.profile_image} /></Tooltip>}
        </Box>
    );
};

export default DefaultChatMsg