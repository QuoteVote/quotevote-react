import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import FaceIcon from '@material-ui/icons/Face'
import Button from '@material-ui/core/Button'
import { useMutation } from '@apollo/react-hooks'
import { useDispatch, useSelector } from 'react-redux'
import { CHAT_SUBMITTING } from 'store/chat'
import SweetAlert from 'react-bootstrap-sweetalert'
import { SEND_MESSAGE } from '../../graphql/mutations'
import { GET_ROOM_MESSAGES } from '../../graphql/query'

const useStyles = makeStyles(() => ({
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

// eslint-disable-next-line react/prop-types
export default function MessageSend({ messageRoomId, type, title }) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [text, setText] = React.useState('')
  const submitting = useSelector((state) => state.chat.submitting)
  const user = useSelector((state) => state.user.data)
  const { error, setError } = React.useState('')

  const [createMessage] = useMutation(SEND_MESSAGE, {
    onCompleted: () => {
      dispatch(CHAT_SUBMITTING(true))
    },
    onError: (err) => {
      setError(err)
    },
  })

  const handleSubmit = async () => {
    dispatch(CHAT_SUBMITTING(true))

    const message = {
      title,
      type,
      messageRoomId,
      text,
    }
    setText('')
    const dateSubmitted = new Date()
    await createMessage({
      variables: { message },
      optimisticResponse: {
        __typename: 'Mutation',
        createMessage: {
          __typename: 'Message',
          _id: dateSubmitted, // dummy
          messageRoomId,
          userName: user.name,
          userId: user._id,
          title,
          text,
          type,
          created: dateSubmitted,
        },
      },
      // eslint-disable-next-line no-shadow
      update: (proxy, { data: { createMessage } }) => {
        // Read the data from our cache for this query.
        const data = proxy.readQuery({ query: GET_ROOM_MESSAGES, variables: { messageRoomId } })
        if (data) {
          // Write our data back to the cache with the new message in it
          proxy.writeQuery({
            query: GET_ROOM_MESSAGES,
            variables: { messageRoomId },
            data: {
              ...data,
              messages: [...data.messages, createMessage],
            },
          })
        }
      },
    })
  }

  return (
    <div className={classes.root}>
      {error && (
        <SweetAlert
          style={{ display: 'block', marginTop: '-100px' }}
          title="Message Send Error"
          onConfirm={() => setError(null)}
          onCancel={() => setError(null)}
          confirmBtnCssClass={`${classes.button} ${classes.success}`}
        />
      )}
      <Grid container className={classes.gridContainer}>
        <Grid className={classes.content}>
          <FaceIcon className={classes.fadeIcon} />
        </Grid>
        <Grid item className={classes.content}>
          <TextField
            multiline
            rows={2}
            id="input-with-icon-grid"
            placeholder="type here"
            value={text}
            onChange={(event) => {
              const { value } = event.target
              setText(value)
              dispatch(CHAT_SUBMITTING(false))
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
