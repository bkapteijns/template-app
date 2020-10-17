import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";

import { getData } from "../redux/actions/dataActions";
import { clearArticleForm } from "../redux/actions/articleFormActions";
import AddArticleForm from "./AddArticleForm";

// eslint-disable-next-line
const Admin = ({ article, data, error, actions }) => {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (!data) {
      actions.getData({ availability: "admin" }, getAccessTokenSilently);
    }
    actions.clearArticleForm();
  }, []);

  return (
    <>
      {data ? (
        <div>{data}</div>
      ) : (
        <div>
          <p>Admin</p>
          <p>{error.message}</p>
        </div>
      )}
      <AddArticleForm article={article} />
    </>
  );
};

Admin.propTypes = {
  article: PropTypes.array.isRequired,
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
    article: state.articleForm.article,
    data: state.data.adminData,
    error: state.data.errorData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getData: bindActionCreators(getData, dispatch),
      clearArticleForm: () => dispatch(clearArticleForm())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
