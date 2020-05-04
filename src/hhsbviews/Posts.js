/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable no-unreachable */
// The `break` in the switch are reachable. If not, please resolve
import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridContainer from 'mui-pro/Grid/GridContainer'
import GridItem from 'mui-pro/Grid/GridItem'
import Card from 'mui-pro/Card/Card'
import CardBody from 'mui-pro/Card/CardBody'

function Headers() {
  const useStyles = makeStyles({
    h2: {
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '18px',
      lineHeight: '22px',
      /* identical to box height */
      letterSpacing: '0.2px',
      color: '#E91E63',
    },
    divider: {
      marginBottom: 10,
      backgroundColor: '#ddd',
    },
    gridItem: {
      backgroundColor: 'white',
      marginLeft: 10,
      width: '48%'

    },
  })
  const classes = useStyles()
  return (
    <Fragment>
        <GridItem className={classes.gridItem} direction="row" justify="center" backgroundColor="white" elevation={3}>
        <h2 className={classes.h2}>Title of the post</h2>
        </GridItem>
        <GridItem className={classes.gridItem} direction="row" justify="center" backgroundColor="white" elevation={3}>
        <h2 className={classes.h2}>Comments</h2>
        </GridItem>
    </Fragment>
  )
}

function Comments() {
    const useStyles = makeStyles({
        comment: {
            width: '48%',
            marginLeft: 10
        }
    })
    const classes = useStyles()
    return (
        <Card className={classes.comment}>
            <CardBody>
                <h2> an array of comments will go here</h2>
            </CardBody>

        </Card>
    )
}
function Post() {
    const useStyles = makeStyles({
        post: {
            width: '50%'
        },
    })
    const classes = useStyles()
    return (
        <Card className={classes.post}> 
            <CardBody>
                <h2> I'm a post</h2>
            </CardBody>
        </Card>
    )
}
export default function Posts() {
  const data = []
  // const {contents} = data
  /* const handleAccept = (user) => {
      switch(user.status) {
        case 'RESEND':
          break
        case 'NEW':
          const update = useMutation(UPDATE_USER_INVITE_STATUS)
          console.log(update)
      } */

  if (data) {
    return (
      <GridContainer>
        <Headers />
        <Post />
        <Comments />
      </GridContainer>
    )
  }

  return (
    <GridContainer>
      loading
    </GridContainer>
  )
}
