/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

import { DEV_API_BASE, PROD_API_BASE } from '@env';

export const SET_USER_UUID = 'SET_USER_UUID';
export const SET_USER_EXPO_TOKEN = 'SET_USER_EXPO_TOKEN';
export const SEND_EMERGENCY_MESSAGE = 'SEND_EMERGENCY_MESSAGE';
export const GET_ALL_ORGANIZATIONS = 'GET_ALL_ORGANIZATIONS';
export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';
export const GET_ALL_OPENED_ORGANIZATIONS = 'GET_ALL_OPENED_ORGANIZATIONS';
export const GET_ALL_CLOSED_ORGANIZATIONS = 'GET_ALL_CLOSED_ORGANIZATIONS';

if (__DEV__) {
  var SET_USER_EXPO_TOKEN_URL = DEV_API_BASE + '/update_token';
  var SEND_EMERGENCY_MESSAGE_URL = DEV_API_BASE + '/send_emergency_message';
  var GET_ALL_ORGANIZATIONS_URL = DEV_API_BASE + '/get_all_organizations_with_distinct_category';
  var GET_ALL_CATEGORIES_URL = DEV_API_BASE + '/get_all_categories';
  var GET_ALL_OPENED_ORGANIZATIONS_URL = DEV_API_BASE + '/get_all_opened_organizations';
  var GET_ALL_CLOSED_ORGANIZATIONS_URL = DEV_API_BASE + '/get_all_closed_organizations';
} else {
  var SET_USER_EXPO_TOKEN_URL = PROD_API_BASE + '/update_token';
  var SEND_EMERGENCY_MESSAGE_URL = PROD_API_BASE + '/send_emergency_message';
  var GET_ALL_ORGANIZATIONS_URL = PROD_API_BASE + '/get_all_organizations_with_distinct_category';
  var GET_ALL_CATEGORIES_URL = PROD_API_BASE + '/get_all_categories';
  var GET_ALL_OPENED_ORGANIZATIONS_URL = DEV_API_BASE + '/get_all_opened_organizations';
  var GET_ALL_CLOSED_ORGANIZATIONS_URL = DEV_API_BASE + '/get_all_closed_organizations';
}

export const getAllOrganizations = () => {
  const url = GET_ALL_ORGANIZATIONS_URL + '.json';
  try {
    return async (dispatch) => {
      const result = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const json = await result.json();
      if (json) {
        dispatch({
          type: GET_ALL_ORGANIZATIONS,
          payload: json,
        });
      } else {
        console.log('unable to fectch get_all_organizations');
      }
    };
  } catch (error) {}
};

export const getAllOpenedOrganizations = () => {
  const url = GET_ALL_OPENED_ORGANIZATIONS_URL + '.json';
  try {
    return async (dispatch) => {
      const result = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const json = await result.json();
      if (json) {
        dispatch({
          type: GET_ALL_OPENED_ORGANIZATIONS,
          payload: json,
        });
      } else {
        console.log('unable to fectch get_all_organizations');
      }
    };
  } catch (error) {}
};

export const getAllClosedOrganizations = () => {
  const url = GET_ALL_CLOSED_ORGANIZATIONS_URL + '.json';
  try {
    return async (dispatch) => {
      const result = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const json = await result.json();
      if (json) {
        dispatch({
          type: GET_ALL_CLOSED_ORGANIZATIONS,
          payload: json,
        });
      } else {
        console.log('unable to fectch get_all_organizations');
      }
    };
  } catch (error) {}
};

export const getAllCategories = () => {
  const url = GET_ALL_CATEGORIES_URL + '.json';
  try {
    return async (dispatch) => {
      const result = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const json = await result.json();
      if (json) {
        dispatch({
          type: GET_ALL_CATEGORIES,
          payload: json,
        });
      } else {
        console.log('unable to fectch get_all_organizations');
      }
    };
  } catch (error) {}
};

export const setUUID = (uuid) => (dispatch) => {
  dispatch({
    type: SET_USER_UUID,
    payload: uuid,
  });
};

export const sendEmergencyMessage = (uuid) => (dispatch) => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        notification: {
          device_id: uuid,
        },
      }),
    };
    fetch(SEND_EMERGENCY_MESSAGE_URL + '.json', requestOptions).then(
      (response) => response.json()
    );
  } catch (error) {
    console.log(error);
  }
};

export const setExpoToken = (token, device_id) => (dispatch) => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        notification: {
          device_id: device_id,
          token: token,
          device_class: 2,
        },
      }),
    };
    fetch(SET_USER_EXPO_TOKEN_URL + '.json', requestOptions).then((response) =>
      response.json()
    );
  } catch (error) {
    console.log(error);
  }
  dispatch({
    type: SET_USER_EXPO_TOKEN,
    payload: token,
  });
};
