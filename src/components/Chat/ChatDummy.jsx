import { Grid, List, ListItem, ListItemText } from '@mui/material'
import React from 'react'

function ChatDummy() {
    return (
        <>
            <List >
                <ListItem key="1" sx={{height:'100%',width:'100%'}}>
                    <Grid container >
                        <Grid item xs={12} >
                            <ListItemText  align="center" primary="Please select a chat" ></ListItemText>
                        </Grid>
                    </Grid>
                </ListItem>
            </List>
        </>
    )
}

export default ChatDummy