import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from 'components/CustomButtons/Button.js';
import Badge from 'components/Badge/Badge.js';

import {useQuery} from '@apollo/react-hooks';
import { USER_INVITE_REQUESTS, UPDATE_USER_INVITE_STATUS } from 'graphql/query';
import { Mutation } from '@apollo/react-components';



function Headers() {
  const useStyles = makeStyles({
    h2: {
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '18px',
      lineHeight: '22px',
      /* identical to box height */
      letterSpacing: '0.2px',
      color: '#E91E63'
    },
    divider: {
        marginBottom: 10,
        backgroundColor: '#ddd'
    },
    gridItem: {
      backgroundColor: 'white',
    }
  });
  const classes = useStyles();
    return (
        <GridItem className={classes.gridItem} direction='row' justify='center' container backgroundColor="white"  elevation={3}> 
            <h2 className={classes.h2}>User Invitation Requests</h2>
        </GridItem>
        
    )
}
function Status({ status }) {
  switch(status) {
    case 'ACCEPT':
    return (
      <Badge color="success">
          Accepted
      </Badge>
    )
    break
    case 'DECLINED':
    return (
      <Badge color="rose">
        {status}
      </Badge>
    )
    break
    case 'RESEND':
      return (
        <Badge color='gray'>
          {status}
        </Badge>
      )
    default:
    return (
      <Badge color="warning">
        NEW
      </Badge>
    )
  }
}

function ActionButton({status, id}) {
  switch(status) {
    case 'ACCEPT':
      return (
        <Button color='gray'>Resend</Button>
      )
      break
    case 'APPROVED':
      return (
        <div>
          <Button color='danger'>DECLINE</Button>
          <Mutation mutation={UPDATE_USER_INVITE_STATUS}>
            {(updateInviteStatus, { data }) => (
                <Button color="success" onClick={(e) => updateInviteStatus({variables:{action: 'ACCEPT', user_invite_id: id}}) }>Accept</Button>
              )}
          </Mutation>
        </div>
      )
      break
    case 'DECLINED':
      return (
        <Button color='gray'> RESET</Button>
      )
      break
    
    case 'RESEND':
      return (
        <Button color='gray'> Resend</Button>
      )
    default:
      return (
        <div></div>
      )
  }
}
function InviteTable({ data }) {
  const useStyles = makeStyles({

    tableContainer: {
      // width: '48%',
      marginTop: 20
    },
    tableHead: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '300',
      fontSize: '17px',
      lineHeight: '20px',
      /* identical to box height */
      color: '#9C27B0'
    }
  })
  const classes = useStyles();
  

  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table aria-label="Invite Table">
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell className={classes.tableHead} align="center">ID</TableCell>
            <TableCell className={classes.tableHead} align="center">Email</TableCell>
            <TableCell className={classes.tableHead} align="center">Status</TableCell>
            <TableCell className={classes.tableHead} align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.userInviteRequests.map((row, index) => (
            <TableRow key={row.email}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center"><Status status={row.status} /></TableCell>
              <TableCell align="center">
                <ActionButton id={row._id} status={row.status} />
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function ManageInvites(props) {
  const {data} = useQuery(USER_INVITE_REQUESTS);
    //const {contents} = data
    /* const handleAccept = (user) => {
      switch(user.status) {
        case 'RESEND':
          break
        case 'NEW':
          const update = useMutation(UPDATE_USER_INVITE_STATUS)
          console.log(update)
      } */

    if(data) {
      return (
          <GridContainer> 
            <Headers />
            <InviteTable 
              data={data}  
            />
          </GridContainer>
      )
    }
    else {
      return (
        <GridContainer>
          loading
        </GridContainer>
      )
    }
    

}


