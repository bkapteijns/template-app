import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import { getData, clearData } from "../redux/actions/dataActions";
import AddArticleForm from "./AddArticleForm";
import AddParagraphForm from "./AddParagraphForm";
import AddImageForm from "./AddImageForm";

const Admin = ({ data, error, actions }) => {
  const [article, setArticle] = useState([]);
  const [paragraphs, setParagraphs] = useState([]);
  const [images, setImages] = useState([]);
  const [addParagraphShown, setAddParagraphShown] = useState(false);
  const [addImageShown, setAddImageShown] = useState(false);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (!data) {
      actions.getData({ availability: "admin" }, getAccessTokenSilently);
    }
  }, []);

  const showAddParagraph = () => setAddParagraphShown(true);
  const showAddImage = () => setAddImageShown(true);

  const onParagraphSubmit = async (text) => {
    const pId = await axios.post(`http://localhost:3001/api/admin/paragraphs`, {
      text
    });
    setParagraphs([...paragraphs, pId]);
    setArticle([...article, "p"]);
  };
  const onImageSubmit = async (image) => {
    const formData = new FormData();
    formData.append("image", image.image);
    formData.append("name", image.name);
    const iId = await axios.post(
      `http://localhost:3001/api/admin/images`,
      formData
    );
    setImages([...images, iId]);
    setArticle([...article, "i"]);
  };

  const onParagraphCancel = () => setAddParagraphShown(false);
  const onImageCancel = () => setAddImageShown(false);

  return (
    <>
      {data ? (
        <>
          <div>{data}</div>
          <button type="button" onClick={actions.clearData}>
            Delete admin data
          </button>
        </>
      ) : (
        <div>
          <p>Admin</p>
          <p>{error.message}</p>
        </div>
      )}
      <AddArticleForm
        article={article}
        showAddParagraph={showAddParagraph}
        showAddImage={showAddImage}
      />
      {addParagraphShown ? (
        <AddParagraphForm
          onSubmit={onParagraphSubmit}
          onCancel={onParagraphCancel}
        />
      ) : null}
      {addImageShown ? (
        <AddImageForm onSubmit={onImageSubmit} onCancel={onImageCancel} />
      ) : null}
    </>
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
      getData: bindActionCreators(getData, dispatch),
      clearData: () => dispatch(clearData("admin"))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
