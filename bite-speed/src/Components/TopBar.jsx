import PropTypes from "prop-types";

const Topbar = ({ saveFlow }) => {
  return (
    <div className="savingChange">
      <button onClick={saveFlow}>Save Changes</button>
    </div>
  );
};
Topbar.propTypes = {
  saveFlow: PropTypes.func.isRequired,
};

export default Topbar;
