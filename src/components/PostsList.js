/* eslint-disable react/prop-types */
// TODO fix Links
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import { Link, Tooltip, IconButton } from '@material-ui/core'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
// @material-ui/icons
import ExpandMore from '@material-ui/icons/ExpandMore'
import styles from 'assets/jss/material-dashboard-pro-react/components/accordionStyle'
// import Heart from '../assets/img/Heart.svg'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

import GridContainer from 'mui-pro/Grid/GridContainer'
import { useHistory } from 'react-router-dom'
import stringLimit from 'string-limit'
import copy from 'clipboard-copy'
import { useDispatch, useSelector } from 'react-redux'
import { SET_SELECTED_POST } from 'store/ui'
import { useMutation } from '@apollo/react-hooks'
import { GET_TOP_POSTS } from 'graphql/query'
import { UPDATE_POST_BOOKMARK } from 'graphql/mutations'
import Chat from '../assets/img/Chat.svg'
import Send from '../assets/img/Send.svg'

const useStyles = makeStyles(styles)

// eslint-disable-next-line
function AlertSkeletonLoader({ limit }) {
  const rows = Array.from(Array(limit).keys())
  return (
    <div style={{ width: '90%' }}>
      {
        rows.map(() => (
          <>
            <Skeleton variant="rect" animation="wave" height={50} />
            <br />
          </>
        ))
      }
    </div>
  )
}

function LoadPostsList({ data }) {
  const DOMAIN = process.env.REACT_APP_DOMAIN || 'localhost:3000'
  const history = useHistory()
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.data)
  const [active, setActive] = React.useState(0)
  const [activeKey, setActiveKey] = React.useState(null)
  const [updatePostBookmark] = useMutation(UPDATE_POST_BOOKMARK, {
    refetchQueries: [
      {
        query: GET_TOP_POSTS,
        variables: { limit: 5, offset: 0, searchKey: '' },
      },
    ],
  })

  const handleChange = (panel) => (event, expanded) => {
    setActive(expanded ? panel : -1)
  }

  const handleCopy = (shareableLink, key) => {
    copy(shareableLink)
    setActiveKey(key)
  }

  const handleBookmark = (postId) => {
    // eslint-disable-next-line no-underscore-dangle
    updatePostBookmark({ variables: { postId, userId: user._id } })
  }

  if (!data || data.posts === 0) {
    return (
      <div style={{ width: '90%', textAlign: 'center' }}>
        <span>No posts fetched.</span>
        <br></br>
      </div>
    )
  }

  return data.posts.map((prop, key) => {
    const {
      _id, text, title, upvotes, downvotes, url, bookmarkedBy,
    } = prop
    const isBookmarked = bookmarkedBy.includes(user._id)
    // const postURL = `/hhsb/post/${title}/${_id}`
    return (
      <div style={{ width: '90%' }}>
        <ExpansionPanel
          expanded={active === key}
          onChange={handleChange(key)}
          key={key}
          classes={{
            root: classes.expansionPanel,
            expanded: classes.expansionPanelExpanded,
          }}
        >
          <ExpansionPanelSummary
            expandIcon={(
              <div>
                {' '}
                <ExpandMore />
                {' '}
              </div>
            )}
            classes={{
              root: classes.expansionPanelSummary,
              expanded: classes.expansionPanelSummaryExpaned,
              content: classes.expansionPanelSummaryContent,
              expandIcon: classes.expansionPanelSummaryExpandIcon,
            }}
          >
            <h4 className={classes.title} style={{ width: '10%' }}>
              <Link
                className={classes.title}
                onClick={() => {
                  // add post id to redux state
                  dispatch({
                    type: SET_SELECTED_POST,
                    payload: _id,
                  })
                  history.push(url)
                }}
              >
                {title}
              </Link>
            </h4>
            <div
              style={{
                diplay: 'flex', width: '87%', alignItems: 'flex-end', flex: 'flex-shrink',
              }}
            >
              <GridContainer direction="row" justify="space-between" spacing={3}>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                  <img alt="" src={Chat} style={{ paddingBottom: '10px', marginLeft: '20px', marginRight: '5px' }} />
                  <p>
                    <span style={{ color: 'green' }}>{`+${upvotes}/`}</span>
                    <span style={{ color: 'red' }}>{`+${downvotes}`}</span>
                  </p>
                </div>
                <div
                  style={{
                    display: 'flex', alignItems: 'center', flexDirection: 'row', marginRight: '2%',
                  }}
                >
                  <Link onClick={() => handleCopy(DOMAIN + url, key)}>
                    {activeKey === key ? (
                      <Tooltip
                        placement="top"
                        title="URL copied"
                        onClose={() => setActiveKey(null)}
                        arrow
                        open
                      >
                        <img
                          alt=""
                          src={Send}
                          style={{ paddingBottom: '10px', paddingTop: '10px', marginRight: '10px' }}
                        />
                      </Tooltip>
                    ) : (
                      <img alt="" src={Send} style={{ paddingBottom: '10px', paddingTop: '10px', marginRight: '10px' }} />
                    )}
                  </Link>
                  <IconButton color="secondary" component="span" onClick={() => handleBookmark(_id)}>
                    {isBookmarked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                  {/* <img alt="" src={Heart} style={{ paddingBottom:"10px", paddingTop:"10px" }} /> */}
                </div>
              </GridContainer>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.expansionPanelDetails}>
            {stringLimit(text || '', 300)}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  })
}

export default function PostList({ Data, loading, limit }) {
  return (
    <GridContainer
      direction="column"
      justify="space-between"
      alignItems="center"
    >
      {loading ? (<AlertSkeletonLoader limit={limit} />) : <LoadPostsList data={Data} />}
    </GridContainer>
  )
}
