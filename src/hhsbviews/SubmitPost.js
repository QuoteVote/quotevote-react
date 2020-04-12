import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { useSelector } from 'react-redux'

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
} from "@material-ui/core"


import { makeStyles } from "@material-ui/core/styles"

import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'


// Materi Icons
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import AssignmentIcon from '@material-ui/icons/Assignment'


import GridItem from "material-ui/components/Grid/GridItem"
import Card from "material-ui/components/Card/Card"
import CardHeader from "material-ui/components/Card/CardHeader"
import CardBody from "material-ui/components/Card/CardBody"
import Button from "material-ui/components/CustomButtons/Button"
import LoadingSpinner from "hhsbComponents/LoadingSpinner.js"
import styles from "material-ui/assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js"

import GridContainer from "material-ui/components/Grid/GridContainer"

import SweetAlert from "react-bootstrap-sweetalert"
import * as copy from "clipboard-copy"


import { useQuery, useMutation } from '@apollo/react-hooks'
import { CREATE_DOMAIN, SUBMIT_TEXT } from 'graphql/mutations'
import { DOMAIN_QUERY } from 'graphql/query'

const useStyles = makeStyles(styles)

const inputStyles = {
  color: "#E91E63",
  fontSize: "25px",
  font: "League Spartan",
  fontWeight: "bold",
}

