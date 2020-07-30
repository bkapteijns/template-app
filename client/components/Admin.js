import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";

import { getData } from "../redux/actions/dataActions";

const Admin = ({ data, error, actions }) => {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (!data) {
      actions.getData({ availability: "admin" }, getAccessTokenSilently);
    }
  }, []);

  return data ? (
    <div>{data}</div>
  ) : (
    <div>
      <p>Admin</p>
      <p>{error.message}</p>
    </div>
  );
};

Admin.propTypes = {
  data: PropTypes.any,
  error: PropTypes.any,
  actions: PropTypes.object.isRequired
};

Admin.defaultProps = {
  data: null,
  error: { message: "Error" }
};

function mapStateToProps(state) {
  return {
    data: state.data.adminData,
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

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
