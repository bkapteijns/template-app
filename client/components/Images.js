import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import {
  getData,
  getImages,
  getDataFailure,
  postImage,
  requestData
} from "../redux/actions/dataActions";

import AddImageForm from "./AddImageForm";

// eslint-disable-next-line
const Private = ({ data, images, error, actions }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (data.length === 0) {
      actions.getData(
        { availability: "scoped", path: "/images" },
        getAccessTokenSilently
      );
    }
  }, []);

  useEffect(() => {
    if (images.length < data.length) {
      actions.getImages(data, getAccessTokenSilently);
    }
  }, [data]);

  const arrayBufferToBase64 = (buffer) => {
    const stringChars = buffer.reduce(
      (stringData, byte) => stringData + String.fromCharCode(byte),
      ""
    );
    return btoa(stringChars);
  };

  const onAddImage = async ({ name, image }) => {
    actions.requestData();
    try {
      const accessToken = await getAccessTokenSilently({
        audience: `https://dev-g9blhnj8.eu.auth0.com/api/v2/`
      });
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "form-data"
      };
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      const file = await axios.post(
        `http://localhost:3001/api/scoped/images`,
        formData,
        {
          headers
        }
      );
      actions.postImage(file.data);
    } catch (err) {
      actions.throwError(err);
    }
    setShowAddForm(false);
  };

  const onCancelAddImage = () => {
    setShowAddForm(false);
  };

  return (
    <>
      {data.length !== 0 ? (
        <div>{JSON.stringify(data)}</div>
      ) : (
        <div>
          <p>Images</p>
          <p>{error.message}</p>
        </div>
      )}
      {
        // You need to open the page again to see the images pop up
      }
      {images.length !== 0 ? (
        images.map((image) => (
          <div key={image._id}>
            <h2>{image.name}</h2>
            <img
              style={{ height: 100, minWidth: 10 }}
              src={`data:image/jpg;base64,${arrayBufferToBase64(image.data)}`}
              alt=""
            />
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}

      {showAddForm ? (
        <AddImageForm onSubmit={onAddImage} onCancel={onCancelAddImage} />
      ) : (
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => {
            setShowAddForm(true);
          }}
        >
          Add image
        </button>
      )}
    </>
  );
};

Private.propTypes = {
  data: PropTypes.any,
  images: PropTypes.array,
  error: PropTypes.any,
  actions: PropTypes.object.isRequired
};

Private.defaultProps = {
  data: [],
  images: [],
  error: { message: "Error" }
};

function mapStateToProps(state) {
  return {
    data: state.data.scopedData,
    images: state.data.imageData,
    error: state.data.errorData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getData: bindActionCreators(getData, dispatch),
      getImages: bindActionCreators(getImages, dispatch),
      throwError: (err) => dispatch(getDataFailure(err)),
      postImage: (image) => dispatch(postImage(image)),
      requestData: () => dispatch(requestData())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Private);
