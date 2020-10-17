import React, { useState } from "react";
import PropTypes from "prop-types";
import AddParagraphForm from "./AddParagraphForm";
import AddImageForm from "./AddImageForm";
// import AddParagraphForm from "./AddParagraphForm";
// import AddImageForm from "./AddImageForm";

const AddArticleForm = ({ article }) => {
  const [addParagraph, setAddParagraph] = useState(false);
  const [addImage, setAddImage] = useState(false);
  return (
    <>
      {article.map((part) => (
        <div>{part}</div>
      ))}
      {
        // eslint-disable-next-line
        addParagraph ? (
          <AddParagraphForm />
        ) : addImage ? (
          <AddImageForm />
        ) : (
          <>
            <button
              type="button"
              onClick={() => {
                setAddParagraph(true);
              }}
            >
              Add paragraph
            </button>
            <button
              type="button"
              onClick={() => {
                setAddImage(true);
              }}
            >
              Add image
            </button>
          </>
        )
      }
    </>
  );
};

AddArticleForm.propTypes = {
  article: PropTypes.array.isRequired
};

export default AddArticleForm;
