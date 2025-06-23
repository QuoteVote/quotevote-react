import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Typography, InputBase, Paper,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'calc(100vh - 64px)', // Adjusting for header height
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#f0f2f5',
  },
  container: {
    maxWidth: 600,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(4),
  },
  logoImage: {
    width: '100%',
    maxWidth: 500,
    height: 'auto',
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(1, 2),
    marginBottom: theme.spacing(2),
    border: '1px solid #ddd',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
    color: theme.palette.text.secondary,
  },
  tagline: {
    color: theme.palette.text.secondary,
  },
}));

export default function SearchPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container direction="column" alignItems="center" className={classes.container}>
        <Grid item>
          <div className={classes.logoContainer}>
            <img src="/assets/search-quote-vote.png" alt="logo" className={classes.logoImage} />
          </div>
        </Grid>
        <Grid item style={{ width: '100%' }}>
          <Paper component="form" className={classes.searchBar}>
            <InputBase
              className={classes.input}
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
            />
            <SearchIcon className={classes.iconButton} />
          </Paper>
        </Grid>
        <Grid item>
          <Typography className={classes.tagline}>
            No algorithms. No ads. Just conversations.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
} 