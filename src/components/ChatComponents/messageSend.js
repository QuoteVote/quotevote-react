import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import FaceIcon from '@material-ui/icons/Face'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}))

export default function InputWithIcon() {
  const classes = useStyles()

  return (
    <div>
      <FormControl className={classes.margin} />
      <Card>
        <div className={classes.margin}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid style={{ paddingBottom: '20px' }}>
              <FaceIcon style={{ backgroundColor: '#E91E63', width: '25px' }} />
            </Grid>

            <Grid item>
              <TextField id="input-with-icon-grid" label="type here and submit" />
            </Grid>
            <Button style={{ backgroundColor: '#E91E63', color: 'white' }}>SEND</Button>
          </Grid>
        </div>
      </Card>
    </div>
  )
}
