import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';

import {useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// import useMediaQuery from '@material-ui/core/useMediaQuery';

// const drawerWidth = 240;

// const useStyles = makeStyles((theme) => ({}));

const ContactUs = () => {
  const theme = useTheme();
  // const classes = useStyles();
  const matchXs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      <Typography variant={matchXs ? 'h4' : 'h2'}>Contact</Typography>
      <Divider />
      <Container maxWidth={'lg'}>
        <Typography paragraph>Travelmor@gmail.com</Typography>
      </Container>{' '}
    </>
  );
};

export default ContactUs;
