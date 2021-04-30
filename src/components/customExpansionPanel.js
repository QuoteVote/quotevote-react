// TODO: Fix links to have href
import React from 'react'
import PropTypes from 'prop-types'
// @material-ui/core components

import { makeStyles } from '@material-ui/core/styles'
import { Link, Tooltip } from '@material-ui/core'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
// @material-ui/icons
import ExpandMore from '@material-ui/icons/ExpandMore'
import styles from 'assets/jss/material-dashboard-pro-react/components/accordionStyle'
import GridContainer from 'mui-pro/Grid/GridContainer'
// import GridItem from 'mui-pro/Grid/GridItem'
import limit from 'string-limit'
import copy from 'clipboard-copy'
import Send from '../assets/img/Send.svg'
import Heart from '../assets/img/Heart.svg'
import Chat from '../assets/img/Chat.svg'

const useStyles = makeStyles(styles)

export default function CustomAccordion({ collapses, active: activeProp }) {
  const DOMAIN = process.env.REACT_APP_DOMAIN || 'localhost:3000'
  const [active, setActive] = React.useState(activeProp)
  const [activeKey, setActiveKey] = React.useState(null)
  const handleChange = (panel) => (event, expanded) => {
    setActive(expanded ? panel : -1)
  }
  const classes = useStyles()
  const handleCopy = (shareableLink, key) => {
    copy(shareableLink)
    setActiveKey(key)
  }
  return (
    <div className={classes.root}>
      {collapses.map((prop, key) => {
        const {
          text, /* _id, */ title, upvotes, downvotes, url,
        } = prop
        // const postURL = `/post/${title}/${_id}`
        return (
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
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <Link
                  className={classes.title}
                  tp
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
                    <img alt="Chat icon" src={Chat} style={{ paddingBottom: '10px', marginLeft: '20px', marginRight: '5px' }} />
                    <p>
                      <span style={{ color: 'green' }}>{`+${upvotes}`}</span>
                      <span style={{ color: 'red' }}>{`+${downvotes}`}</span>
                    </p>
                  </div>
                  <div
                    style={{
                      display: 'flex', alignItems: 'center', flexDirection: 'row', marginRight: '2%',
                    }}
                  >
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Link onClick={() => handleCopy(DOMAIN + url, key)}>
                      {activeKey === key ? (
                        <Tooltip
                          placement="top"
                          title="URL copied"
                          onClose={() => setActiveKey(null)}
                          arrow
                          open
                        >
                          <img alt="Send icon" src={Send} style={{ paddingBottom: '10px', paddingTop: '10px', marginRight: '10px' }} />
                        </Tooltip>
                      ) : (
                        <img alt="Send icon" src={Send} style={{ paddingBottom: '10px', paddingTop: '10px', marginRight: '10px' }} />
                      )}
                    </Link>
                    <img alt="Heart icon" src={Heart} style={{ paddingBottom: '10px', paddingTop: '10px' }} />
                  </div>
                </GridContainer>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.expansionPanelDetails}>
              {limit(text || '', 300)}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )
      })}
    </div>
  )
}

CustomAccordion.defaultProps = {
  active: -1,
}

CustomAccordion.propTypes = {
  // index of the default active collapse
  active: PropTypes.number,
  collapses: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.node,
    })
  ).isRequired,
}
