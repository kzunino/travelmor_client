import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Alerts = ({error, message}) => {
  useEffect(() => {
    const handleErrorProps = () => {
      if (error.status) toast.error(`${error.status}`);
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

const propTypes = {
  error: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});

export default connect(mapStateToProps)(Alerts);
