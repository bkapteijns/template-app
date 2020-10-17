const initialState = {
  data: {
    publicData: null,
    privateData: null,
    scopedData: [],
    errorData: { message: null }
  },
  articleForm: {
    article: [],
    showAddParagraph: false,
    showAddImage: false
  }
};

export default initialState;
