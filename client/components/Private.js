import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";

import { getData } from "../redux/actions/dataActions";

const Private = ({ data, error, actions }) => {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (!data) actions.getData("private", getAccessTokenSilently);
  }, []);

  return data ? (
    <div>{data}</div>
  ) : (
    <div>
      <p>Private</p>
      <p>{error.message}</p>
    </div>
  );
};

Private.propTypes = {
  data: PropTypes.any,
  error: PropTypes.any,
  actions: PropTypes.object.isRequired
};

Private.defaultProps = {
  data: null,
  error: { message: "Error" }
};

function mapStateToProps(state) {
  return {
    data: state.data.privateData,
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

export default connect(mapStateToProps, mapDispatchToProps)(Private);
