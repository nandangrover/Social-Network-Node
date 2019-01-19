import {
  GET_NAV_USER,
  ITEMS_LOADING
} from "./types";

export const setNavUser = (user) => dispatch => {
  dispatch(setItemsLoading());
    dispatch({
      type: GET_NAV_USER,
      payload: user
    });
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};