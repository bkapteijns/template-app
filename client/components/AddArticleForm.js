import React from "react";
import PropTypes from "prop-types";

const AddArticleForm = ({ article, showAddParagraph, showAddImage }) => (
  <>
    {article.map((part) => (
      <div>{part}</div>
    ))}
    <button type="button" onClick={showAddParagraph}>
      Add paragraph
    </button>
    <button type="button" onClick={showAddImage}>
      Add image
    </button>
  </>
);

AddArticleForm.propTypes = {
  article: PropTypes.array.isRequired,
  showAddParagraph: PropTypes.func.isRequired,
  showAddImage: PropTypes.func.isRequired
};

export default AddArticleForm;
