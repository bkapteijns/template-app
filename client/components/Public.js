import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import { getData } from "../redux/actions/dataActions";

const Public = ({ data, error, actions }) => {
  useEffect(() => {
    if (!data) actions.getData("public");
  }, []);

  return data ? (
    <div>{data}</div>
  ) : (
    <div>
      <p>Public</p>
      <p>{error.message}</p>
    </div>
  );
};

Public.propTypes = {
  data: PropTypes.any,
  error: PropTypes.any,
  actions: PropTypes.object.isRequired
};

Public.defaultProps = {
  data: null,
  error: { message: "Error" }
};

function mapStateToProps(state) {
  return {
    data: state.data.publicData,
    error: state.data.errorData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getData: bindActionCreators(getData, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Public);
