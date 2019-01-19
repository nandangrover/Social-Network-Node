import axios from "axios";
import uuid from "uuid";
import { socket } from "../Root";
import { GET_USERS, ITEMS_LOADING, STORE_CURRENT_USER, GET_TREE, GET_ITEMS, ADD_ITEM, DELETE_ITEM, UPDATE_ITEMS } from "./types";

export const getUsers = id => dispatch => {
  dispatch(setItemsLoading());
  axios.get(`/api/users/getUsers/${id}`).then(res => {
    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  });
};

export const storeCurrentRoomUsers = users => dispatch => {
  dispatch(setItemsLoading());
  // history.push("/PrivateRoom")
  // console.log(users);
  
  dispatch({
    type: STORE_CURRENT_USER,
    payload: users
  })
};

export const getTree = (id,history,username) => dispatch => {
  dispatch(setItemsLoading());
  axios.get(`/api/chats/tree/${id}`).then(res => {
    if(res.data[0] !== undefined){
      const base64 = btoa(username);
      history.push(`/PrivateRoom?id=${res.data[0].chatId}&u=${base64}`)
    }
    else{
      dispatch(setTree(id));
      // localStorage.setItem('chatId',null)
    }
    dispatch({
      type: GET_TREE,
      payload: res.data[0]
    });
  });
};

export const setTree = id => dispatch => {
  const payload = { user: id, chatId: uuid()}
  axios.post("/api/chats/tree", payload).then(res => {
    // console.log(res);
    
    dispatch({
      type: GET_TREE,
      payload: res.data
    });
  });
}

export const getItems = (id) => dispatch => {
  dispatch(setItemsLoading());
  axios.get(`/api/chats/${id}`).then(res =>{
    // console.log(res.data);
    
    dispatch({
      type: GET_ITEMS,
      payload: res.data
    })
  }
  );
};

export const deleteItem = id => dispatch => {
  dispatch(setItemsLoading());
  axios.delete(`/api/chats/${id}`).then(res => {
    dispatch({
      type: DELETE_ITEM,
      payload: id
    });
  });
  // axios
  //   .get('/api/items')
  //   .then(res =>
  //     dispatch({
  //       type: GET_ITEMS,
  //       payload: res.data
  //     })
  //   )
};

export const addItem = item => dispatch => {
  console.log(item);
  
  dispatch(setItemsLoading());
  axios.post("/api/chats", item).then(res => {
    dispatch({
      type: ADD_ITEM,
      payload: res.data
    });
    socket.emit("update", { message: res.data });
  });
};

export const onUpdate = item => dispatch => {
  dispatch(setItemsLoading());
  dispatch({
    type: UPDATE_ITEMS,
    payload: item.message
  });
};


export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
