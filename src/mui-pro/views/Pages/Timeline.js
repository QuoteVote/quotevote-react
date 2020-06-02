import React from 'react'

// core components
import GridContainer from 'mui-pro/Grid/GridContainer'
import GridItem from 'mui-pro/Grid/GridItem'
import Heading from 'mui-pro/Heading/Heading'
import Timeline from 'mui-pro/Timeline/Timeline'
import Card from 'mui-pro/Card/Card'
import CardBody from 'mui-pro/Card/CardBody'

import { stories } from 'variables/general'

export default function TimelinePage() {
  return (
    <div>
      <Heading title="Timeline" textAlign="center" />
      <GridContainer>
        <GridItem xs={12}>
          <Card plain>
            <CardBody plain>
              <Timeline stories={stories} />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  )
}
