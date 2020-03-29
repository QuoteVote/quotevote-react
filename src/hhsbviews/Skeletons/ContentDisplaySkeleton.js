import React from "react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardHeader from "components/Card/CardHeader.js";
import Divider from "@material-ui/core/Divider";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

// import Content from "../hhsbComponents/ContentList.js";
import Chat from "hhsbAssets/Chat.svg";
import Heart from "hhsbAssets/Heart.svg";
import Send from "hhsbAssets/Send.svg";

// import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

import FaceIcon from "@material-ui/icons/Face";
import Skeleton from "@material-ui/lab/Skeleton";

const ContentDisplaySkeleton = () => {
  return (
    <div>
      <GridContainer spacing={1} direction="col">
        <GridItem xs={6}>
          <Card style={{ height: "800px" }}>
            <CardHeader style={{ zIndex: 0 }}>
              <div
                style={{
                  display: "flex",
                  direction: "row",
                  justifyContent: "space-between",
                  zIndex: 0
                }}
              >
                <div
                  style={{
                    display: "flex",
                    direction: "row",
                    alignContent: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <p
                    style={{
                      color: "#E91E63",
                      fontSize: "25px",
                      font: "League Spartan",
                      fontWeight: "bold"
                    }}
                  >
                    <Skeleton variant="text" width={210} />
                  </p>
                  <img
                    alt=""
                    src={Chat}
                    style={{ height: "20px", paddingLeft: "10px" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    direction: "row",
                    justifyContent: "flex-end",
                    flexBasis: "100px"
                  }}
                >
                  <p>
                    <Skeleton variant="text" width={50} />
                  </p>
                  <img
                    alt=""
                    src={Send}
                    style={{
                      height: "15px",
                      paddingLeft: "15px",
                      paddingTop: "3px"
                    }}
                  />
                  <img
                    alt=""
                    src={Heart}
                    style={{
                      height: "15px",
                      paddingLeft: "15px",
                      paddingTop: "3px"
                    }}
                  />
                </div>
              </div>
              <Divider />
            </CardHeader>
            <CardBody>
              <Skeleton variant="text" width={500} />
              <Skeleton variant="text" width={500} />
              <Skeleton variant="text" width={250} />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={6} style={{ paddingBottom: 0 }}>
          <Card>
            <CardHeader>
              <div
                style={{
                  display: "flex",
                  direction: "row",
                  justifyContent: "space-between"
                }}
              >
                <p
                  style={{
                    color: "#E91E63",
                    fontSize: "25px",
                    font: "League Spartan",
                    fontWeight: "bold"
                  }}
                >
                  Comments
                </p>
              </div>
              <Divider />
            </CardHeader>
          </Card>

          <Card>
            <CardBody>
              <p style={{ fontSize: 12 }}>
                <span
                  style={{
                    height: 60,
                    width: 60,
                    backgroundColor: "#df2769",
                    float: "left",
                    margin: "0px 10px 10px 0px",
                    textAlign: "center",
                    borderRadius: 3,
                    paddingTop: 17
                  }}
                >
                  <FaceIcon />
                </span>
                <h5 style={{ margin: 0 }}>
                  <Skeleton variant="text" width={100} />
                </h5>
                <Skeleton variant="text" width={500} />
                <Skeleton variant="text" width={500} />
                <Skeleton variant="text" width={250} />
              </p>
            </CardBody>
            <CardFooter chart testimonial>
              <span style={{ float: "right" }}>
                <Skeleton variant="text" width={250} />
              </span>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default ContentDisplaySkeleton;
