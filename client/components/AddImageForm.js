import React, { useState } from "react";
import PropTypes from "prop-types";

const AddImageForm = ({ onSubmit, onCancel }) => {
  const [imageName, setImageName] = useState("");
  const [image, setImage] = useState();

  const handleNameChange = (event) => {
    event.preventDefault();
    setImageName(event.target.value);
  };

  const handleImageChange = (event) => {
    event.preventDefault();
    setImage(event.target.files[0]);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({ name: imageName, image });
      }}
    >
      Image name (optional):
      <input type="text" value={imageName} onChange={handleNameChange} />
      <br />
      Choose an image:
      <br />
      <input
        type="file"
        name="file1"
        accept=".jpg, .jpeg, .png"
        onChange={handleImageChange}
      />
      <br />
      <input type="submit" value="Upload image" />
      <button
        className="btn btn-secondary-danger"
        type="button"
        onClick={onCancel}
      >
        Cancel
      </button>
    </form>
  );
};

AddImageForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default AddImageForm;