function SubmitPost() {
  const classes = useStyles()
  const [alert, setAlert] = React.useState(null)
  const [title, setTitle] = useState('[Enter Title]')
  const [text, setText] = useState('')
  const [domain, setDomain] = useState({domain: {
    title: 'Default',
  }})
  const [subScoreboardIsOpen, setCreateSubScoreboard] = useState(false)
  const [privacy, setPrivacy] = useState('private')

  let history = useHistory()

  const { user } = useSelector((state) => state.loginReducer)
  const { loading, error, data } = useQuery(DOMAIN_QUERY, {
    variables: { limit: 0 },
  })

  const [submitText, { data: submitData }] = useMutation(SUBMIT_TEXT)
  const [createDomain, { data: domainData}] = useMutation(CREATE_DOMAIN)

  const DOMAIN = process.env.REACT_APP_DOMAIN || 'localhost:3000'

  const handleSubmit =  async (event) => {
    event.preventDefault()
    let domainResult
    try {
      if (subScoreboardIsOpen) {
        domainResult= await createDomain({
          variables: {
            domain: {
              userId: user.creatorId,
              title: domain,
              url: `/${  domain.toLowerCase()}`,
              key: domain.toLowerCase(),
              privacy,
              description: `Description for: ${  domain  } group`,
            },
          },
        })
      }
      const domainId = domain._id ? domain._id : domainResult.data.createDomain._id
      const submitResult = await submitText({
        variables: {
          content: {
            title: title,
            text: text,
            creatorId: user.creatorId,
            domainId,
          },
        },
      })
      const { _id } = submitResult.data.addContent
      const domainKey = domain.key ? domain.key : domain.toLowerCase()
      successAlert(domainKey, _id)
    } catch (err) {
      errorAlert()
    }
  }

  const handleText = (event) => {
    setText(event.target.value)
  }

  const handleTitle = (event) => {
    setTitle(event.target.value)
  }

  const clearTitle = (event) => {
    if (title === '[Enter Title]') {
      setTitle('')
    }
  }

  const handleDomain = (event) => {
    setDomain(event.target.value)
  }

  const handleCreateSubScoreboard = () => {
    setDomain('')
    setCreateSubScoreboard(!subScoreboardIsOpen)
  }

  const handlePrivacy = (event) => {
    setPrivacy(event.target.value)
  }

  const successAlert = (domainKey, id) => {
    const shareableLink = `/boards/${domainKey}/content/${id}`

    setAlert(
      <SweetAlert
        success
        style={{ display: "block", top: "50%" }}
        title="You Created a Post!"
        onConfirm={() => history.push(shareableLink)}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={`${classes.button} ${classes.success}`}
        confirmBtnText="Go to Post"
      >
        <Typography variant="caption">Share your text to your friends and family.</Typography>
        <Grid 
          container
          justify="space-around" 
          style={{ marginTop: 16 }}
          wrap="nowrap"
        >
          <GridItem style={{ overflow: 'auto' }}>
            <pre>{ DOMAIN + shareableLink }</pre>
          </GridItem>
          <GridItem style={{ flex: 1}}>
            <IconButton onClick={handleCopy(DOMAIN + shareableLink)}>
              <Tooltip title="Copy Link to Clip Board"><AssignmentIcon/></Tooltip>
            </IconButton>
          </GridItem>
        </Grid>
      </SweetAlert>
    )
  }
  
  const errorAlert = () => {
    setAlert(
      <SweetAlert
        error
        style={{ display: "block", top: "50%" }}
        title="Something went wrong!"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={`${classes.button  } ${  classes.danger}`}
        confirmBtnText="Ok"
      >
        We don't know what, yet let us know and we can find out
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
    return (
      <LoadingSpinner />
    )
  }
  
  if(error) {
    return (
      <SweetAlert
        error
        style={{ display: "block", top: "50%" }}
        title="Something went wrong!"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={`${classes.button  } ${  classes.danger}`}
        confirmBtnText="Ok"
      >
        We don't know what, yet let us know and we can find out
      </SweetAlert>
    )
  } 

  const userAllowedDomains = data.domains.filter((domain) => {
    const isUserAllowed = domain.allowedUserIds.find(
      (id) => id === user.creatorId
    )
    return (
      domain.privacy === "public" ||
        (domain.privacy === "private" &&
          isUserAllowed)
    )
  })

  return (
    <>
      {alert}
      <GridContainer spacing={1} direction="col">
        <GridItem xs={6}>
          <Card style={{ height: "800px" }}>
            <CardHeader style={{ zIndex: 0 }}>
              <div
                style={{
                  display: "flex",
                  direction: "row",
                  justifyContent: "space-between",
                  zIndex: 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    direction: "row",
                    alignContent: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <InputBase
                    style={inputStyles}
                    onClick={clearTitle}
                    onFocus={clearTitle}
                    onChange={handleTitle}
                    value={title}
                    name="title"
                    required
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    direction: "row",
                    justifyContent: "flex-end",
                    flexBasis: "100px",
                  }}
                >     
                </div>
              </div>
              <Divider />
            </CardHeader>
            <CardBody>
              <form
                onSubmit={handleSubmit}
              >
                <TextField
                  id="post"
                  label="Post"
                  placeholder="Input text to submit post"
                  multiline
                  fullWidth
                  name="text"
                  required
                  onChange={handleText}
                  value={text}
                  style={{
                    maxHeight: 600,
                    overflow: 'auto',
                  }}
                />
                <div style={{marginTop: 24, display: 'flex', justifyContent: 'space-between', alixgnContent: 'center'}}>
                  <div>
                    <FormControl required>
                      {
                        subScoreboardIsOpen && subScoreboardIsOpen                   ? 
                          <TextField
                            id="group"
                            label="Group"
                            placeholder="Create a new group"
                            name="group"
                            required
                            onChange={handleDomain}
                            value={domain.title}  
                            style={{ width: 280 }}
                          /> : 
                          <>
                            <InputLabel id="group-label" htmlFor="group">Group</InputLabel>
                            <Select
                              id="group"
                              value={domain.title}
                              placeholder={domain.title}
                              required
                              onChange={handleDomain}
                              style={{ width: 280 }}
                            >
                              <MenuItem value={domain.title}>
                                {domain.title}
                              </MenuItem>
                              {userAllowedDomains.map((publicDomain) => (
                                <MenuItem
                                  name={publicDomain.key}
                                  value={publicDomain}
                                  key={publicDomain._id}
                                >
                                  {publicDomain.title}
                                </MenuItem>))}
                            </Select>
                          </>
                      }
                
                    </FormControl>
                    <IconButton 
                      style={{ marginTop: 8, marginLeft: 4}}
                      onClick={handleCreateSubScoreboard}
                    >
                      { subScoreboardIsOpen && subScoreboardIsOpen ? 
                        <Tooltip title="Choose an existing group" style={{ fontSize: 18 }}><RemoveIcon/></Tooltip> :
                        <Tooltip title="Add a new group"><AddIcon/></Tooltip>
                      }
                    </IconButton>
                  </div>
                  <Button 
                    type="submit"
                    variant="contained"
                    size="large"
                    style={{
                      backgroundColor: 'rgb(233, 30, 99)',
                    }}
                  >
                Submit
                  </Button>
                </div>
                {
                  subScoreboardIsOpen &&
                <div style={{ paddingTop  : 16}}>
                  <FormControl required component="fieldset" >
                    <FormLabel component="legend">Choose Visibility</FormLabel>
                    <RadioGroup aria-label="privacy" name="privacy" value={privacy} onChange={handlePrivacy}>
                      <FormControlLabel value="private" control={<Radio />} label="Private" />
                      <FormControlLabel value="public" control={<Radio />} label="Pulbic" />
                    </RadioGroup>
                  </FormControl>
                </div>
                }
              </form>           
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={6} style={{ paddingBottom: 0 }}>
          <Card>
            <CardHeader>
              <div
                style={{
                  display: "flex",
                  direction: "row",
                  justifyContent: "space-between",
                }}
              >
                <p
                  style={{
                    color: "#E91E63",
                    fontSize: "25px",
                    font: "League Spartan",
                    fontWeight: "bold",
                  }}
                >
                  Pop Prediction
                </p>
              </div>
            </CardHeader>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  )
}

export default SubmitPost