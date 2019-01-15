import axios from "axios";
// import { socket } from "../Components/private-route/App";
import { GET_USERS, ITEMS_LOADING } from "./types";

export const getUsers = id => dispatch => {
  dispatch(setItemsLoading());
  axios.get(`/api/users/getUsers/${id}`).then(res => {
    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  });
};
export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
