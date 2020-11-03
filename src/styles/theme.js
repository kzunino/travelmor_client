import {createMuiTheme} from '@material-ui/core/styles';

const mainBlue = '#4bb0f8';
const lightGray = '#6e757c';
const grey = 'grey';
const white = '#fff';
// const ghostWhite = '#f8f8ff';
const offWhite = 'rgb(212,212,216)';
const darkPurple = 'rgb(30, 30, 54)';
const purple = 'rgb(39, 41, 59)';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: mainBlue,
    },
    secondary: {
      main: white,
      offWhite: offWhite,
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
      main: offWhite,
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
    listItems: {
      selected: grey,
    },
  },
  typography: {
    h2: {
      fontFamily: 'Roboto',
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.5,
    },
    h3: {
      fontFamily: 'Roboto',
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.5,
    },
    h4: {
      fontFamily: 'Roboto',
      fontSize: '1.75rem',
      fontWeight: 700,
      lineHeight: 1.5,
    },
    h5: {
      fontFamily: 'Roboto',
      fontSize: '1.50rem',
      fontWeight: 700,
      lineHeight: 1.5,
    },
    h6: {
      fontFamily: 'Roboto',
      fontSize: '1.10rem',
      fontWeight: 700,
      lineHeight: 1.5,
    },
    subtitle1: {
      lineHeight: 1.25,
      fontSize: '1rem',
      fontWeight: 500,
      color: offWhite,
    },
    subtitle2: {
      lineHeight: 1.25,
      fontSize: '.75rem',
      fontWeight: 500,
      color: offWhite,
    },
    body1: {
      lineHeight: 1,
      fontSize: '1rem',
    },
  },

  overrides: {
    MuiTableSortLabel: {
      root: {
        color: offWhite,
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

    //color of select
    MuiTablePagination: {
      root: {
        color: white,
      },
    },
    //Pagination expenses per page
    MuiTypography: {
      caption: {
        color: white,
      },
    },

    MuiTableCell: {
      body: {
        color: white,
      },
    },
  },
});

export default theme;
