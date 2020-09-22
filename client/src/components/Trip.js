import React, {useState, forwardRef} from 'react';
// import {Link} from 'react-router-dom';
import Moment from 'moment';
import Typography from '@material-ui/core/Typography';
// import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import Button from '@material-ui/core/Button';
// import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';

//icons
import TodayIcon from '@material-ui/icons/Today';
import TimelineIcon from '@material-ui/icons/Timeline';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

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

//Charts
import {Bar} from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';

import {makeStyles, useTheme} from '@material-ui/core/styles';
// import useMediaQuery from '@material-ui/core/useMediaQuery';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '1em',
  },
  table: {
    minWidth: 300,
    maxWidth: 700,
  },
  toolbar: {
    padding: 0,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: drawerWidth,
    marginBottom: 50,
    //backgroundColor: '#2F2F31',
    backgroundColor: 'whitesmoke',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      padding: theme.spacing(1, 1.5),
      marginTop: '1em',
    },
  },
  container: {
    padding: 0,
  },
  containerWrapper: {
    margin: 'auto',
  },
  button: {
    marginTop: '1em',
    borderRadius: '2em',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },

  // mainContentBox: {
  //   //backgroundColor: theme.palette.secondary.light,
  //   backgroundColor: theme.palette.background.main,
  //   marginTop: '2em',
  //   marginLeft: 0,
  //   marginRight: 0,
  //   paddingTop: '1em',
  //   paddingBottom: '1em',
  //   display: 'flex',
  // },

  chartContainer: {
    height: '15em',
    padding: 5,
    [theme.breakpoints.down('xs')]: {
      height: '12em',
    },
  },

  icon: {
    marginLeft: 15,
  },
  accountBalanceColor: {
    color: 'rgb(96, 202, 235)',
  },
  dailyIconColor: {
    color: 'rgb(232, 81, 82)',
  },
  todayIconColor: {
    color: 'rgb(218,112,214)',
  },
  spendingWidgetTitle: {
    marginRight: 15,
  },
  divider: {
    marginBottom: '1em',
  },
  mainBoxBudgetItems: {
    padding: '1em',
    textAlign: 'left',
  },

  underBudgetColor: {
    color: '#56a655',
  },
  overBudgetColor: {
    color: '#ce4c52',
  },
  budgetHeading: {
    color: theme.palette.boxContentBudgetHeading.main,
  },
  headingBox: {
    padding: 15,
    borderRadius: 3,
  },
  spendingInfoWidgetBox: {
    padding: 10,
    borderRadius: 3,
  },
  budgetBox: {
    padding: 15,
    borderRadius: 3,
    [theme.breakpoints.down('xs')]: {
      padding: 5,
    },
  },
  tableBox: {
    padding: 8,
  },
}));

