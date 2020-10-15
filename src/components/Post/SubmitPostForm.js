import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import {
  CircularProgress,
  Divider, FormControl, Grid, InputBase, Typography,
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import { useDispatch } from 'react-redux'
import CardBody from '../../mui-pro/Card/CardBody'
import Card from '../../mui-pro/Card/Card'
import Button from '../../mui-pro/CustomButtons/Button'
import SubmitPostAlert from './SubmitPostAlert'
import { SET_SELECTED_POST } from '../../store/ui'
import { CREATE_GROUP, SUBMIT_POST } from '../../graphql/mutations'

const useStyles = makeStyles({
  title: {
    fontSize: '25px',
    font: 'League Spartan',
    fontWeight: 'bold',
  },
  text: {
    marginTop: 20,
    fontSize: '20px',
  },
  group: {
    fontSize: '20px',
  },
  button: {
    backgroundColor: '#00CF6E',
  },
})

const filter = createFilterOptions()

function SubmitPostForm({ options = [], user }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {
    register, handleSubmit, errors, reset,
  } = useForm()
  const [submitPost, { loading }] = useMutation(SUBMIT_POST)
  const [createGroup, { loading: loadingGroup }] = useMutation(CREATE_GROUP)
  const [selectedGroup, setSelectedGroup] = React.useState(null)
  const [privacy, setPrivacy] = React.useState('public')
  const [isNewGroup, setIsNewGroup] = React.useState(false)
  const [error, setError] = React.useState(null)
  const handleVisibilityChange = (event) => {
    setPrivacy(event.target.value)
  }
  const onSubmit = async (values) => {
    const { title, text, group } = values
    try {
      let newGroup
      if (isNewGroup) {
        newGroup = await createGroup({
          variables: {
            group: {
              creatorId: user._id,
              title: group,
              description: `Description for: ${group} group`,
              privacy,
            },
          },
        })
      }
      const postGroupId = isNewGroup ? newGroup.data.createGroup._id : selectedGroup._id
      const submitResult = await submitPost({
        variables: {
          post: {
            userId: user._id,
            text,
            title,
            groupId: postGroupId,
          },
        },
      })
      const { _id, url } = submitResult.data.addPost
      dispatch(SET_SELECTED_POST(_id))
      setShareableLink(url)
      setShowAlert(true)
    } catch (err) {
      setError(err)
      setShowAlert(true)
    }
  }

  const [shareableLink, setShareableLink] = React.useState('')
  const [showAlert, setShowAlert] = React.useState(false)
  const hideAlert = () => {
    setShowAlert(false)
    setShareableLink('')
    setIsNewGroup(false)
    setSelectedGroup(null)
    reset()
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {showAlert && (
        <SubmitPostAlert
          hideAlert={hideAlert}
          shareableLink={shareableLink}
          error={error}
        />
      )}
      <Card>
        <CardBody>
          <InputBase
            fullWidth
            id="title"
            className={classes.title}
            placeholder="Enter Title Here"
            name="title"
            inputRef={register({
              required: 'Title is required',
            })}
            required
            error={errors.title}
            helperText={errors.title && errors.title.message}
          />
          <Divider />
          <InputBase
            id="text"
            placeholder="Input text to submit post"
            className={classes.text}
            multiline
            fullWidth
            name="text"
            inputRef={register({
              required: 'Post is required',
            })}
            required
            error={errors.text}
          />
          <Divider />

          <Autocomplete
            value={selectedGroup}
            onChange={(event, newValue) => {
              if (typeof newValue === 'string') {
                setSelectedGroup({
                  title: newValue,
                })
              } else if (newValue && newValue.inputValue) {
                // Create a new value from the user input
                setSelectedGroup({
                  title: newValue.inputValue,
                })
              } else {
                setSelectedGroup(newValue)
              }

              if (newValue) {
                const checkGroup = (groupOption) => groupOption.title === newValue.title
                const hidePrivacyOption = options.some(checkGroup)
                setIsNewGroup(!hidePrivacyOption)
              }
            }}
            filterOptions={(groupOptions, params) => {
              const filtered = filter(groupOptions, params)

              // Suggest the creation of a new value
              if (params.inputValue !== '') {
                filtered.push({
                  inputValue: params.inputValue,
                  title: `Add "${params.inputValue}"`,
                })
                setIsNewGroup(true)
              } else {
                setIsNewGroup(false)
              }

              return filtered
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="group"
            options={options}
            getOptionLabel={(option) => {
              // Value selected with enter, right from the input
              if (typeof option === 'string') {
                return option
              }
              // Add "xxx" option created dynamically
              if (option.inputValue) {
                return option.inputValue
              }
              // Regular option
              return option.title
            }}
            renderOption={(option) => option.title}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select a group"
                name="group"
                id="group"
                inputRef={register({
                  required: 'Group is required',
                })}
              />
            )}
            fullWidth
          />

          <Typography>
            You can create private or public groups of people to shared your information.
          </Typography>

          {isNewGroup && (
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Group"
                name="groupVisibility"
                value={privacy}
                onChange={handleVisibilityChange}
              >
                <FormControlLabel value="public" control={<Radio />} label="Public" />
                <FormControlLabel value="private" control={<Radio />} label="Private" />
              </RadioGroup>
            </FormControl>
          )}

          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-end"
          >
            <Button
              id="submit-button"
              type="submit"
              variant="contained"
              size="large"
              className={classes.button}
              disabled={loadingGroup || loading}
            >
              Submit
              {(loading || loadingGroup) && <CircularProgress size={20} style={{ marginLeft: 5 }} />}

            </Button>
          </Grid>

        </CardBody>
      </Card>
    </form>
  )
}
SubmitPostForm.propTypes = {
  options: PropTypes.object,
  user: PropTypes.object,
}

export default SubmitPostForm
