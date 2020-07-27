import axios from "axios";
import {
  GET_DATA_REQUEST,
  GET_PRIVATE_DATA_SUCCESS,
  GET_PUBLIC_DATA_SUCCESS,
  GET_SCOPED_DATA_SUCCESS,
  GET_IMAGE_DATA_SUCCESS,
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
    case "images":
      type = GET_IMAGE_DATA_SUCCESS;
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

export function getData({ availability, path }, getAccessTokenSilently) {
  return async (dispatch) => {
    dispatch(requestData());
    try {
      let headers = null;
      if (availability !== "public") {
        const accessToken = await getAccessTokenSilently({
          audience: `https://dev-g9blhnj8.eu.auth0.com/api/v2/`
        });
        headers = { Authorization: `Bearer ${accessToken}` };
      }

      let url = `http://localhost:3001/api/${availability}`;

      if (path) {
        url += path;
      }

      const response = await axios.get(url, { headers });
      dispatch(getDataSuccess(response.data, availability));
    } catch (err) {
      dispatch(getDataFailure(err));
    }
  };
}

export function getImages(images, getAccessTokenSilently) {
  return async (dispatch) => {
    dispatch(requestData());

    try {
      const accessToken = await getAccessTokenSilently({
        audience: `https://dev-g9blhnj8.eu.auth0.com/api/v2/`
      });
      const headers = { Authorization: `Bearer ${accessToken}` };

      const response = images.map(async (image) => {
        const imageData = await axios.get(
          `http://localhost:30001/api/scoped/image/${image.filesId}`,
          { headers }
        );
        return { name: image.name, data: imageData.data };
      });
      dispatch(getDataSuccess(response));
    } catch (err) {
      dispatch(getDataFailure(err));
    }
  };
}
