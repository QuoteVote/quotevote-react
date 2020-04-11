import React from "react";

// core components
import GridContainer from "mui-pro/Grid/GridContainer.js";
import GridItem from "mui-pro/Grid/GridItem.js";
import Heading from "mui-pro/Heading/Heading.js";
import Timeline from "mui-pro/Timeline/Timeline.js";
import Card from "mui-pro/Card/Card.js";
import CardBody from "mui-pro/Card/CardBody.js";

import { stories } from "variables/general.js";

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
  );
}
