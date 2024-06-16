import PropTypes from "prop-types";

// Showing Error and Success Notification Message

const Notification = ({ errorMessage, messageColor }) => {
  if (errorMessage) {
    return <div className={messageColor}>{errorMessage}</div>;
  }
  return <div className="savingChanges" style={{ padding: 19 }}></div>;
};

Notification.propTypes = {
  errorMessage: PropTypes.func.isRequired,
  messageColor: PropTypes.func.isRequired,
};
export default Notification;
