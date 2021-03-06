import React, {useState, useEffect, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {logout} from '../actions/auth';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Components
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import InfoIcon from '@material-ui/icons/Info';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FlightIcon from '@material-ui/icons/Flight';
import HistoryIcon from '@material-ui/icons/History';

import logo from '../imgs/travelmorLogo.png';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '1em',
  },
  root: {
    display: 'flex',
  },
  appBar: {
    // zIndex: theme.zIndex.modal + 1,
    zIndex: 1290,
    //changes appbar color opacity
    backgroundColor: 'rgba(30, 30, 54, .8)',
  },
  toolbar: {
    padding: 0,
  },
  logoContainer: {
    padding: 0,
  },
  logo: {
    width: drawerWidth,
    height: '5.5em',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: `linear-gradient( rgb(75,176,248), rgb(55,94,235))`,
  },
  modal: {
    // zIndex: 1289,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  drawerIconContainer: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
    marginLeft: 'auto',
  },
  drawerItemSelected: {
    '& .MuiListItemText-root': {
      opacity: 1,
    },
  },
  drawerIcon: {
    height: ' 50px',
    width: '50px',
    color: theme.palette.primary.main,
  },
  list: {
    color: 'white',
    [theme.breakpoints.up('sm')]: {
      padding: 0,
    },
  },
  icon: {
    color: 'white',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const AuthHeader = ({logout, trips}) => {
  const theme = useTheme();
  const classes = useStyles();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  //Component State Management
  const [openDrawer, setOpenDrawer] = useState(false);
  const [value, setValue] = useState(0);
  const [tripValue, setTripValue] = useState(null);
  const [openCollapse, setOpenCollapse] = React.useState(false);

  const handleClick = () => {
    setOpenCollapse(!openCollapse);
  };

  //Drawer List - active indexes on dividers too
  const drawerItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon className={classes.icon} />,
      link: '/dashboard',
      activeIndex: 0,
    },
    {
      text: 'My Trips',
      icon: <CardTravelIcon className={classes.icon} />,
      activeIndex: 1,
    },
    {
      text: 'History',
      icon: <HistoryIcon className={classes.icon} />,
      link: '/history',
      activeIndex: 2,
    },
    {
      text: 'New Trip',
      icon: <FlightTakeoffIcon className={classes.icon} />,
      link: '/newtrip',
      activeIndex: 3,
    },
    {
      text: 'Divider',
      divider: <DashboardIcon className={classes.icon} />,
    },
    {
      text: 'About Us',
      icon: <InfoIcon className={classes.icon} />,
      link: '/about',
      activeIndex: 4,
    },
    {
      text: 'Contact Us',
      icon: <RecentActorsIcon className={classes.icon} />,
      link: '/contact',
      activeIndex: 5,
    },
    {
      text: 'Divider',
      divider: <DashboardIcon className={classes.icon} />,
    },
    {
      text: 'My Account',
      icon: <AccountBoxIcon className={classes.icon} />,
      link: '/account',
      activeIndex: 7,
    },
    {
      text: 'Logout',
      icon: <ExitToAppIcon className={classes.icon} />,
      activeIndex: 8,
    },
  ];

  //Maps trips into the dashboard navigation with UUID as parameter
  trips.map((trip) => {
    return {
      name: `${trip.name}`,
      link: `/trip/${trip.trip_uid}`,
      trip_uid: `/trip/${trip.trip_uid}`,
      activeIndex: 0,
    };
  });

  useEffect(() => {
    // checks window URL, and renders the selected prop to the correct
    // dashboard item in order to highlight the navigation link
    [...drawerItems, ...trips].forEach((route) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (value !== route.activeIndex) {
            setValue(route.activeIndex);
          }
          break;
        case `${route.link}/${route.trip_uid}`:
          if (tripValue !== route.trip_uid) {
            setTripValue(route.trip_uid);
            setValue(1);
          }
          break;
        default:
          break;
      }
    });
  }, [drawerItems, trips, tripValue, value]);

  const list = (
    <>
      <Toolbar className={classes.toolbarMargin} />
      <div className={classes.drawerContainer}>
        <List className={classes.list}>
          {drawerItems.map((item, index) => {
            if (item.divider) {
              return <Divider key={`${item}, ${index}`} />;
            } else if (item.text === 'My Trips') {
              return (
                <Fragment key={index + 10}>
                  <ListItem
                    button
                    key={`${item}, ${index}`}
                    onClick={handleClick}
                    selected={value === item.activeIndex}
                  >
                    <ListItemIcon className={classes.icon}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                    {openCollapse ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse
                    in={openCollapse}
                    timeout='auto'
                    unmountOnExit
                    key={`${item.text}, ${index + 1}`}
                  >
                    <List disablePadding>
                      {trips.map((trip, index) => {
                        return (
                          <ListItem
                            button
                            className={classes.nested}
                            key={`${trip.trip_uid}${index}`}
                            component={Link}
                            to={`/trip/${trip.trip_uid}`}
                            onClick={() => {
                              setValue(1);
                              setTripValue(trip.trip_uid);
                              setOpenDrawer(false);
                            }}
                            selected={tripValue === trip.trip_uid}
                          >
                            <ListItemIcon className={classes.icon}>
                              <FlightIcon />
                            </ListItemIcon>
                            <ListItemText primary={trip.name} />
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                </Fragment>
              );
            } else if (item.text === 'Logout') {
              return (
                <ListItem
                  button
                  key={`${item.text}, ${index}`}
                  selected={value === item.activeIndex}
                  onClick={logout}
                >
                  <ListItemIcon className={classes.icon}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              );
            } else {
              return (
                <ListItem
                  button
                  key={`${item.text}, ${index}`}
                  component={Link}
                  to={item.link}
                  selected={value === item.activeIndex}
                  onClick={() => {
                    setTripValue(item.activeIndex);
                    setOpenDrawer(false);
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              );
            }
          })}
        </List>
      </div>
    </>
  );

  //renders drawer component depending on media breakpoint
  const drawer = (
    <Drawer
      className={classes.drawer}
      variant={'permanent'}
      anchor={'left'}
      classes={{
        paper: classes.drawerPaper,
        // modal: classes.modal,
        root: classes.modal,
      }}
    >
      {list}
    </Drawer>
  );
  //renders Temporary drawer on smaller screens
  const tempDrawer = (
    <>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
        className={classes.drawerIconContainer}
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>

      <SwipeableDrawer
        style={{zIndex: 1289}}
        classes={{paper: classes.drawerPaper}}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        anchor='right'
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
      >
        <div className={classes.drawer} role='presentation' anchor='right'>
          {list}
        </div>
      </SwipeableDrawer>
    </>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Button
            component={Link}
            to='/dashboard'
            className={classes.logoContainer}
            disableRipple
          >
            <img src={logo} alt='Travelmor. logo' className={classes.logo} />
          </Button>
          {matches ? null : tempDrawer}
        </Toolbar>
      </AppBar>
      {/* media query to render clipped drawer */}
      {matches ? drawer : null}
    </div>
  );
};

AuthHeader.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  trips: PropTypes.array,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  trips: state.auth.user.trips,
});

export default connect(mapStateToProps, {logout})(AuthHeader);
