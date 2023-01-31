/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

import { SET_USER_NAME } from "./actions";
import { SET_USER_UUID } from "./actions";
import { SET_USER_EXPO_TOKEN } from "./actions";
import { GET_ALL_ORGANIZATIONS } from "./actions";
import { GET_ALL_CATEGORIES } from "./actions";

const initialState = {
  name: "",
  cities: [],
  uuid: "",
  is_registered: {},
  url_base: "",
  expo_token: "",
  all_organizations:{},
  all_categories:[]
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_NAME:
      return { ...state, name: action.payload };
    case SET_USER_UUID:
      return { ...state, uuid: action.payload };
    case SET_USER_EXPO_TOKEN:
      return { ...state, expo_token: action.payload };
    case GET_ALL_ORGANIZATIONS:
      return { ...state, all_organizations: action.payload };
    case GET_ALL_CATEGORIES:
      return { ...state, all_categories: action.payload };
    default:
      return state;
  }
};

export default userReducer;
