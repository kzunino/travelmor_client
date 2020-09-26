import React, {useState, forwardRef, useEffect} from 'react';
// import {Link} from 'react-router-dom';

import Moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

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

import {makeStyles} from '@material-ui/core/styles';
// import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 300,
    maxWidth: 700,
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
  tableBox: {
    padding: 8,
  },
}));

const TripTable = ({tripData}) => {
  // const theme = useTheme();
  const classes = useStyles();

  const {
    trip_uid,
    user,
    name,
    total_budget,
    length,
    home_currency,
    currencies,
    expenses,
    start_date,
    end_date,
  } = tripData;

  const [tableData, setTableData] = useState({
    columns: [
      {title: 'Name', field: 'name'},
      {
        title: 'Cost',
        field: 'cost',
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
      },
      {
        title: 'Date',
        field: 'purchase_date',
        type: 'date',
      },
    ],
    data: [
      {
        name: 'Dinner',
        cost: 10.01,
        expense_type: 'Food',
        purchase_date: Moment(Date.now()).format('MM-DD-YYYY'),
      },
      {
        name: 'Hostel',
        cost: 8.0,
        expense_type: 'Accomodation',
        purchase_date: Moment(Date.now()).format('MM-DD-YYYY'),
      },
    ],
  });

  useEffect(() => {
    if (expenses) {
      setTableData({
        columns: [
          {title: 'Name', field: 'name'},
          {
            title: 'Cost',
            field: 'cost',
            type: 'currency',
            currencySetting: {
              currencyCode: home_currency,
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            },
          },
          {
            title: 'Type',
            field: 'expense_type',
          },
          {
            title: 'Date',
            field: 'purchase_date',
            type: 'date',
          },
        ],

        data: expenses.map((expense) => {
          return {
            name: expense.name,
            cost: expense.cost,
            expense_type: expense.expense_type,
            purchase_date: Moment(expense.purchase_date).format('MM-DD-YYYY'),
          };
        }),
      });
    }
  }, [expenses]);

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
      {/* Table Container */}
      <Grid item xs>
        <Grid container justify='space-between'>
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
        </Grid>
      </Grid>
    </>
  );
};

export default TripTable;
