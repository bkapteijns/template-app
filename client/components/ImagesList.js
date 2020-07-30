import React from "react";
import PropTypes from "prop-types";

const ImagesList = ({ images, arrayBufferToBase64 }) => (
  <div>
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
  </div>
);

ImagesList.propTypes = {
  images: PropTypes.array.isRequired,
  arrayBufferToBase64: PropTypes.func.isRequired
};

export default ImagesList;
