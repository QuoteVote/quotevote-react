import React from 'react'

import GridContainer from "mui-pro/Grid/GridContainer.js"
import GridItem from "mui-pro/Grid/GridItem.js"
import NavPills from "mui-pro/NavPills/NavPills.js"
import Accordion from "mui-pro/Accordion/Accordion.js"
import Card from "mui-pro/Card/Card.js"
import CardHeader from "mui-pro/Card/CardHeader.js"
import CardBody from "mui-pro/Card/CardBody.js"
import Button from "mui-pro/CustomButtons/Button.js"
import { getThemeProps } from '@material-ui/styles'
import Badge from "mui-pro/Badge/Badge.js"

import CustomAccordion from  "./customExpansionPanel.js"

const Content = ({ MessageData }) => (
  <GridContainer>
    <GridItem
      direction="row"
      justify="center"
      alignItems="center"
    >
      <CustomAccordion active={0}  collapses={MessageData} />
    </GridItem>    
  </GridContainer> 
)

export default Content