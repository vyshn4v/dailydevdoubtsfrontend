import { Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

function Details() {
  const profile = useSelector(state => state.profile.profile)
  return (
    <>
    <Grid xs={12}>
      <Typography>
        Name: {profile?.name}
      </Typography>
      <Typography>
        Email: {profile?.email}
      </Typography>
      <Typography>
        Phone: {profile?.phone??"Not available"}
      </Typography>
      <Typography>
        Reputation: {profile?.reputation}
      </Typography>
      <Typography>
        Question : {profile?.questions?.length}
      </Typography>
      <Typography>
        Answer : {profile?.answers?.length}
      </Typography>
    </Grid>
    </>
  )
}

export default Details