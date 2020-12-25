import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import styles from "assets/jss/material-dashboard-pro-react/components/footerStyle";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { fluid, white } = props;
  const container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.whiteColor]: white
  });
  return (
    <footer className={classes.footer}>
      <div className={container}>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item xs={12} sm={9}>
            <Typography>
              &copy;{" "}
              VoxPopuli, PBC made with &hearts; on Earth*
              <div className={classes.grow} />
            </Typography>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Typography className={classes.links}>
              <Link href="#invest" color="inherit">
                Invest
              </Link>
              <Link href="#careers" color="inherit">
                Careers
              </Link>
              <Link href="/auth/about" color="inherit">
                About Us
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  fluid: PropTypes.bool,
  white: PropTypes.bool,
  rtlActive: PropTypes.bool
};
