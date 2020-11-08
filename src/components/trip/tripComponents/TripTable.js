import React, {useState, forwardRef, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  deleteExpense,
  deleteMultipleExpenses,
  updateExpense,
} from '../../../actions/expenses';
import {createAlerts} from '../../../actions/alerts';

import Moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

// Table
import MaterialTable, {MTableEditField, MTableToolbar} from 'material-table';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import ViewColumn from '@material-ui/icons/ViewColumn';

const useStyles = makeStyles((theme) => ({
  tableBox: {
    padding: 8,
  },
  materialTable: {
    '& span.MuiCheckbox-root': {
      color: theme.palette.secondary.offWhite,
    },
    '& .MuiToolbar-gutters': {
      paddingLeft: 15,
    },
    '& .MuiSelect-icon': {
      color: theme.palette.primary.main,
    },
  },
  highlight: {
    backgroundColor: theme.palette.boxBackground.main,
  },
  gutters: {
    paddingLeft: 0,
  },
  icon: {
    color: 'grey',
  },
  icon2: {
    color: '#D61A3C',
  },
  paginationIcon: {
    color: 'white',
  },
}));

const TripTable = ({
  tripData,
  deleteExpense,
  deleteMultipleExpenses,
  updateExpense,
  createAlerts,
}) => {
  const classes = useStyles();

  const {name, home_currency, expenses, start_date, end_date} = tripData;

  // Parses date in local time
  const startDate = Moment(start_date);
  const endDate = Moment(end_date);

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
        lookup: {1: 'Uncategorized'},
      },
      {
        title: 'Date',
        field: 'purchase_date',
        type: 'date',
      },
    ],
    data: [],
  });

  useEffect(() => {
    if (expenses) {
      setTableData({
        columns: [
          {
            title: 'Name',
            field: 'name',
          },
          {
            title: 'Cost',
            field: 'cost',
            type: 'currency',
            editable: 'never',
            currencySetting: {
              currencyCode: home_currency,
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            },
          },
          {
            title: 'Type',
            field: 'expense_type',
            lookup: {
              uncategorized: 'Uncategorized',
              accommodation: 'Accommodation',
              food: 'Food',
              transportation: 'Transportation',
              entertainment: 'Entertainment',
              tours: 'Tours',
              shopping: 'Shopping',
              fees: 'Fees',
              gifts: 'Gifts',
              emergency: 'Emergency',
              miscellaneous: 'Miscellaneous',
            },
          },
          {
            title: 'Currency',
            field: 'currency',
            readonly: true,
            editable: 'never',
          },
          {
            title: 'Money Spent',
            field: 'cost_conversion',
            readonly: true,
          },
          {
            title: 'Exchange Rate',
            field: 'exchange_rate',
            readonly: true,
            editable: 'never',
          },
          {
            title: 'Date',
            field: 'purchase_date',
            type: 'date',
            defaultSort: 'desc',
          },
          {
            title: 'ID',
            field: 'expense_uid',
            readonly: true,
            editable: 'never',
            hidden: true,
          },
        ],

        data: expenses.reverse().map((expense) => {
          return {
            name: expense.name,
            cost: expense.cost,
            expense_type: expense.expense_type,
            exchange_rate: expense.exchange_rate,
            currency: expense.currency,
            cost_conversion: parseFloat(expense.cost_conversion).toFixed(2),
            purchase_date: Moment(expense.purchase_date).format('MM-DD-YYYY'),
            expense_uid: expense.expense_uid,
          };
        }),
      });
    }
  }, [expenses, home_currency]);

  let options = {
    selection: true,
    search: false,
    pageSize: 5,
    headerStyle: {
      backgroundColor: 'rgb(39, 41, 59)',
      color: '#6e757c',
    },
    cellStyle: {color: '#fff'},
    exportButton: true,
    exportAllData: true,
  };

  let components = {
    EditField: (props) => (
      <div
        style={{
          backgroundColor: '#fff',
          paddingLeft: 2,
        }}
      >
        <MTableEditField {...props} />
      </div>
    ),
    Toolbar: (props) => (
      <MTableToolbar {...props} classes={{highlight: classes.highlight}} />
    ),
  };

  //Table Data

  const tableIcons = {
    Check: forwardRef((props, ref) => (
      <Check {...props} className={classes.icon} ref={ref} />
    )),
    Clear: forwardRef((props, ref) => (
      <Clear {...props} className={classes.icon} ref={ref} />
    )),
    Delete: forwardRef((props, ref) => (
      <DeleteOutline {...props} className={classes.icon} ref={ref} />
    )),
    MultiDelete: forwardRef((props, ref) => (
      <DeleteForeverIcon {...props} className={classes.icon2} ref={ref} />
    )),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => (
      <Edit {...props} className={classes.icon} ref={ref} />
    )),
    Export: forwardRef((props, ref) => (
      <SaveAlt {...props} className={classes.paginationIcon} ref={ref} />
    )),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => (
      <FirstPage {...props} className={classes.paginationIcon} ref={ref} />
    )),
    LastPage: forwardRef((props, ref) => (
      <LastPage {...props} className={classes.paginationIcon} ref={ref} />
    )),
    NextPage: forwardRef((props, ref) => (
      <ChevronRight {...props} className={classes.paginationIcon} ref={ref} />
    )),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} className={classes.paginationIcon} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
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
      <Grid item xs={12}>
        <Grid container justify='space-between'>
          <Grid item xs={12}>
            <Box m={0} boxShadow={0} className={classes.tableBox}>
              <div className={classes.materialTable}>
                <MaterialTable
                  style={{
                    backgroundColor: 'rgb(39, 41, 59)',
                    color: '#fff',
                  }}
                  components={components}
                  title={`${name} Expenses`}
                  options={options}
                  columns={tableData.columns}
                  data={tableData.data}
                  icons={tableIcons}
                  actions={[
                    {
                      tooltip: 'Remove All Selected Expenses',
                      icon: tableIcons.MultiDelete,
                      onClick: (evt, data) => {
                        let expenses_to_delete = data.map((expense) => {
                          return expense.expense_uid;
                        });

                        // send array to the reducer [expense_uid, expense_uid]
                        deleteMultipleExpenses(expenses_to_delete);
                      },
                    },
                  ]}
                  editable={{
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve) => {
                        setTimeout(() => {
                          resolve();

                          let newPurchaseDate = (newData.purchase_date = Moment(
                            newData.purchase_date,
                            'MM/DD/YYYY'
                          ));

                          if (
                            (newPurchaseDate.isAfter(startDate) &&
                              newPurchaseDate.isBefore(endDate)) ||
                            newPurchaseDate.isSame(startDate, 'day') ||
                            newPurchaseDate.isSame(endDate, 'day')
                          ) {
                            // setEditExpense(newData);
                            updateExpense(newData);

                            if (oldData) {
                              setTableData((prevState) => {
                                const data = [...prevState.data];

                                // Calculates the home cost by converting currency spent
                                newData.cost = (
                                  parseFloat(newData.cost_conversion) /
                                  parseFloat(newData.exchange_rate)
                                ).toFixed(2);

                                // Changes date format in table on update
                                newData.purchase_date = Moment(
                                  newData.purchase_date,
                                  'MM/DD/YYYY'
                                ).format('MM-DD-YYYY');

                                data[data.indexOf(oldData)] = newData;

                                return {...prevState, data};
                              });
                            }
                          } else {
                            createAlerts({
                              validation_error:
                                'Purchase date outside trip range',
                            });
                          }
                        }, 600);
                      }),
                    onRowDelete: (oldData) =>
                      new Promise((resolve) => {
                        setTimeout(() => {
                          resolve();
                          deleteExpense(oldData.expense_uid);
                          setTableData((prevState) => {
                            const data = [...prevState.data];
                            data.splice(data.indexOf(oldData), 1);
                            return {...prevState, data};
                          });
                        }, 600);
                      }),
                  }}
                />
              </div>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

TripTable.propTypes = {
  deleteExpense: PropTypes.func.isRequired,
  deleteMultipleExpenses: PropTypes.func.isRequired,
  updateExpense: PropTypes.func.isRequired,
  createAlerts: PropTypes.func.isRequired,
};

export default connect(null, {
  deleteExpense,
  deleteMultipleExpenses,
  updateExpense,
  createAlerts,
})(TripTable);
