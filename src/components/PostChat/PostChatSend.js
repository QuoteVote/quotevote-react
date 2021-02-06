import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { CHAT_SUBMITTING } from 'store/chat'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Grid, InputBase } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import SendIcon from 'assets/svg/SendIcon.svg'
import { SEND_MESSAGE } from '../../graphql/mutations'
import { GET_ROOM_MESSAGES } from '../../graphql/query'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    padding: 10,
  },
  chat: {
    width: 59,
    height: 30,
    fontSize: 24,
    lineHeight: 1.25,
    letterSpacing: 0.25,
    fontFamily: 'Montserrat',
  },
  input: {
    borderRadius: 6,
    background: '#ffffff',
    width: 400,
    height: 39,
    paddingLeft: 10,
  },
}))

function PostChatSend(props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { messageRoomId, title } = props
  const type = 'POST'
  const [text, setText] = useState()
  const [error, setError] = useState(null)
  const user = useSelector((state) => state.user.data)
  const [createMessage, { loading }] = useMutation(SEND_MESSAGE, {
    onError: (err) => {
      setError(err)
      console.log(err)
    },
    refetchQueries: [{
      query: GET_ROOM_MESSAGES,
      variables: {
        messageRoomId,
      },
    }],
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
          user: {
            __typename: 'User',
            name: user.name,
            username: user.username,
            avatar: user.avatar,
          },
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
    <Grid
      item
      direction="row"
      justify="space-between"
      alignItems="center"
      className={classes.root}
      style={{ width: '100%' }}
    >
      <Grid item md={2} xs={2}>
        <Typography className={classes.chat}>Chat</Typography>
      </Grid>
      <Grid item md={10} xs={10}>
        <Paper>
          <InputBase
            placeholder="type a message..."
            className={classes.input}
            onChange={(event) => {
              const { value } = event.target
              setText(value)
            }}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleSubmit()
              }
            }}
          />
          <IconButton
            onClick={(event) => {
              handleSubmit()
            }}
          >
            <img src={SendIcon} alt="send"></img>
          </IconButton>
        </Paper>
      </Grid>
    </Grid>
  )
}

PostChatSend.propTypes = {
  messageRoomId: PropTypes.string,
}

export default PostChatSend
