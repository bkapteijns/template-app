import {
  GET_PRIVATE_DATA_SUCCESS,
  GET_PUBLIC_DATA_SUCCESS,
  GET_SCOPED_DATA_SUCCESS,
  GET_DATA_FAILURE,
  POST_IMAGE,
  GET_ADMIN_DATA_SUCCESS
} from "../actions/actionTypes";
import initialState from "../initialState";

export default function dataReducer(state = initialState.data, action) {
  switch (action.type) {
    case GET_PRIVATE_DATA_SUCCESS:
      return { ...state, privateData: action.payload };
    case GET_PUBLIC_DATA_SUCCESS:
      return { ...state, publicData: action.payload };
    case GET_SCOPED_DATA_SUCCESS:
      return { ...state, scopedData: action.payload };
    case GET_ADMIN_DATA_SUCCESS:
      return { ...state, adminData: action.payload };
    case GET_DATA_FAILURE:
      return { ...state, errorData: action.payload || "Error" };
    case POST_IMAGE:
      return { ...state, scopedData: [...state.scopedData, action.payload] };
    default:
      return state;
  }
}
