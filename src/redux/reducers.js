/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

import { SET_USER_NAME } from "./actions";
import { GET_CITIES } from "./actions";
import { SET_USER_UUID } from "./actions";
import { GET_IS_REGISTERED } from "./actions";
import { SET_USER_EXPO_TOKEN } from "./actions";
import { GET_ALL_ORGANIZATIONS } from "./actions";

const initialState = {
  name: "",
  cities: [],
  uuid: "",
  is_registered: {},
  url_base: "",
  expo_token: "",
  all_organizations:{}
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_NAME:
      return { ...state, name: action.payload };
    case SET_USER_UUID:
      return { ...state, uuid: action.payload };
    case SET_USER_EXPO_TOKEN:
      return { ...state, expo_token: action.payload };
    case GET_CITIES:
      return { ...state, cities: action.payload };
    case GET_IS_REGISTERED:
      return { ...state, is_registered: action.payload };
    case GET_ALL_ORGANIZATIONS:
      return { ...state, all_organizations: action.payload };
    default:
      return state;
  }
};

export default userReducer;
