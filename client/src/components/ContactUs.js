import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';

import {useTheme, makeStyles} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {mergeClasses} from '@material-ui/styles';

// import useMediaQuery from '@material-ui/core/useMediaQuery';

// const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  container: {
    marginLeft: 0,
    padding: 0,
  },
}));

const ContactUs = () => {
  const theme = useTheme();
  const classes = useStyles();
  const matchXs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      <Typography variant={matchXs ? 'h4' : 'h2'}>Contact</Typography>
      <Divider />
      <Container maxWidth={'lg'} className={classes.container}>
        <Typography paragraph>Travelmor@gmail.com</Typography>
      </Container>{' '}
    </>
  );
};

export default ContactUs;
