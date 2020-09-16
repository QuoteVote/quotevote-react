import React from 'react'
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
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles((theme) => ({
  panelContainer: {
    [theme.breakpoints.up('lg')]: {
      padding: 100,
      paddingTop: 30,
    },
    [theme.breakpoints.down('md')]: {
      padding: 10,
    },
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
    backgroundColor: '#fafafa',
  },
  panelHeader: {
    font: 'Montserrat',
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'black',
  },
  cardHeader: {
    font: 'Montserrat',
    fontSize: '18px',
    fontWeight: 'bold',
    letterSpacing: '0.2px',
    color: '#00cf6e',
  },
  sectionBorder: {
    height: '100%',
    borderRight: 'solid 2px #d2d2d2',
  },
  columnHeader: {
    font: 'Roboto',
    fontSize: '17px',
    color: '#00cf6e',
  },
}))

const ControlPanel = () => {
  const classes = useStyles()
  function createData(email, status) {
    return {
      email, status,
    }
  }
  const rows = [
    createData('testamail1@mail.test', 'pending'),
    createData('testamail2@mail.test', 'accepted'),
    createData('testamail3@mail.test', 'declined'),
    createData('testamail4@mail.test', 'pending'),
    createData('testamail5@mail.test', 'pending'),
  ];
  const header = ['ID', 'Email', 'Status', 'Action']
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
                        {header.map((name)=> (
                          <TableCell className={classes.columnHeader}>{name}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row, index) => (
                        <TableRow key={row.name}>
                          <TableCell>
                            {index + 1}
                          </TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell>{row.status}</TableCell>
                          <TableCell>Action Buttons Here</TableCell>
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
                <Typography className={classes.cardHeader}>User Invitation Statistics</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ControlPanel
