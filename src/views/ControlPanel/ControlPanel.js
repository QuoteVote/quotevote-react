import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import Skeleton from '@material-ui/lab/Skeleton'
import makeStyles from '@material-ui/core/styles/makeStyles'

import { useMutation, useQuery } from '@apollo/react-hooks'
import { USER_INVITE_REQUESTS } from 'graphql/query'
import { UPDATE_USER_INVITE_STATUS } from 'graphql/mutations'

// react plugin for creating charts
import ChartistGraph from 'react-chartist'
import { dailySalesChart } from 'variables/charts'
import controlPanelStylwa from './controlPanelStyles'

const useStyles = makeStyles(controlPanelStylwa)

const ActionButtons = ({ status, id }) => {
  const classes = useStyles()
  const [sendUserInviteApproval, { loading }] = useMutation(UPDATE_USER_INVITE_STATUS)
  const submitData = async (selectedStatus) => {
    await sendUserInviteApproval({
      variables: {
        userId: id,
        inviteStatus: `${selectedStatus}`,
      },
      refetchQueries: [{
        query: USER_INVITE_REQUESTS,
      }],
    })
  }

  const handleDecline = async () => {
    await submitData(2)
  }

  const handleAccept = async () => {
    await submitData(4)
  }

  const handleReset = async () => {
    await submitData(1)
  }

  switch (Number(status)) {
    case 1: // pending
      return (
        <div style={{ width: 200 }}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            style={{
              backgroundColor: '#f44336',
            }}
            onClick={handleDecline}
            disabled={loading}
          >
            Decline
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            style={{
              backgroundColor: '#00cf6e',
            }}
            onClick={handleAccept}
            disabled={loading}
          >
            Accept
          </Button>
        </div>
      )
    case 2: // declined
      return (
        <Button
          variant="contained"
          className={classes.button}
          style={{
            backgroundColor: '#f44336',
          }}
          onClick={handleReset}
          disabled={loading}
        >
          Reset
        </Button>
      )
    case 4: // active
      return (
        <Button
          variant="contained"
          className={classes.button}
          style={{
            backgroundColor: '#00cf6e',
          }}
          onClick={handleAccept}
          disabled={loading}
        >
          Resend
        </Button>
      )
    default:
      return null
  }
}

const ControlPanelContainer = ({ data }) => {
  const classes = useStyles()
  const header = ['ID', 'Email', 'Status', 'Action']
  const activeUsersCount = 0
  // statuses
  // 1 = new / pending
  // 2 = decline
  // 3 = resend
  // 4 = active
  const getStatusValue = (status) => {
    switch (Number(status)) {
      case 1:
        return 'Pending'
      case 2:
        return 'Declined'
      case 4:
        return 'Accepted'
      default:
        return ''
    }
  }

  // TODO: make it dynamic based on the data provided
  const chartData = {
    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    series: [[12, 17, 7, 17, 23, 18, 38]],
  }
  return (
    <Grid container spacing={2} className={classes.panelContainer}>
      <Grid item xs={12}>
        <Typography className={classes.panelHeader}>Invite Control Panel</Typography>
      </Grid>
      <Grid container item xs={12}>
        <Grid container item xs={6} className={classes.sectionBorder}>
          <Grid item xs={11}>
            <Card>
              <CardContent>
                <Typography className={classes.cardHeader}>User Invitation Requests</Typography>
                <TableContainer>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead classes={{ head: classes.columnHeader }}>
                      <TableRow>
                        {header.map((name) => (
                          <TableCell
                            align="center"
                            className={classes.columnHeader}
                          >
                            {name}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.userInviteRequests.map((row) => (
                        <TableRow key={row._id}>
                          <TableCell align="center">
                            {row._id}
                          </TableCell>
                          <TableCell align="center">{row.email}</TableCell>
                          <TableCell align="center">
                            <Button
                              variant="contained"
                              color="primary"
                              className={cx({
                                [classes.pendingStatus]: row.status === '1',
                                [classes.declinedStatus]: row.status === '2',
                                [classes.acceptedStatus]: row.status === '4',
                              })}
                              disableRipple
                              disableElevation
                            >
                              {getStatusValue(row.status)}
                            </Button>
                          </TableCell>
                          <TableCell align="center">
                            <ActionButtons status={row.status} id={row._id} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container item xs={6} justify="flex-end">
          <Grid item xs={11}>
            <Card>
              <CardContent>
                <Typography
                  className={classes.cardHeader}
                  display="inline"
                >
                  User Invitation Statistics
                </Typography>
                <Typography
                  className={classes.graphText}
                  display="inline"
                  style={{ float: 'right' }}
                >
                  Invite Requests:
                  {' '}
                  {(data.userInviteRequests && data.userInviteRequests.length) || 0}
                </Typography>
                <ChartistGraph
                  className="ct-chart-white-colors"
                  style={{ backgroundColor: '#00bcd4' }}
                  data={chartData}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
                <Typography
                  className={classes.graphText}
                  display="inline"
                >
                  Total Users:
                  {' '}
                  {(data.userInviteRequests && data.userInviteRequests.length) || 0}
                </Typography>
                <Typography
                  className={classes.graphText}
                  display="inline"
                  style={{ float: 'right' }}
                >
                  Active Users Today:
                  {' '}
                  {activeUsersCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

const ControlPanel = () => {
  const { data } = useQuery(USER_INVITE_REQUESTS)
  const classes = useStyles()
  if (data) {
    return (
      <ControlPanelContainer data={data} />
    )
  }
  return (
    <Grid container spacing={2} className={classes.panelContainer}>
      <Grid item xs={12}>
        <Skeleton animation="wave" style={{ width: '25%' }} />
      </Grid>
      <Grid container item xs={12}>
        <Grid container item xs={6} className={classes.sectionBorder}>
          <Skeleton animation="wave" height={300} style={{ width: '80%' }} />
        </Grid>
        <Grid container item xs={6} justify="flex-end">
          <Skeleton animation="wave" height={300} style={{ width: '80%' }} />
        </Grid>
      </Grid>
    </Grid>
  )
}

ControlPanelContainer.propTypes = {
  data: PropTypes.object.isRequired,
}

ActionButtons.propTypes = {
  status: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default ControlPanel
