import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';

import {useTheme, makeStyles} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  heading: {
    color: theme.palette.mainHeading.main,
    marginLeft: 15,
  },
  notAuthHeading: {
    color: theme.palette.mainHeading.main,
    marginLeft: 15,
  },
  divider: {
    backgroundColor: theme.palette.mainHeading.main,
  },
  container: {
    marginLeft: 0,
    padding: 0,
    marginTop: '1em',
  },
}));

const NotFound = (auth) => {
  const theme = useTheme();
  const classes = useStyles();
  const matchXs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      <Typography
        className={
          auth === undefined || auth === false
            ? classes.notAuthHeading
            : classes.heading
        }
        variant={matchXs ? 'h4' : 'h2'}
      >
        Error
      </Typography>
      <Divider
        className={
          auth === undefined || auth === false
            ? classes.notAuthHeading
            : classes.divider
        }
      />
      <Container maxWidth={'lg'} className={classes.container}>
        <Typography
          className={
            auth === undefined || auth === false
              ? classes.notAuthHeading
              : classes.heading
          }
          paragraph
        >
          404 Page not found!
        </Typography>
      </Container>{' '}
    </>
  );
};

export default NotFound;
