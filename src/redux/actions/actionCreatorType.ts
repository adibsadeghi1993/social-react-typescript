

import communicate from "../../model/model";
import actionTypes from "./actionType";

type getUsersAction = {
  type: actionTypes.GET_USER_CONTACTS;
  payload: communicate[];
};
type loadingUsersAction = {
  type: actionTypes.LOADING;
};
type failedUsersAction = {
  type: actionTypes.FAILED;
};
type deletedSocial = {
  type: actionTypes.DELETE_SOCIAL;
};
type socialAdded = {
  type: actionTypes.ADD_USER_CONTACTS;
};

export type Action =
  | getUsersAction
  | loadingUsersAction
  | failedUsersAction | socialAdded | deletedSocial

