/* eslint-disable react/prop-types */
import React from 'react'

import GridContainer from 'mui-pro/Grid/GridContainer'
import GridItem from 'mui-pro/Grid/GridItem'

import CustomAccordion from './customExpansionPanel'

const Content = ({ MessageData }) => (
  <GridContainer>
    <GridItem
      direction="row"
      justify="center"
      alignItems="center"
    >
      <CustomAccordion active={0} collapses={MessageData} />
    </GridItem>
  </GridContainer>
)

export default Content
