import { omit } from "lodash";
import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import CircularProgress from "@material-ui/core/CircularProgress";

// @material-ui/icons
import Face from "@material-ui/icons/Face";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

// login method
import { userLogin } from "actions/login";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { tokenValidator } from "../../actions/login";

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";

const useStyles = makeStyles(styles);

export default function LoginPage() {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, loginError } = useSelector(state => state.loginReducer);
  const [input, setInput] = React.useState({ password: "", username: "" });

  setTimeout(function() {
    setCardAnimation("");
  }, 700);

  const classes = useStyles();
  const handleInputs = e => {
    const { id, value } = e.target;
    setInput({ ...omit(input, [id]), [id]: value });
  };
  const handleSubmit = event => {
    console.log('submitting')
    const { username, password } = input;
    userLogin(username, password, dispatch, history);
    event.preventDefault();
  };
  const handleFormSubmit = e => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };
  return (
    <div className={classes.container}>
      {tokenValidator() && history.push("/hhsb/Home")}
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <form onKeyPress={e => handleFormSubmit(e)}>
            <Card login className={classes[cardAnimaton]}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="rose"
              >
                <h4 className={classes.cardTitle}>Log in</h4>
                <div className={classes.socialLine}>
                  {[
                    "fab fa-facebook-square",
                    "fab fa-twitter",
                    "fab fa-google-plus"
                  ].map((prop, key) => {
                    return (
                      <Button
                        color="transparent"
                        justIcon
                        key={key}
                        className={classes.customButtonClass}
                      >
                        <i className={prop} />
                      </Button>
                    );
                  })}
                </div>
              </CardHeader>
              <CardBody>
                <CustomInput
                  labelText="Username"
                  id="username"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Face className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    ),
                    onChange: e => handleInputs(e)
                  }}
                  error={loginError}
                />
                <CustomInput
                  labelText="Password"
                  id="password"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputAdornmentIcon}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    ),
                    onChange: e => handleInputs(e),
                    type: "password",
                    autoComplete: "off"
                  }}
                  error={loginError}
                  helperText={loginError}
                />
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                {loading ? (
                  <CircularProgress color="secondary" />
                ) : (
                  <Button
                    onClick={e => handleSubmit(e)}
                    color="rose"
                    simple
                    size="lg"
                    block
                  >
                    LOGIN
                  </Button>
                )}
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
