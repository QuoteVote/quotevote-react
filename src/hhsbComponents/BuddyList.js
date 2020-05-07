import React from 'react'

import { isEmpty } from 'lodash'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from '@apollo/react-hooks'
import CircularProgress from '@material-ui/core/CircularProgress'
import GridContainer from 'mui-pro/Grid/GridContainer.js'
import ListDividers from 'hhsbComponents/ChatComponents/List.js'

import { GET_BOOK_MARKED } from 'graphql/query'

const useStyles = makeStyles({
  chatContainer: {
    maxWidth:'300px',
    backgroundColor:'#191919',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'center',
    height:'800px',
    wrap:'wrapContent'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  margin:{
    width:'95%'
  },
  header:{
    width:'100%',
    backgroundColor:'#615B5B',
    color:'white',
    alignItems:'center',
    justifyContent:'center',
    height:'8%'
  },
  headerText:{
    fontSize:'x-large',
    fontWeight:900
  }
});

export default function BuddyList(props){
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_BOOK_MARKED);
  
  if (loading) {
    return (
      <CircularProgress color='secondary'/>
    )
  }

  if (error) return `Something went wrong: ${error}`
  
  let Data = []
  if (!isEmpty(data.getBookmarkedContents)) {
    Data = data.getBookmarkedContents.map(item => {
      return { Text: item.lastMessage.title, color: '#191919' }
    })
  }
  // let Data=[{Text:'Following',Color:'gray',icon:Alert},{Text:'options2',Color:'#191919'},{Text:'option3',Color:'#191919'},{Text:'Content Posts',Color:'gray'},{Text:'option3',Color:'#191919'}]
  // let Data2=['following']
  // let Data3=['content post']
  return(
    <GridContainer className={classes.chatContainer}>
      <GridContainer className={classes.header} onClick={props.toggle}>
        <p className={classes.headerText}>Buddy Lists</p>
      </GridContainer>
      <ListDividers List={Data} />
    </GridContainer>
  )
}
