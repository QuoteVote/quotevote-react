import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import CardHeader from '../../mui-pro/Card/CardHeader'
import CardBody from '../../mui-pro/Card/CardBody'
import Card from '../../mui-pro/Card/Card'

import 'fontsource-montserrat'

const useStyles = makeStyles(() => ({
  title: {
    fontFamily: 'Montserrat',
    fontWeight: 700,
  },
  cardBottomSheet: {
    display: 'flex',
  },
  percent: {
    flexGrow: 1,
  },
  subPercentText: {
    fontFamily: 'Montserrat',
    fontWeight: 500,
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    minWidth: 100,
  },
  select: {
    marginRight: 20,
  },
}))

const PopPercent = ({ prediction }) => {
  let percent = ''
  if (prediction > 0 && prediction <= 5) {
    percent = ` ${prediction * 20}%`
  } else if (prediction === 0) {
    percent = ' --%'
  }
  return `${percent}`
}

// eslint-disable-next-line
const CardBottomSheet = ({
  handleTypeChange = () => {},
  prediction,
  handlePredict,
  disabled,
}) => {
  const [type, setType] = useState('sentiment')
  const classes = useStyles()
  return (
    <div className={classes.cardBottomSheet}>
      <div className={classes.percent}>
        <Typography variant="h3" color="primary" title="prediction">
          <PopPercent prediction={prediction} />
        </Typography>
        <Typography variant="body2" color="primary">
          Very Agreeable
        </Typography>
      </div>
      <div className={classes.buttonContainer}>
        <Select
          className={classes.select}
          value={type}
          onChange={(event) => {
            setType(event.target.value)
            handleTypeChange(event.target.value)
          }}
          disabled={disabled}
        >
          <MenuItem value="sentiment">Sentiment</MenuItem>
          <MenuItem value="truth">Truth</MenuItem>
          <MenuItem value="appreciation">Appreciation</MenuItem>
        </Select>
        <Button
          className={classes.button}
          size="medium"
          color="primary"
          variant="contained"
          disabled={disabled}
          onClick={handlePredict}
        >
          <Typography variant="body1" color="secondary" title="pop-button">
            POP
          </Typography>
        </Button>
      </div>
    </div>
  )
}

CardBottomSheet.propTypes = {
  handleTypeChange: PropTypes.func,
  prediction: PropTypes.number,
  handlePredict: PropTypes.func,
  disabled: PropTypes.bool,
}

const PopPrediction = ({
  handlePredict, prediction, disabled, ...props
}) => {
  const classes = useStyles()
  const [text, setText] = useState('')

  const handleTextInputChange = (event) => setText(event.target.value)

  return (
    <Card>
      <CardHeader>
        <Typography className={classes.title} variant="h6" color="primary">
          Pop Prediction
        </Typography>
      </CardHeader>
      <CardBody>
        <Grid container direction="column" spacing={5}>
          <Grid item>
            <TextField
              placeholder="input text to submit predict truth or sentiment"
              onChange={handleTextInputChange}
              fullWidth
              multiline
              rows={4}
              disabled={disabled}
              {...props}
            />
          </Grid>
          <Grid item>
            <CardBottomSheet
              prediction={prediction}
              disabled={disabled || !text}
              handlePredict={() => handlePredict(text)}
            />
          </Grid>
        </Grid>
      </CardBody>
    </Card>
  )
}

PopPrediction.propTypes = {
  prediction: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  handlePredict: PropTypes.func,
  disabled: PropTypes.bool,
}

PopPrediction.defaultProps = {
  prediction: 1,
  handlePredict: () => {},
}

export default PopPrediction
