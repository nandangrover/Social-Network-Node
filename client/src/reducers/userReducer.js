import { GET_USERS, ITEMS_LOADING, STORE_CURRENT_USER, GET_TREE } from "../actions/types";

const initialState = {
  users: [],
  currentRoom: {},
  tree: {},
  loading: false
};

export default function(state = initialState, action) {
  // console.log(action.payload);
  
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: [...action.payload],
        loading: false
      };
    case STORE_CURRENT_USER:
      return {
        ...state,
        currentRoom: action.payload,
        loading: false
      };
    case GET_TREE:
      return {
        ...state,
        tree: action.payload,
        loading: false
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
