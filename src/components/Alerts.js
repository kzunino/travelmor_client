import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Alerts = ({error, alert}) => {
  // Acts like componentDidUpdate
  // If old error is same as current error, will not fire a repeat alert if
  // a new message is fired
  let oldError = useRef(error);
  let oldAlert = useRef(alert);

  useEffect(() => {
    // Alerts from the database
    if (oldError.current !== error) {
      if (error.msg.non_field_errors)
        toast.error(`${error.msg.non_field_errors}`);
      if (error.msg.password) toast.error(`${error.msg.password}`);
      if (error.msg.password1) {
        for (const errors of error.msg.password1) {
          toast.error(`Password: ${errors}`);
        }
      }
      if (error.msg.password2) {
        for (const errors of error.msg.password2) {
          toast.error(`Confirm password: ${errors}`);
        }
      }
      if (error.msg.email) toast.error(`Email: ${error.msg.email}`);
      if (error.msg.home_currency)
        toast.error(`Home currency: ${error.msg.home_currency}`);
      if (error.msg.last_name) toast.error(`Last name: ${error.msg.last_name}`);
      if (error.msg.first_name)
        toast.error(`First name: ${error.msg.first_name}`);
      if (error.msg.name) toast.error(`${error.msg.name}`);
      if (error.msg.total_budget)
        toast.error(`Budget Total: ${error.msg.total_budget}`);

      oldError.current = error;
    }

    if (oldAlert.current !== alert) {
      // Alert Success
      if (alert.success) toast.success(alert.success);
      //alert Error
      if (alert.validation_error) toast.error(alert.validation_error);

      oldAlert.current = alert;
    }
  }, [error, alert]);

  return (
    <>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

Alerts.propTypes = {
  error: PropTypes.object.isRequired,
  message: PropTypes.object,
};

const mapStateToProps = (state) => ({
  error: state.errors,
  alert: state.alerts,
});

export default connect(mapStateToProps)(Alerts);
