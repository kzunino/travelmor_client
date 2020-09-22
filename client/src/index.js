import React from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from './styles/theme';

import {Provider} from 'react-redux';
import store from './store';

//date picker provider

import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import 'fontsource-roboto';
import './styles/global.css';

import App from './App';

ReactDOM.render(
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </MuiPickersUtilsProvider>,
  document.getElementById('root')
);
