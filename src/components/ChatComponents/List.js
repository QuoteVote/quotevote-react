/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-default */
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { default as MaterialList } from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import GridContainer from 'mui-pro/Grid/GridContainer'

const useStyles = makeStyles(({
  root: {
    flexGrow: 1,
    backgroundColor: (props) => props.Color,
  },
}))

export default function ListDividers({ List }) {
  const classes = useStyles()
  return (
    <MaterialList component="nav" className={classes.root} aria-label="mailbox folders">
      {List.map((item) => (
        <ListItem button style={{ backgroundColor: item.Color, width: '300px' }}>
          <GridContainer alignItems="center">
            <ListItemText primary={item.Text} />
          </GridContainer>
          <img alt={item.icon} src={item.icon} style={{ height: '30px' }} />
        </ListItem>
      ))}
    </MaterialList>
  )
}
