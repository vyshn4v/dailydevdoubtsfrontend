import useColors from "../../assets/Colors"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar, Stack } from "@mui/material";

export default function QuestionCardSkeleton() {
    const { cardBg, fontColor } = useColors()

    return (
        <Card sx={{ display: 'flex', height: '150px', minWidth: "100%", bgcolor: cardBg, color: fontColor }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography variant="subtitle1" component="div" >
                            0 Votes
                        </Typography>
                        <Typography variant="subtitle1" component="div" >
                            0 Answers
                        </Typography>
                        <Typography variant="subtitle1" component="div" >
                            6 Views
                        </Typography>
                    </CardContent>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            React Material UI createTheme_default is not a function
                        </Typography>
                        <Box sx={{ display: 'flex' }}>
                            <Typography sx={{ bgcolor: cardBg, color: fontColor, maxWidth: "100px", padding: "2px 10px ", display: 'flex', alignItems: "center", justifyContent: "center", marginRight: "10px" }} variant="subtitle2" component="div">
                                Mac Miller
                            </Typography>
                            <Typography sx={{ bgcolor: cardBg, color: fontColor, maxWidth: "100px", padding: "2px 10px ", display: 'flex', alignItems: "center", justifyContent: "center", marginRight: "10px" }} variant="subtitle2" component="div">
                                Mac Miller
                            </Typography>
                            <Typography sx={{ bgcolor: cardBg, color: fontColor, maxWidth: "100px", padding: "2px 10px ", display: 'flex', alignItems: "center", justifyContent: "center", marginRight: "10px" }} variant="subtitle2" component="div">
                                Mac Miller
                            </Typography>
                            <Typography sx={{ bgcolor: cardBg, color: fontColor, maxWidth: "100px", padding: "2px 10px ", display: 'flex', alignItems: "center", justifyContent: "center", marginRight: "10px" }} variant="subtitle2" component="div">
                                Mac Miller
                            </Typography>
                        </Box>
                    </CardContent>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: "flex-end", justifyContent: "space-between", height: '100%', marginRight: '30px', marginBottom: "30px", }}>
                    <Stack>
                        <Avatar />
                        <Typography>Name</Typography>
                    </Stack>
                    <Stack sx={{
                        marginLeft: "10px"
                    }}>
                        <Typography>24 Mins ago</Typography>
                    </Stack>
                </Box>
            </Box>
        </Card>
    );
}