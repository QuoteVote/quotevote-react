import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import React from 'react'

import CustomAccordion from "./customExpansionPanel.js"

const Content = (props) => {
  return (
    <GridContainer>
      <GridItem
        direction="row"
        justify="center"
        alignItems="center"
      >
        <CustomAccordion active={0} collapses={props.MessageData}/>
      </GridItem>
    </GridContainer>
  )
}
export default Content