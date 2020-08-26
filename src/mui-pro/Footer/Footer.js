/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import styles from "assets/jss/material-dashboard-pro-react/components/footerStyle";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { fluid, white, rtlActive } = props;
  var container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.whiteColor]: white
  });
  var anchor =
    classes.a +
    cx({
      [" " + classes.whiteColor]: white
    });
  var block = cx({
    [classes.block]: true,
    [classes.whiteColor]: white
  });
  return (
    <footer className={classes.footer}>
      <div className={container}>
        <p className={classes.left}>
          &copy;{" "}
          VoxPopuli, PBC made with &hearts; on Earth
        </p>
        <div className={classes.right}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="#invest" className={block}>
                Invest
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#careers" className={block}>
                Careers
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#about-us" className={block}>
                About Us
              </a>
            </ListItem>
          </List>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  fluid: PropTypes.bool,
  white: PropTypes.bool,
  rtlActive: PropTypes.bool
};
