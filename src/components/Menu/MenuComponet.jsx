/* eslint-disable react/prop-types */
import { IconButton, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import UseColors from '../../assets/Colors';
import { useNavigate } from 'react-router-dom';
function MenuComponent({ user, answer }) {
    const [anchorEl2, setAnchorEl2] = useState(null);
    const bool = Boolean(anchorEl2)
    const { fontColor } = UseColors()
    const navigate = useNavigate()
    const handleAnswerMenu = (event) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleAnswerClose = () => {
        setAnchorEl2(null);
    };
    const handleEditAnswer = () => {
        setAnchorEl2(null);
        navigate('edit-answer/' + answer._id, { state: { answer } })
    };
    const handleSuggestAnEdit = () => {
        setAnchorEl2(null);
        navigate('suggest-an-edit/' + answer._id,{ state: { answer }})
    };
    return (
        <IconButton aria-label="settings">
            <MoreVertIcon sx={{ color: fontColor }} onClick={handleAnswerMenu} />
            <Menu
                id={`basic-menu`}
                anchorEl={anchorEl2}
                open={bool}
                onClose={handleAnswerClose}
                MenuListProps={{

                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleEditAnswer} disabled={!(user?._id === answer?.user[0]?._id)}>Edit answer</MenuItem>
                <MenuItem onClick={handleSuggestAnEdit} disabled={!(user?._id !== answer?.user[0]?._id)}>Suggest an edit</MenuItem>
            </Menu>
        </IconButton>
    )
}

export default MenuComponent