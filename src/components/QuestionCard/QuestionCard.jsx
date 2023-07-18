import useColors from "../../assets/Colors"
import Typography from '@mui/material/Typography';
import { Avatar, Grid, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function QuestionCard({ data }) {
  const { _id, votes, answers, views, title, body, tags, user } = data
  const { cardBg, fontColor } = useColors()

  return (
    <Grid container spacing={2} sx={{ minWidth: "100%", bgcolor: cardBg, color: fontColor, padding: "10px", marginBottom: "20px", borderRadius: "10px" }}>
      <Grid item sm={12} md={2}>
        <Grid container sx={{ minWidth: "100%", minHeight: '100%' }}>
          <Grid item lg={12} >
            <Typography sx={{ fontSize: '15px', padding: "5px", marginRight: '10px' }} component="div" >
              {votes} Votes
            </Typography>
          </Grid>
          <Grid item lg={12} >
            <Typography sx={{ fontSize: '15px', padding: "5px", marginRight: '10px' }} component="div" >
              {answers} Answers
            </Typography>
          </Grid>
          <Grid item lg={12} >
            <Typography sx={{ fontSize: '15px', padding: "5px", marginRight: '10px' }} component="div" >
              {views} Views
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid md={10} sm={12} item sx={{ display: 'flex', flexDirection: 'column' }}>
        <Link to={"/question/" + _id} style={{ textDecoration: "none", color:fontColor }}>
          <Typography component="div" variant="h5">
            {title}
          </Typography>
        </Link>
        <Grid container>
          <Grid sm={9} md={6} item sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Grid container>
              {tags?.map((data, index) => (
                <Grid key={index} item sm={4} sx={{}}>
                  <Link>
                    <Typography sx={{ bgcolor: cardBg, color: fontColor, maxWidth: "100px", padding: "2px 10px ", display: 'flex', alignItems: "center", justifyContent: "center", marginRight: "10px", marginTop: "10px", borderRadius: "5px" }} variant="subtitle2" component="div">
                      {data}
                    </Typography>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid sm={3} md={6} item sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', marginTop: "10px" }}>
            <Stack>
              <Avatar src={user?.profile_image} />
              <Typography>{user?.name}</Typography>
            </Stack>
            <Stack sx={{
              marginLeft: "10px"
            }}>
              <Typography>{user?.asked}</Typography>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}