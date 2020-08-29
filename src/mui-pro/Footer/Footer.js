import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import {makeStyles, ThemeProvider} from "@material-ui/core/styles";
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import styles from "assets/jss/material-dashboard-pro-react/components/footerStyle";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";

const useStyles = makeStyles(styles);

export default function Footer(props) {
    const classes = useStyles();
    const {fluid, white, rtlActive} = props;
    const container = cx({
        [classes.container]: !fluid,
        [classes.containerFluid]: fluid,
        [classes.whiteColor]: white
    });
    const anchor =
        classes.a +
        cx({
            [" " + classes.whiteColor]: white
        });
    const block = cx({
        [classes.block]: true,
        [classes.whiteColor]: white
    });
    const preventDefault = (event) => event.preventDefault();
    return (
        <footer className={classes.footer}>
            <div className={container}>
                <GridContainer justify="left" style={{marginRight: 24}}>
                    <GridItem xs={9}>
                        <Typography>
                            &copy;{" "}
                            VoxPopuli, PBC made with &hearts; on Earth*
                            <div className={classes.grow}/>
                        </Typography>
                    </GridItem>

                    <GridItem xs={3} className={classes.right}>
                        <Typography className={classes.links}>
                            <Link href="#invest" color="inherit">
                                Invest
                            </Link>
                            <Link href="#careers" color="inherit">
                                Careers
                            </Link>
                            <Link href="#about-us" color="inherit">
                                About Us
                            </Link>
                        </Typography>
                    </GridItem>
                </GridContainer>
            </div>


            {/*<div className={container}>*/}
            {/*    <div className={classes.left}>*/}
            {/*        <List className={classes.list}>*/}
            {/*            <ListItem className={classes.inlineBlock}>*/}
            {/*            &copy;{" "}*/}
            {/*            VoxPopuli, PBC made with &hearts; on Earth*/}
            {/*            </ListItem>*/}
            {/*        </List>*/}
            {/*    </div>*/}
            {/*    <div className={classes.right}>*/}
            {/*        <List className={classes.list}>*/}
            {/*            <ListItem className={classes.inlineBlock}>*/}
            {/*                <a href="#invest" className={block}>*/}
            {/*                    Invest*/}
            {/*                </a>*/}
            {/*            </ListItem>*/}
            {/*            <ListItem className={classes.inlineBlock}>*/}
            {/*                <a href="#careers" className={block}>*/}
            {/*                    Careers*/}
            {/*                </a>*/}
            {/*            </ListItem>*/}
            {/*            <ListItem className={classes.inlineBlock}>*/}
            {/*                <a href="#about-us" className={block}>*/}
            {/*                    About Us*/}
            {/*                </a>*/}
            {/*            </ListItem>*/}
            {/*        </List>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </footer>
    );
}

Footer.propTypes = {
    fluid: PropTypes.bool,
    white: PropTypes.bool,
    rtlActive: PropTypes.bool
};
