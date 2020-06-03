import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import FaceIcon from '@material-ui/icons/Face'
import Button from '@material-ui/core/Button'
import { useMutation } from '@apollo/react-hooks'
import { useDispatch, useSelector } from 'react-redux'
import { CHAT_SUBMITTING } from 'store/actions/types'
import { SEND_MESSAGE } from '../../graphql/mutations'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: 'white',
    maxWidth: 360,
    width: '300px',
    backgroundColor: 'white',
  },
  gridContainer: {
    backgroundColor: 'white',
  },
  content: {
    paddingBottom: '20px',
  },
  fadeIcon: {
    backgroundColor: '#E91E63',
    width: '25px',
    padding: '5px',
    margin: '5px',
  },
  sendButton: {
    backgroundColor: '#E91E63',
    color: 'white',
    margin: '2px',
  },
}))

export default function InputWithIcon({ messageRoomId, type, title }) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { submitting, text } = useSelector((state) => state.chatReducer)

  const [createMessage] = useMutation(SEND_MESSAGE, {
    onCompleted: (data) => {
      dispatch({
        type: CHAT_SUBMITTING,
        payload: {
          submitting: true,
          text: '',
        },
      })
    },
    onError: (error) => {
      console.log('ERROR', error)
    },
  })

  const handleSubmit = async () => {
    dispatch({
      type: CHAT_SUBMITTING,
      payload: {
        submitting: true,
        text,
      },
    })
    const message = {
      title,
      type,
      messageRoomId,
      text,
    }
    await createMessage({
      variables: { message },
    })
  }

  return (
    <div className={classes.root}>
      <Grid container className={classes.gridContainer}>
        <Grid className={classes.content}>
          <FaceIcon className={classes.fadeIcon} />
        </Grid>
        <Grid item className={classes.content}>
          <TextField
            id="input-with-icon-grid"
            label="type here"
            value={text}
            onChange={(event) => {
              const { value } = event.target
              dispatch({
                type: CHAT_SUBMITTING,
                payload: {
                  submitting: false,
                  text: value,
                },
              })
            }}
          />
        </Grid>
        <Grid item>
          <Button
            disabled={submitting}
            className={classes.sendButton}
            onClick={handleSubmit}
          >
            SEND
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}
