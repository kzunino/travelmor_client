import {createMuiTheme} from '@material-ui/core/styles';

const mainBlue = '#4bb0f8';
//const softWheat = '#dfd8c8';
const softWheat = '#dbe9f4';
const lightBeige = '#faf8f4';
const lightGray = '#6e757c';
const white = '#fff';
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
    },
    boxContentBudgetHeading: {
      main: lightGray,
    },
    boxContentBudgetData: {
      main: white,
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
        color: lightGray,
      },
      iconDirectionAsc: {
        color: lightGray,
      },
    },
    MuiSvgIcon: {
      root: {
        fill: lightGray,
      },
    },
    Component: {
      horizontalScrollContainer: {
        '&:72': {
          overflowY: 'auto',
          margin: 0,
          padding: 0,
          listStyle: 'none',
          height: '100%',
          '&::-webkit-scrollbar': {
            width: '0.4em',
          },
          '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: lightGray,
            outline: `1px solid ${lightGray}`,
          },
        },
      },
    },
  },
});

export default theme;
