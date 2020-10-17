import axios from "axios";
import {
  CLEAR_ARTICLE_FORM,
  SHOW_ADD_PARAGRAPH,
  SHOW_ADD_IMAGE
} from "./actionTypes";

export function clearArticleForm() {
  return { type: CLEAR_ARTICLE_FORM };
}

export function showAddParagraph() {
  return { type: SHOW_ADD_PARAGRAPH };
}

export function showAddImage() {
  return { type: SHOW_ADD_IMAGE };
}
