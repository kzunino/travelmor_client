import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Alerts = ({error, message}) => {
  useEffect(() => {
    const handleErrorProps = () => {
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
    };

    handleErrorProps();
  }, [error]);

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
  message: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});

export default connect(mapStateToProps)(Alerts);
