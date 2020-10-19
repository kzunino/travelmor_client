import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';

import {useTheme, makeStyles} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  heading: {
    color: theme.palette.mainHeading.main,
  },
  divider: {
    backgroundColor: theme.palette.boxContentBudgetData.main,
  },
  subheading: {
    color: 'rgb(212,212,216)',
    lineHeight: 1.5,
  },
  container: {
    backgroundColor: theme.palette.boxBackground.main,
    borderRadius: 5,
    marginTop: '1em',
    padding: 5,
    [theme.breakpoints.up('md')]: {
      marginLeft: 0,
    },
  },
}));

const About = () => {
  const theme = useTheme();
  const classes = useStyles();
  const matchXs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      {/* <main className={classes.content}>
        <Toolbar /> */}
      <Typography className={classes.heading} variant={matchXs ? 'h4' : 'h2'}>
        About
      </Typography>
      <Divider className={classes.divider} />
      <Container maxWidth={'lg'} className={classes.container}>
        <Typography className={classes.heading} variant='h5'>
          The Short
        </Typography>
        <Typography paragraph className={classes.subheading}>
          Travelmor is an idea created after four years of periodic backpacking
          around South America. In order to prepare for an extended journey, I
          always saved a large sum of money and then divided my money by the
          amount of days I planned on traveling in order to get an average daily
          budget. What I could have used was a very simple budget calculator
          that let me input my spending to keep an eye on my finances without
          all complicated bells and whistles.
        </Typography>
        <Typography className={classes.heading} variant='h5'>
          The Long
        </Typography>
        <Typography paragraph className={classes.subheading}>
          My name is Kyle Zunino and I am from the San Francisco Bay Area. After
          graduating from college I decided to save money and go on a long
          backpacking journey through Latin America. To prepare for this
          adventure, I saved up a large chunk of change and calculated out how
          much I could spend every day for six months in order to stay within my
          budget. So I made a mental note and tried to live within my daily
          means; however, some days it was impossible because I had large
          expenses like becoming PADI certified or paying guides to take me
          mountain biking 250 kilometers across Mexico. So I constantly found
          myself recounting how much I had spent from my overall budget and
          recalculating my new daily budget. Could I have used excel? Of course,
          but I didn't have a computer. <br />
          <br />
          Fast forward a couple more years: I had decided to live in Peru and
          Colombia for an extended amount of time to learn Spanish. I found
          myself budgeting the exact same way even though my traveling style had
          changed. What I wanted was a light weight, easy way to either input
          everything I bought for the day or just add in how much I spent
          overall. So I came up with the idea of Travelmor.
        </Typography>
      </Container>
      {/* </main> */}
    </>
  );
};

export default About;
