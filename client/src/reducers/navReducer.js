import {
  GET_NAV_USER, GET_CHAT_HISTORY
} from "../actions/types";

const initialState = {
  user: "Group",
  chatHistory: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_NAV_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
      case GET_CHAT_HISTORY:
      return {
        ...state,
        chatHistory: action.payload,
        loading: false
      }
    default:
      return state;
  }
}
