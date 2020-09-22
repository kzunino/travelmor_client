import React, {useState, forwardRef} from 'react';
import Moment from 'moment';

import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// Table Imports

// Table

import MaterialTable from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
// import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import {makeStyles, useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Line Chart imports
import {Line} from 'react-chartjs-2';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '1em',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: drawerWidth,
    marginBottom: 50,
    backgroundColor: theme.palette.background.main,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      padding: theme.spacing(1, 1.5),
      marginTop: '1em',
    },
  },
  containerWrapper: {
    margin: 'auto',
  },
  //table styles

  tableWrapper: {
    marginTop: '2em',
    padding: 0,
  },
}));

const ExpenseHistory = () => {
  const theme = useTheme();
  const classes = useStyles();

  const [chartData, setChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Daily Spending',
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Daily Budget',
        data: [50, 50, 50, 50, 50, 50],
        fill: false,
        borderColor: '#742774',
      },
    ],
  });

  const [tableData, setTableData] = useState({
    columns: [
      {title: 'Name', field: 'expense_name'},
      {
        title: 'Cost',
        field: 'expense_cost',
        type: 'currency',
        currencySetting: {
          currencyCode: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        },
      },
      {
        title: 'Type',
        field: 'expense_type',
        lookup: {
          1: 'Uncategorized',
          2: 'Accomodation',
          3: 'Food',
          4: 'Transportation',
          5: 'Entertainment',
          6: 'Tours',
          7: 'Shopping',
          8: 'Fees',
          9: 'Emergency',
          10: 'Miscellaneous',
        },
      },
      {
        title: 'Date',
        field: 'expense_date',
        type: 'date',
      },
    ],
    data: [
      {
        expense_name: 'Dinner',
        expense_cost: 10.01,
        expense_type: 3,
        expense_date: Moment(Date.now()).format('MM-DD-YYYY'),
      },
      {
        expense_name: 'Hostel',
        expense_cost: 8.0,
        expense_type: 2,
        expense_date: Moment(Date.now()).format('MM-DD-YYYY'),
      },
    ],
  });

  //Table Data

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    //Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  const matchXs = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <main className={classes.content}>
      <Toolbar />
      <Grid container direction='column' className={classes.containerWrapper}>
        {/* -----Welcome Container----- */}
        <Grid item>
          <Typography variant={matchXs ? 'h4' : 'h2'}>
            Peru Trip Expense History
          </Typography>
        </Grid>
        <Divider />
        <Container
          component='div'
          maxWidth='lg'
          className={classes.tableWrapper}
        >
          <Grid container direction='column'>
            {/* Line Chart Item */}
            <Grid item xs={12}>
              <Box m={1} boxShadow={3} className={classes.tableBox}>
                <Line data={chartData} />
              </Box>
            </Grid>
            {/* Table Item */}
            <Grid xs={12} item>
              <Box m={0} boxShadow={0} className={classes.tableBox}>
                <MaterialTable
                  title='Expenses'
                  options={{
                    search: false,
                  }}
                  columns={tableData.columns}
                  data={tableData.data}
                  icons={tableIcons}
                  editable={{
                    onRowAdd: (newData) =>
                      new Promise((resolve) => {
                        setTimeout(() => {
                          resolve();
                          setTableData((prevState) => {
                            const data = [...prevState.data];
                            data.push(newData);
                            return {...prevState, data};
                          });
                        }, 600);
                      }),
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve) => {
                        setTimeout(() => {
                          resolve();
                          if (oldData) {
                            setTableData((prevState) => {
                              const data = [...prevState.data];
                              data[data.indexOf(oldData)] = newData;
                              return {...prevState, data};
                            });
                          }
                        }, 600);
                      }),
                    onRowDelete: (oldData) =>
                      new Promise((resolve) => {
                        setTimeout(() => {
                          resolve();
                          setTableData((prevState) => {
                            const data = [...prevState.data];
                            data.splice(data.indexOf(oldData), 1);
                            return {...prevState, data};
                          });
                        }, 600);
                      }),
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </main>
  );
};

export default ExpenseHistory;
