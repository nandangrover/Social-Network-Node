import {
  GET_NAV_USER,
} from "../actions/types";

const initialState = {
  user: "Group",
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

    default:
      return state;
  }
}
