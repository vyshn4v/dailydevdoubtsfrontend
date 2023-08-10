/* eslint-disable react/prop-types */
import { Button, Container, Grid, Typography } from '@mui/material'
import UseColors from '../../assets/Colors'
import { useErrorBoundary } from 'react-error-boundary'

function FallBack({ errorMessage }) {
    const{resetBoundary}=useErrorBoundary()
    const { cardBg } = UseColors()
    return (
        <Container >
            <Grid >
                <Grid >
                    < Grid item xs={3} md={2}>
                        <Typography sx={{
                            bgcolor: cardBg,
                            height: '50px',
                            borderRadius: "10px",
                            padding: "10px",
                            display: 'flex',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}>
                            {errorMessage}
                        <Button onClick={resetBoundary} sx={{marginLeft:'10px'}} variant='outlined'>Retry</Button>
                        </ Typography>
                    </Grid>
                </Grid >
            </Grid >
        </Container >
    )
}

export default FallBack