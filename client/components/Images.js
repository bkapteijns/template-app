import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";

import { getData, getImages } from "../redux/actions/dataActions";

// eslint-disable-next-line
const Private = ({ data, images, error, actions }) => {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (!data) {
      actions.getData(
        { availability: "scoped", path: "/images" },
        getAccessTokenSilently
      );
    } else if (images.length < data.length) {
      console.log(data);
      actions.getImages(images, getAccessTokenSilently);
    }
    console.log(images);
    // Images is leeg... Er zit dus hoogstwaarschijnlijk een fout in redux,
    // waardoor de images array niet wordt gevuld met de images.
  }, [data, images]);

  return images ? (
    <div>
      {images.map((image) => (
        <>
          <h2>{image.name}</h2>
          <img src={image.data} alt="" />
        </>
      ))}
    </div>
  ) : (
    <div>
      <p>Images</p>
      <p>{error.message}</p>
    </div>
  );
};

Private.propTypes = {
  data: PropTypes.any,
  images: PropTypes.array,
  error: PropTypes.any,
  actions: PropTypes.object.isRequired
};

Private.defaultProps = {
  data: null,
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
      getImages: bindActionCreators(getImages, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Private);
