'use client'

import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

const StyledBox = styled(Box)(({ theme, color }) => ({
  flexGrow: 1,
  backgroundColor: color,
  minHeight: '75px',
  display: 'flex',
  color: 'white',
  borderRadius: 7,
  padding: 10,
  boxShadow: theme.shadows[3],
}))

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  [theme.breakpoints.up('md')]: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  [theme.breakpoints.up('lg')]: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}))

const TitleWrapper = styled(Grid)(({ theme }) => ({
  marginLeft: 10,
}))

const StyledFavoriteIcon = styled(FavoriteBorderIcon)({
  color: 'white',
  height: '55px',
})

const StyledCloseIcon = styled(CloseIcon)({
  color: 'white',
  height: '15px',
})

export default function Alert({ AlertTitle, AlertBody, creator, time, color }) {
  return (
    <StyledBox color={color}>
      <Grid container direction="row">
        <TitleWrapper item xs={10}>
          <Typography variant="overline">
            {`${AlertTitle} - ${AlertBody}`}
          </Typography>
        </TitleWrapper>
        <Grid item xs={1}>
          <StyledCloseIcon />
        </Grid>

        <Grid
          item
          alignItems="center"
          container
          direction="row"
          xs={12}
        >
          <Grid item xs={3}>
            <StyledAvatar alt={creator.name} src={creator.profileImageUrl} />
          </Grid>
          <Grid
            container
            direction="column"
            alignItems="center"
            item
            xs={8}
          >
            <Grid item>
              <Typography variant="subtitle2">
                {creator.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="overline">
                {time}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <StyledFavoriteIcon />
          </Grid>
        </Grid>
      </Grid>
    </StyledBox>
  )
}

Alert.propTypes = {
  AlertTitle: PropTypes.string.isRequired,
  creator: PropTypes.object.isRequired,
  time: PropTypes.string.isRequired,
  AlertBody: PropTypes.string.isRequired,
  color: PropTypes.string,
}

Alert.defaultProps = {
  color: '#1976d2',
} 