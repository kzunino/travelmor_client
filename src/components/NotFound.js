import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';

import {useTheme, makeStyles} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {black} from 'color-name';

const useStyles = makeStyles((theme) => ({
  heading: {
    color: theme.palette.mainHeading.main,
  },
  notAuthHeading: {
    color: black,
    marginLeft: 15,
  },
  divider: {
    backgroundColor: theme.palette.boxContentBudgetData.main,
  },
  container: {
    marginLeft: 0,
    padding: 0,
    marginTop: '1em',
  },
}));

const NotFound = ({isAuthenticated}) => {
  const theme = useTheme();
  const classes = useStyles();
  const matchXs = useMediaQuery(theme.breakpoints.down('xs'));
  console.log(isAuthenticated);
  return (
    <>
      <Typography
        className={
          isAuthenticated === undefined || isAuthenticated === false
            ? classes.notAuthHeading
            : classes.heading
        }
        variant={matchXs ? 'h4' : 'h2'}
      >
        Error
      </Typography>
      <Divider
        className={
          isAuthenticated === undefined || isAuthenticated === false
            ? classes.notAuthHeading
            : classes.divider
        }
      />
      <Container maxWidth={'lg'} className={classes.container}>
        <Typography
          className={
            isAuthenticated === undefined || isAuthenticated === false
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
