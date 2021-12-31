

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
// type deleteUserAction = {
//   type: actionTypes.DELETE_USER;
// };
type socialAdded = {
  type: actionTypes.ADD_USER_CONTACTS;
};

export type Action =
  | getUsersAction
  | loadingUsersAction
  | failedUsersAction | socialAdded
//   | deleteUserAction | addUser;
