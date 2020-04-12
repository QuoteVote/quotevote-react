import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// @material-ui/icons
import ExpandMore from "@material-ui/icons/ExpandMore";
import styles from "assets/jss/material-dashboard-pro-react/components/accordionStyle.js";
import Chat from '../hhsbAssets/Chat.svg'
import Heart from '../hhsbAssets/Heart.svg'
import Send from '../hhsbAssets/Send.svg'

import GridContainer from "mui-pro/Grid/GridContainer.js";
import GridItem from "mui-pro/Grid/GridItem.js";

const useStyles = makeStyles(styles);

export default function CustomAccordion(props) {
  const [active, setActive] = React.useState(props.active);
  const handleChange = panel => (event, expanded) => {
    setActive(expanded ? panel : -1);
  };
  const classes = useStyles();
  const { collapses } = props;
  return (
    <div className={classes.root}>
      {collapses.map((prop, key) => {
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
               <h4 className={classes.title} style={{width:"10%"}}>{prop.title}</h4>
              <div style={{diplay:'flex',width:"87%",alignItems:'flex-end',flex:'flex-shrink'}}>
             
              <GridContainer direction="row"  justify="space-between"  spacing={3}>
                
                <div  style={{display:'flex',alignItems:'center',flexDirection: "row"}}>
                <img src={Chat} style={{paddingBottom:"10px",marginLeft:"20px",marginRight:'5px'}} />
                <p>+1000/-504 </p>
                </div>
              
                
                <div style={{display:'flex',alignItems:'center',flexDirection: "row"}}>
                <img src={Send} style={{paddingBottom:"10px",paddingTop:"10px",marginRight:'10px'}} />
                
                <img src={Heart} style={{paddingBottom:"10px",paddingTop:"10px"}} />
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
