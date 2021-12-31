

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
// type addUser = {
//   type: actionTypes.ADD_USER;
// };

export type Action =
  | getUsersAction
  | loadingUsersAction
  | failedUsersAction
//   | deleteUserAction | addUser;
