import React from 'react';
// import {Link} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  containerWrapper: {
    marginTop: theme.spacing(4),
    padding: 15,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(0),
    },
  },
}));

export default function SignIn() {
  const classes = useStyles();

  return (
    <Container
      component='main'
      maxWidth='xs'
      className={classes.containerWrapper}
    >
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant={'h3'}>An email has been sent to</Typography>
      </div>
    </Container>
  );
}
