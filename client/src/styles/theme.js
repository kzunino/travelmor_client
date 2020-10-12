import {createMuiTheme} from '@material-ui/core/styles';

const mainBlue = '#4bb0f8';
//const softWheat = '#dfd8c8';
const softWheat = '#dbe9f4';
const lightBeige = '#faf8f4';
const lightGray = '#6e757c';
const grey = 'grey';
const white = '#fff';
const offWhite = 'rgb(212,212,216)';
const darkPurple = 'rgb(30, 30, 54)';
const purple = 'rgb(39, 41, 59)';
//const offWhite = '#f8f8ff';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: mainBlue,
    },
    secondary: {
      main: softWheat,
    },
    background: {
      main: darkPurple,
    },
    boxBackground: {
      main: purple,
      form: offWhite,
    },
    mainHeading: {
      main: white,
    },
    boxContentBudgetHeading: {
      main: lightGray,
    },
    boxContentBudgetData: {
      main: white,
    },
    paragraph: {
      main: offWhite,
    },
    formInputs: {
      text: white,
      border: grey,
    },
    inputLabels: {
      color: grey,
    },
  },
  typography: {
    h2: {
      fontFamily: 'Raleway',
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.5,
    },
    h3: {
      fontFamily: 'Raleway',
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.5,
    },
    h4: {
      fontFamily: 'Raleway',
      fontSize: '1.75rem',
      fontWeight: 700,
      lineHeight: 1.5,
    },
    h5: {
      fontFamily: 'Raleway',
      fontSize: '1.50rem',
      fontWeight: 700,
      lineHeight: 1.5,
    },
    h6: {
      fontFamily: 'Raleway',
      fontSize: '1.25rem',
      fontWeight: 700,
      lineHeight: 1.5,
    },
    subtitle1: {
      lineHeight: 1.25,
      fontSize: '1rem',
      fontWeight: 500,
    },
    subtitle2: {
      lineHeight: 1.25,
      fontSize: '.75rem',
      fontWeight: 500,
      color: lightGray,
    },
    body1: {
      lineHeight: 1,
      fontSize: '1rem',
    },
  },

  overrides: {
    MuiTableSortLabel: {
      root: {
        color: lightGray,
        '&:hover': {
          color: 'white',
        },
        '&:focus': {
          color: mainBlue,
        },
      },
      active: {
        '&&': {
          color: mainBlue,
        },
      },
      icon: {
        color: lightGray,
      },
      iconDirectionDesc: {
        fill: lightGray,
      },
      iconDirectionAsc: {
        fill: lightGray,
      },
    },
  },
});

export default theme;
