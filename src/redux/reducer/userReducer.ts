

import actionTypes from "../actions/actionType";
import { Action } from "../actions/actionCreatorType";
import communicate from "../../model/model";

type State = {
  userCommunications: communicate[] | null;
  coomunicate:  communicate| null;
  loading: boolean;
  error: null | string;
};

const initialState = {
  userCommunications: null,
  coomunicate: null,
  loading: false,
  error: null,
};

const userReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    

    default:
      return state;
  }
};

export default userReducer;