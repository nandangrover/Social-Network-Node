import axios from "axios";
import {
  GET_NAV_USER,
  ITEMS_LOADING,
  GET_CHAT_HISTORY
} from "./types";

export const setNavUser = (user) => dispatch => {
  dispatch(setItemsLoading());
    dispatch({
      type: GET_NAV_USER,
      payload: user
    });
};

export const getChatHistory = (user) => dispatch => {
  dispatch(setItemsLoading());
  axios.get(`/api/chats/chatHistory/${user}`).then(res =>{
    // console.log(res.data);
    dispatch(getUsers(res.data,user));
    // dispatch({
    //   type: GET_CHAT_HISTORY,
    //   payload: res.data
    // })
  })
};

export const getUsers = (users, id) => dispatch => {
  dispatch(setItemsLoading());
  users.forEach((item,index) => {
    item.user.forEach((userElem) => {
      if(userElem !== id){
    axios.get(`/api/chats/chatHistory/user/${userElem}`).then(res =>{
      // console.log(res.data,index,users);
      users[index].username= res.data;
      dispatch({
        type: GET_CHAT_HISTORY,
        payload: users
      })
      return userElem;
    })
    }
  })
})
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};