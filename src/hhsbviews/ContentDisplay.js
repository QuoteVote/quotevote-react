/* eslint-disable prefer-destructuring */
// import { getThemeProps } from '@material-ui/styles';
// import Accordion from "mui-pro/Accordion/Accordion.js";
// import Badge from "mui-pro/Badge/Badge.js";
// import Box from '@material-ui/core/Box';
// import Button from "mui-pro/CustomButtons/Button.js"
import Card from "mui-pro/Card/Card.js"
import CardBody from "mui-pro/Card/CardBody.js"
import CardFooter from "mui-pro/Card/CardFooter.js"
import CardHeader from "mui-pro/Card/CardHeader.js"
import Divider from "@material-ui/core/Divider"
import GridContainer from "mui-pro/Grid/GridContainer.js"
import GridItem from "mui-pro/Grid/GridItem.js"

// import NavPills from "mui-pro/NavPills/NavPills.js";
import VotingBoard from "hhsbComponents/VotingComponents/VotingBoard.js"
import VotingPopup from "hhsbComponents/VotingComponents/VotingPopup.js"
import React, { useState } from "react"

// import Content from "../hhsbComponents/ContentList.js";
import Chat from "../hhsbAssets/Chat.svg"
import Heart from "../hhsbAssets/Heart.svg"
import Send from "../hhsbAssets/Send.svg"

// import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

import FaceIcon from "@material-ui/icons/Face"
import { useQuery, useMutation } from "@apollo/react-hooks"
import moment from "moment"

import ContentDisplaySkeleton from "hhsbviews/Skeletons/ContentDisplaySkeleton"
import { useSelector } from "react-redux"
import { cloneDeep } from "lodash"

import { GET_CONTENT } from 'graphql/query'
import { VOTE, ADD_COMMENT } from 'graphql/mutations'

const ContentDisplay = () => {
  // temporary variables
  const contentId = "5bdc0d928b8fc22ce6da1f30"
  const domain = "5b8bb075fa6366464c549322"

  const [selectedText, setSelectedText] = useState("")
  const { user } = useSelector((state) => state.loginReducer)
  const [addVote] = useMutation(VOTE, {
    update(
      cache,
      {
        data: { addVote },
      }
    ) {
      const data = cache.readQuery({
        query: GET_CONTENT,
        variables: { contentId, key: domain },
      })

      const clonedContent = cloneDeep(data)

      if (addVote.type === "upvote") {
        let { upvotes } = clonedContent.content.scoreDetails
        clonedContent.content.scoreDetails.upvotes = upvotes + 1
      } else {
        const { downvotes } = clonedContent.content.scoreDetails
        clonedContent.content.scoreDetails.downvotes = downvotes + 1
      }

      cache.writeQuery({
        query: GET_CONTENT,
        variables: { contentId, key: domain },
        data: { ...clonedContent },
      })
    },
  })

  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [
      {
        query: GET_CONTENT,
        variables: { contentId, key: domain },
      },
    ],
  })
  // const classes = useStyles();

  const { loading, error, data } = useQuery(GET_CONTENT, {
    variables: { contentId, key: domain },
  })

  if (loading) return <ContentDisplaySkeleton />

  const { content } = data

  // let data2 = {
  //   title: "a test title",
  //   Body: "this is some test text",
  //   Comments: "this is pretty cool"
  // };
  // let sample =
  //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  // const sampleComment =
  //   "Some quick example text to build on the card title and make up the bulk of the cards content.";

  const handleVoting = async (event, data) => {
    const vote = {
      ...data,
      startWordIndex: selectedText.startIndex,
      endWordIndex: selectedText.endIndex,
      contentId,
      creatorId: content.creatorId,
      userId: user._id,
      text: selectedText.text,
    }

    addVote({ variables: { vote } })
  }

  const handleAddComment = (comment, commentWithQuote = false) => {
    let startIndex, endIndex, quoteText

    const HASHTAGS_REGEX = /#(\w|\d)+/g
    const hashtags = comment.match(HASHTAGS_REGEX)

    if (selectedText) {
      startIndex = selectedText.startIndex
      endIndex = selectedText.endIndex
      quoteText = selectedText.text
    } else {
      startIndex = 0
      endIndex = 0
      quoteText = ""
    }

    // TODO: ommit quote props if user did not highlight text
    const newComment = {
      contentId,
      creatorId: content.creatorId,
      userId: user._id,
      text: comment,
      startWordIndex: startIndex,
      endWordIndex: endIndex,
      hashtags,
      quote: commentWithQuote ? quoteText : "",
    }

    addComment({ variables: { comment: newComment } })
  }

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
                  zIndex: 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    direction: "row",
                    alignContent: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    style={{
                      color: "#E91E63",
                      fontSize: "25px",
                      font: "League Spartan",
                      fontWeight: "bold",
                    }}
                  >
                    {content.title}
                  </p>
                  <img
                    src={Chat}
                    style={{ height: "20px", paddingLeft: "10px" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    direction: "row",
                    justifyContent: "flex-end",
                    flexBasis: "100px",
                  }}
                >
                  <p>
                    <strong style={{ color: "green" }}>+</strong>
                    {content.scoreDetails.upvotes}/
                    <strong style={{ color: "red" }}>-</strong>
                    {content.scoreDetails.downvotes}
                  </p>
                  <img
                    src={Send}
                    style={{
                      height: "15px",
                      paddingLeft: "15px",
                      paddingTop: "3px",
                    }}
                  />
                  <img
                    src={Heart}
                    style={{
                      height: "15px",
                      paddingLeft: "15px",
                      paddingTop: "3px",
                    }}
                  />
                </div>
              </div>
              <Divider />
            </CardHeader>
            <CardBody>
              <VotingBoard
                content={content.text}
                onSelect={setSelectedText}
                selectedText={selectedText}
              >
                {({ text }) => (
                  <VotingPopup
                    onVote={handleVoting}
                    onAddComment={handleAddComment}
                    text={text}
                    selectedText={selectedText}
                  />
                )}
              </VotingBoard>
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
                  justifyContent: "space-between",
                }}
              >
                <p
                  style={{
                    color: "#E91E63",
                    fontSize: "25px",
                    font: "League Spartan",
                    fontWeight: "bold",
                  }}
                >
                  Comments
                </p>
              </div>
              <Divider />
            </CardHeader>
          </Card>
          {content.comments
            .sort((a, b) => moment(b.created).diff(moment(a.created)))
            .map((comment, index) => (
              <Card key={`comment-${index}`}>
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
                        paddingTop: 17,
                      }}
                    >
                      <FaceIcon />
                    </span>
                    <h5 style={{ margin: 0 }}>username</h5>
                    {comment.text}
                  </p>
                </CardBody>
                <CardFooter chart testimonial>
                  <span style={{ float: "right" }}>
                    {moment(comment.created).format("MM/DD/YYYY hh:mm A")}
                  </span>
                </CardFooter>
              </Card>
            ))}
        </GridItem>
      </GridContainer>
    </div>
  )
}

export default ContentDisplay
