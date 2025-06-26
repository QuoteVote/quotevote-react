import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton, Typography } from '@material-ui/core'
import PauseIcon from '@material-ui/icons/Pause'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import LivePostStream from '../../components/Post/LivePostStream'

const useStyles = makeStyles(() => ({
  root: {
    padding: 16,
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 8,
  },
}))

function SearchView() {
  const classes = useStyles()
  const [paused, setPaused] = useState(false)

  const togglePause = () => {
    setPaused((p) => !p)
  }

  return (
    <div className={classes.root}>
      <div className={classes.controls}>
        <IconButton onClick={togglePause} aria-label="pause-resume">
          {paused ? <PlayArrowIcon /> : <PauseIcon />}
        </IconButton>
        <Typography variant="body2">{paused ? 'Stream paused' : 'Live stream'}</Typography>
      </div>
      <LivePostStream paused={paused} />
    </div>
  )
}

export default SearchView
