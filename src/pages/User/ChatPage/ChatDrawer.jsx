import { Button, Drawer, Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import UseColors from "../../../assets/Colors";

const ChatLayout = ({ DrawerComponet, chat, open, setOpen }) => {
    const theme = useTheme();
    const isMobileView = useMediaQuery(theme.breakpoints.down('md'));
    const { bgColor, cardBg, fontColor } = UseColors()
    return (
        <>
            <Grid item xs={12} md={4}  >
                {isMobileView ? (
                    <Drawer
                        variant="temporary"
                        anchor="left"
                        open={open}
                        sx={{
                            width: '200px',

                        }}
                        PaperProps={{
                            sx: {
                                bgcolor: bgColor,
                                width: '80%',
                            }
                        }}
                    >
                        <Grid container>
                            <Grid item xs={12} display={'flex'} sx={{ bgcolor: cardBg, padding: '10px', color: fontColor }} justifyContent={'space-between'}>
                                <Typography>
                                    Chat
                                </Typography>
                                {
                                    isMobileView &&
                                    <Button onClick={setOpen}>
                                        hello
                                    </Button>
                                }
                            </Grid>
                        </Grid>
                        {DrawerComponet}
                    </Drawer>
                ) : (
                    [DrawerComponet]
                )}
            </Grid>
            <Grid item xs={12} md={8} display={'flex'} flexDirection={'column'} justifyContent={'space-between'} >
                {chat}
            </Grid>
        </>
    );
};

export default ChatLayout;