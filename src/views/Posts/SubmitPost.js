/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import {
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Divider,
  InputBase,
  Typography,
  IconButton,
  Tooltip,
  Radio,
  RadioGroup,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'

// Material Icons
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import AssignmentIcon from '@material-ui/icons/Assignment'

import GridItem from 'mui-pro/Grid/GridItem'
import Card from 'mui-pro/Card/Card'
import CardHeader from 'mui-pro/Card/CardHeader'
import CardBody from 'mui-pro/Card/CardBody'
import Button from 'mui-pro/CustomButtons/Button'
import LoadingSpinner from 'components/LoadingSpinner'
import styles from 'assets/jss/material-dashboard-pro-react/views/sweetAlertStyle'

import GridContainer from 'mui-pro/Grid/GridContainer'

import SweetAlert from 'react-bootstrap-sweetalert'
import * as copy from 'clipboard-copy'
import { isEmpty } from 'lodash'

import { useQuery, useMutation } from '@apollo/react-hooks'
import { CREATE_GROUP, SUBMIT_POST } from 'graphql/mutations'
import { GROUPS_QUERY } from 'graphql/query'

import { SET_SELECTED_POST } from 'store/ui'
import { useForm } from 'react-hook-form'

const useStyles = makeStyles(styles)

const inputStyles = {
  color: '#E91E63',
  fontSize: '25px',
  font: 'League Spartan',
  fontWeight: 'bold',
  overflow: 'auto',
  width: '100%',
}

function SubmitPost() {
  const classes = useStyles()
  const [alert, setAlert] = useState(null)
  const [groupName, setGroupName] = useState('')
  const [groupId, setGroupId] = useState('')
  const [subScoreboardIsOpen, setCreateSubScoreboard] = useState(false)
  const [privacy, setPrivacy] = useState('private')
  const {
    register, handleSubmit, errors,
  } = useForm()

  const dispatch = useDispatch()

  const history = useHistory()

  const user = useSelector((state) => state.user.data)
  const { loading, error, data } = useQuery(GROUPS_QUERY, {
    variables: { limit: 0 },
  })
  const [submitPost] = useMutation(SUBMIT_POST)
  const [createGroup] = useMutation(CREATE_GROUP)

  const DOMAIN = process.env.REACT_APP_DOMAIN || 'localhost:3000'

  const onSubmit = async (values) => {
    const { title, text } = values
    try {
      let newGroup
      if (subScoreboardIsOpen) {
        newGroup = await createGroup({
          variables: {
            group: {
              creatorId: user._id,
              title: groupName,
              description: `Description for: ${groupName} group`,
              privacy,
            },
          },
        })
      }
      const postGroupId = newGroup ? newGroup.data.createGroup._id : groupId || userAllowedGroups[0]._id
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
      successAlert(url, _id)
    } catch (err) {
      errorAlert(err)
    }
  }

  const handleCreateSubScoreboard = () => {
    setGroupName('')
    setCreateSubScoreboard(!subScoreboardIsOpen)
  }

  const handlePrivacy = (event) => {
    setPrivacy(event.target.value)
  }

  const successAlert = (shareableLink) => {
    // const shareableLink = `/hhsb/${domainKey}/content/${id}`

    setAlert(
      <SweetAlert
        success
        style={{ display: 'block', top: '50%' }}
        title="You Created a Post!"
        onConfirm={() => history.push(shareableLink)}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={`${classes.button} ${classes.success}`}
        confirmBtnText="Go to Post"
      >
        <Typography variant="caption">
          Share your text to your friends and family.
        </Typography>
        <Grid
          container
          justify="space-around"
          style={{ marginTop: 16 }}
          wrap="nowrap"
        >
          <GridItem style={{ overflow: 'auto' }}>
            <pre>{DOMAIN + shareableLink}</pre>
          </GridItem>
          <GridItem style={{ flex: 1 }}>
            <IconButton onClick={handleCopy(DOMAIN + shareableLink)}>
              <Tooltip title="Copy Link to Clip Board">
                <AssignmentIcon />
              </Tooltip>
            </IconButton>
          </GridItem>
        </Grid>
      </SweetAlert>
    )
  }

  const errorAlert = (err) => {
    setAlert(
      <SweetAlert
        error
        style={{ display: 'block', top: '50%' }}
        title="Something went wrong!"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={`${classes.button} ${classes.danger}`}
        confirmBtnText="Ok"
      >
        {/* We don't know what, yet let us know and we can find out */}
        Error:
        {' '}
        {err}
      </SweetAlert>
    )
  }
  const hideAlert = () => {
    setAlert(null)
  }

  const handleCopy = (shareableLink) => {
    copy(shareableLink)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <SweetAlert
        error
        style={{ display: 'block', top: '50%' }}
        title="Something went wrong!"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={`${classes.button} ${classes.danger}`}
        confirmBtnText="Ok"
      >
        We don&apos;t know what, yet let us know and we can find out
      </SweetAlert>
    )
  }

  const userAllowedGroups =
    (data &&
      data.groups.filter((group) => {
        const isUserAllowed = group.allowedUserIds.find((id) => id === user._id)
        return (
          group.privacy === 'public' ||
          (group.privacy === 'private' && isUserAllowed)
        )
      })) ||
    []

  const handleSetGroupId = (event) => {
    if (event.target.value) {
      setGroupId(event.target.value)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {alert}
      <GridContainer>
        <GridItem xs={12} xl={6}>
          <Card style={{ height: '600px' }}>
            <CardBody>
              <InputBase
                fullWidth
                data-testid="title-input"
                id="title"
                style={inputStyles}
                placeholder="[Enter Title]"
                name="title"
                inputRef={register({
                  required: 'Title is required',
                })}
                required
                error={errors.title}
                helperText={errors.title && errors.title.message}
              />
              <Divider />
              <TextField
                id="text"
                label="Post"
                placeholder="Input text to submit post"
                multiline
                fullWidth
                rows={3}
                rowsMax={20}
                name="text"
                style={{
                  maxHeight: 600,
                  overflow: 'auto',
                }}
                inputRef={register({
                  required: 'Post is required',
                })}
                required
                error={errors.text}
              />
              <div
                style={{
                  marginTop: 24,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <FormControl required>
                    {subScoreboardIsOpen && subScoreboardIsOpen ? (
                      <TextField
                        id="group"
                        name="group"
                        label="Group"
                        placeholder="Create a new group"
                        value={groupName}
                        style={{ width: 280 }}
                        inputRef={register({
                          required: 'Group is required',
                        })}
                        error={errors.group}
                      />
                    ) : (
                      <>
                        <InputLabel id="group-label" htmlFor="group">
                          Group
                        </InputLabel>
                        <Select
                          data-testid="group"
                          name="group"
                          id="group"
                          value={groupId || userAllowedGroups[0]._id}
                          placeholder={groupName}
                          required
                          onChange={handleSetGroupId}
                          style={{ width: 280 }}
                        >
                          <MenuItem value={groupName}>{groupName}</MenuItem>
                          {!isEmpty(userAllowedGroups) &&
                          userAllowedGroups.map((publicGroup) => (
                            <MenuItem
                              value={publicGroup._id}
                              key={publicGroup._id}
                            >
                              {publicGroup.title}
                            </MenuItem>
                          ))}
                        </Select>
                      </>
                    )}
                  </FormControl>
                  <IconButton
                    style={{ marginTop: 8, marginLeft: 4 }}
                    onClick={handleCreateSubScoreboard}
                  >
                    {subScoreboardIsOpen && subScoreboardIsOpen ? (
                      <Tooltip
                        title="Choose an existing group"
                        style={{ fontSize: 18 }}
                      >
                        <RemoveIcon />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Add a new group">
                        <AddIcon />
                      </Tooltip>
                    )}
                  </IconButton>
                </div>
                <Button
                  id="submit-button"
                  type="submit"
                  variant="contained"
                  size="large"
                  style={{
                    backgroundColor: 'rgb(233, 30, 99)',
                    marginTop: '8px',
                  }}
                >
                  Submit
                </Button>
              </div>
              {subScoreboardIsOpen && (
                <div style={{ paddingTop: 16 }}>
                  <FormControl required component="fieldset">
                    <FormLabel component="legend">
                      Choose Visibility
                    </FormLabel>
                    <RadioGroup
                      aria-label="privacy"
                      name="privacy"
                      value={privacy}
                      onChange={handlePrivacy}
                    >
                      <FormControlLabel
                        value="private"
                        control={<Radio />}
                        label="Private"
                      />
                      <FormControlLabel
                        value="public"
                        control={<Radio />}
                        label="Public"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              )}
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} xl={6} style={{ paddingBottom: 0 }}>
          <Card>
            <CardHeader>
              <div
                style={{
                  display: 'flex',
                  direction: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <p
                  style={{
                    color: '#E91E63',
                    fontSize: '25px',
                    font: 'League Spartan',
                    fontWeight: 'bold',
                  }}
                >
                  Pop Prediction
                </p>
              </div>
            </CardHeader>
          </Card>
        </GridItem>
      </GridContainer>
    </form>
  )
}

export default SubmitPost
