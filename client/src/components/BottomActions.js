import React from 'react';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ListIcon from '@material-ui/icons/List';
import HistoryIcon from '@material-ui/icons/History';

import AddExpense from './AddExpense';

//Modal
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginLeft: 0,
    },
    marginLeft: drawerWidth,
    width: '100%',
    position: 'fixed',
    bottom: 0,
    zIndex: 100,
  },

  navActionButtons: {
    '& > :first-child': {
      marginRight: drawerWidth,
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
      '& > :first-child': {
        marginRight: 0,
      },
    },
  },

  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      width: '95%',
      margin: 'auto',
    },
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const BottomActions = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        classes={{wrapper: classes.wrapper, root: classes.navActionButtons}}
        label='Expenses'
        icon={<ListIcon />}
        disableRipple
        component={Link}
        to='/dashboard/history'
      />
      <BottomNavigationAction
        classes={{wrapper: classes.wrapper, root: classes.navActionButtons}}
        label='Add'
        icon={<AddCircleIcon />}
        disableRipple
        onClick={handleOpen}
      />
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <AddExpense />
          </div>
        </Fade>
      </Modal>

      <BottomNavigationAction
        classes={{wrapper: classes.wrapper, root: classes.navActionButtons}}
        label='Trips'
        icon={<HistoryIcon />}
        disableRipple
        component={Link}
        to='/history'
      />
    </BottomNavigation>
  );
};

export default BottomActions;
