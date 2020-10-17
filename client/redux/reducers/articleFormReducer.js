import {
  CLEAR_ARTICLE_FORM,
  SHOW_ADD_IMAGE,
  SHOW_ADD_PARAGRAPH
} from "../actions/actionTypes";
import initialState from "../initialState";

export default function articleFormReducer(
  state = initialState.articleForm,
  action
) {
  switch (action.type) {
    case CLEAR_ARTICLE_FORM:
      return { initialState, article: state.article };
    case SHOW_ADD_IMAGE:
      return { ...state, showAddImage: true };
    case SHOW_ADD_PARAGRAPH:
      return { ...state, showAddParagraph: true };
    default:
      return state;
  }
}
