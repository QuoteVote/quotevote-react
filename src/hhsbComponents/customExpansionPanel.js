import PropTypes from "prop-types";
import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Link, Tooltip } from "@material-ui/core"
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// @material-ui/icons
import ExpandMore from "@material-ui/icons/ExpandMore";
import styles from "assets/jss/material-dashboard-pro-react/components/accordionStyle.js";
import Chat from '../hhsbAssets/Chat.svg'
import Heart from '../hhsbAssets/Heart.svg'
import Send from '../hhsbAssets/Send.svg'
import GridContainer from "components/Grid/GridContainer.js";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles(styles);

export default function CustomAccordion(props) {
  const history = useHistory();
  const [active, setActive] = React.useState(props.active);
  const [activeKey, setActiveKey] = React.useState(null);
  const handleChange = panel => (event, expanded) => {
    setActive(expanded ? panel : -1);
  };
  const classes = useStyles();
  const { collapses } = props;
  const handleCopy = (shareableLink, key) => {
    const textArea = document.createElement("textarea")
    textArea.value = shareableLink
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    document.execCommand("copy")
    document.body.removeChild(textArea)
    setActiveKey(key);
  }
  return (
    <div className={classes.root}>
      {collapses.map((prop, key) => {
        const postURL = `/hhsb/post/${prop.domain.key}/${prop._id}`
        return (
          <ExpansionPanel
            expanded={active === key}
            onChange={handleChange(key)}
            key={key}
            classes={{
              root: classes.expansionPanel,
              expanded: classes.expansionPanelExpanded
            }}
          >
            <ExpansionPanelSummary
              expandIcon={<div> <ExpandMore/> </div>}
              classes={{
                root: classes.expansionPanelSummary,
                expanded: classes.expansionPanelSummaryExpaned,
                content: classes.expansionPanelSummaryContent,
                expandIcon: classes.expansionPanelSummaryExpandIcon
              }}
            >
              <h4 className={classes.title} style={{ width:"10%" }}>
                <Link
                  className={classes.title}
                  onClick={() => history.push(postURL)}
                >
                  {prop.title}
                </Link>
              </h4>
              <div style={{ diplay:'flex', width:"87%", alignItems:'flex-end', flex:'flex-shrink' }}>
                <GridContainer direction="row" justify="space-between" spacing={3}>
                  <div style={{ display:'flex', alignItems:'center', flexDirection: "row" }}>
                    <img alt="" src={Chat} style={{ paddingBottom:"10px", marginLeft:"20px", marginRight:'5px' }} />
                    <p>
                      <span style={{ color: "green" }}>{`+${prop.scoreDetails.upvotes}`}</span>
                      <span style={{ color: "red" }}>{`+${prop.scoreDetails.downvotes}`}</span>
                    </p>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', flexDirection: "row", marginRight: '2%' }}>
                    <Link onClick={() => handleCopy(postURL, key)}>
                      {activeKey === key ? (
                        <Tooltip
                          placement="top"
                          title="URL copied"
                          onClose={() => setActiveKey(null)}
                          arrow
                          open
                        >
                          <img alt="" src={Send} style={{ paddingBottom:"10px", paddingTop:"10px", marginRight:'10px' }} />
                        </Tooltip>
                      ) : (
                        <img alt="" src={Send} style={{ paddingBottom:"10px", paddingTop:"10px", marginRight:'10px' }} />
                      )}
                    </Link>
                    <img alt="" src={Heart} style={{ paddingBottom:"10px", paddingTop:"10px" }} />
                  </div>
                </GridContainer>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.expansionPanelDetails}>
              {prop.content}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
    </div>
  );
}

CustomAccordion.defaultProps = {
  active: -1
};

CustomAccordion.propTypes = {
  // index of the default active collapse
  active: PropTypes.number,
  collapses: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.node
    })
  ).isRequired
};