const Trip = () => {
  // const theme = useTheme();
  const classes = useStyles();

  const [barState, setBarState] = useState({
    labels: [
      Moment(Date.now()).subtract(6, 'days').format('ddd'),
      Moment(Date.now()).subtract(5, 'days').format('ddd'),
      Moment(Date.now()).subtract(4, 'days').format('ddd'),
      Moment(Date.now()).subtract(3, 'days').format('ddd'),
      Moment(Date.now()).subtract(2, 'days').format('ddd'),
      Moment(Date.now()).subtract(1, 'days').format('ddd'),
      'Today',
    ],
    datasets: [
      {
        label: '$',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 23, 34, 81, 56, 25, 14],
      },
    ],
  });

  const [pieStateData, setPieStateData] = useState({
    labels: [
      'Uncategorized',
      'Accommodation',
      'Food',
      'Transportation',
      'Entertainment',
      'Tours',
      'Shopping',
      'Fees',
      'Emergencies',
      'Miscellaneous',
    ],
    datasets: [
      {
        data: [200, 400, 2850],
        backgroundColor: [
          'red',
          'blue',
          'green',
          'black',
          'purple',
          'orange',
          'tomato',
          'violet',
          'grey',
          'yellow',
        ],
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

  // const matchXs = useMediaQuery(theme.breakpoints.down('xs'));

  //prevents table from exceeding boundaries
  // const matchesTable = useMediaQuery('(max-width:648px)');

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

  return (
    <>
      {/* <main className={classes.content}>
        <Toolbar />
        <Grid container direction='column' className={classes.containerWrapper}>
          <Container maxWidth={'lg'} className={classes.container}> */}
      <Grid item>
        <Grid container justify='space-between'>
          {/* Heading Box Item */}
          <Grid item xs={12}>
            <Box m={1} boxShadow={3} className={classes.headingBox}>
              <Grid item>
                <Grid container justify='center'>
                  <Grid item>
                    <Typography variant='h3'>Peru Trip</Typography>
                    <Typography
                      variant='subtitle2'
                      align='center'
                      className={classes.budgetHeading}
                    >
                      Aug 30th - Sept 10th
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container justify='space-around' direction='row'>
                  <Grid item className={classes.mainBoxBudgetItems}>
                    <Typography
                      variant='subtitle2'
                      className={classes.budgetHeading}
                    >
                      trip budget
                    </Typography>
                    <Typography variant='h6'>$1,000.00</Typography>
                  </Grid>
                  <Grid item className={classes.mainBoxBudgetItems}>
                    <Typography
                      variant='subtitle2'
                      className={classes.budgetHeading}
                    >
                      daily budget
                    </Typography>
                    <Typography variant='h6'>$50.00</Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item className={classes.chartContainer}>
                <Bar
                  data={barState}
                  options={{
                    title: {
                      display: false,
                      fontSize: 20,
                    },
                    legend: {
                      display: false,
                      position: 'right',
                    },
                    maintainAspectRatio: false,
                    scales: {
                      xAxes: [
                        {
                          gridLines: {
                            display: false,
                          },
                        },
                      ],
                      yAxes: [
                        {
                          gridLines: {
                            display: false,
                          },
                          ticks: {
                            display: false,
                          },
                        },
                      ],
                    },
                  }}
                />
              </Grid>
            </Box>
          </Grid>

          {/* Budget Boxes Item */}
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} sm={4} md={4}>
                <Box
                  m={1}
                  boxShadow={3}
                  className={classes.spendingInfoWidgetBox}
                >
                  <Grid container direction='column'>
                    <Grid item>
                      <Grid container justify='space-between'>
                        <Grid item>
                          <TodayIcon
                            classes={{root: classes.todayIconColor}}
                            fontSize='large'
                            className={classes.icon}
                          />
                        </Grid>
                        <Grid item>
                          <Typography
                            variant='h5'
                            className={classes.spendingWidgetTitle}
                          >
                            {Moment(Date.now()).format('MMM Do')}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                    <Grid container justify='space-around'>
                      <Grid item>
                        <Typography variant='subtitle2' align='right'>
                          spent today
                        </Typography>
                        <Typography variant='h6' align='right'>
                          $40.00
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant='subtitle2' align='right'>
                          remaining
                        </Typography>
                        <Typography
                          variant='h6'
                          className={classes.underBudgetColor}
                          align='right'
                        >
                          $10.00
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={12} sm={4} md={4}>
                <Box
                  m={1}
                  boxShadow={3}
                  className={classes.spendingInfoWidgetBox}
                >
                  <Grid container direction='column'>
                    <Grid item>
                      <Grid container justify='space-between'>
                        <Grid item>
                          <TimelineIcon
                            fontSize='large'
                            classes={{root: classes.dailyIconColor}}
                            className={classes.icon}
                          />
                        </Grid>
                        <Grid item>
                          <Typography
                            variant='h5'
                            className={classes.spendingWidgetTitle}
                          >
                            Daily
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                    <Grid container justify='space-around'>
                      <Grid item>
                        <Typography variant='subtitle2' align='right'>
                          daily avg.
                        </Typography>
                        <Typography variant='h6' align='right'>
                          $43.50
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant='subtitle2' align='right'>
                          new daily budget.
                        </Typography>
                        <Typography variant='h6' align='right'>
                          $54.00
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              {/* Total Widget */}
              <Grid item xs={12} sm={4} md={4}>
                <Box
                  m={1}
                  boxShadow={3}
                  className={classes.spendingInfoWidgetBox}
                >
                  <Grid container direction='column'>
                    <Grid item>
                      <Grid container justify='space-between'>
                        <Grid item>
                          <AccountBalanceIcon
                            classes={{root: classes.accountBalanceColor}}
                            fontSize='large'
                            className={classes.icon}
                          />
                        </Grid>
                        <Grid item>
                          <Typography
                            variant='h5'
                            className={classes.spendingWidgetTitle}
                          >
                            Total
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                    <Grid container justify='space-around'>
                      <Grid item>
                        <Typography variant='subtitle2' align='right'>
                          total spent
                        </Typography>
                        <Typography variant='h6' align='right'>
                          $352.50
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant='subtitle2' align='right'>
                          remaining
                        </Typography>
                        <Typography
                          variant='h6'
                          className={classes.underBudgetColor}
                          align='right'
                        >
                          $647.50
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Table / Pie Chart Container */}
          <Grid item xs>
            <Grid container justify='space-between'>
              {/* Last Five Purchases Table */}
              <Grid xs={12} lg={6} item>
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

              {/* ------ Pie Chart --------- */}
              <Grid xs={12} md={12} lg={6} item>
                <Box m={1} boxShadow={3} className={classes.budgetBox}>
                  <Pie
                    height={300}
                    data={pieStateData}
                    options={{maintainAspectRatio: false}}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* </Container>
        </Grid>
      </main> */}
    </>
  );
};

export default Trip;
