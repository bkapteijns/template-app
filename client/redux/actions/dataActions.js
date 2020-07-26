import axios from "axios";
import {
  GET_DATA_REQUEST,
  GET_PRIVATE_DATA_SUCCESS,
  GET_PUBLIC_DATA_SUCCESS,
  GET_SCOPED_DATA_SUCCESS,
  GET_DATA_FAILURE
} from "./actionTypes";

export function getDataSuccess(payload, availability) {
  let type = "";
  switch (availability) {
    case "private":
      type = GET_PRIVATE_DATA_SUCCESS;
      break;
    case "public":
      type = GET_PUBLIC_DATA_SUCCESS;
      break;
    case "scoped":
      type = GET_SCOPED_DATA_SUCCESS;
      break;
    default:
      type = GET_DATA_FAILURE;
  }
  return { type, payload };
}

export function getDataFailure(err) {
  return { type: GET_DATA_FAILURE, payload: err };
}

export function requestData() {
  return { type: GET_DATA_REQUEST };
}

export function getData(availability, getAccessTokenSilently) {
  return async (dispatch) => {
    dispatch(requestData());
    try {
      if (getAccessTokenSilently) {
        const accessToken = await getAccessTokenSilently({
          audience: `https://dev-g9blhnj8.eu.auth0.com/api/v2/`
        });

        const response = await axios.get(
          `http://localhost:3001/api/${availability}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
        dispatch(getDataSuccess(response.data, availability));
      } else {
        const response = await axios.get(
          `http://localhost:3001/api/${availability}`
        );
        dispatch(getDataSuccess(response.data, availability));
      }
    } catch (err) {
      dispatch(getDataFailure(err, availability));
    }
  };
}
