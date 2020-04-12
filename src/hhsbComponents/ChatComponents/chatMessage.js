import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles(props=>({
  card: {
    width:"100%"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  UserName: {
    backgroundColor: props => props.color,
   
  }
}));

export default function Message(props) {
  const classes = useStyles(props);
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div style={{width:"95%"}}>
      <Card className={classes.card}>
        <CardContent>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-end"
          >
            <FaceIcon style={{ paddingBottom: "5px", paddingRight: "5px" }} />
            <Chip className={classes.UserName} label={props.username} />
          </Grid>
          <br />
          <br />
          <Typography variant="body2" component="p">
            {props.content}
          </Typography>
        </CardContent>
        <Divider />
        <CardActions>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-end"
          >
            <Button
              variant="contained"
              size="small"
              color="primary"
              className={classes.margin}
              style={{ backgroundColor: "#00CAE3", borderRadius: "15px" }}
            >
              <FavoriteOutlinedIcon />
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </div>
  );
}
