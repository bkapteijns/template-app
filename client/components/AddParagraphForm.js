import React, { useState } from "react";
import PropTypes from "prop-types";

const AddParagraphForm = ({ onSubmit, onCancel }) => {
  const [text, setText] = useState("");

  const onTextChange = (event) => {
    event.preventDefault();
    setText(event.target.value);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(text);
      }}
    >
      <textarea
        type="textarea"
        name="text"
        onChange={onTextChange}
        value={text}
      />
      <button type="submit">Submit</button>
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

AddParagraphForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default AddParagraphForm;
