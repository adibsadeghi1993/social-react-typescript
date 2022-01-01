

import actionTypes from "../actions/actionType";
import { Action } from "../actions/actionCreatorType";
import communicate from "../../model/model";

type State = {
  socials: communicate[] | null;
  social:  communicate| null;
  loading: boolean;
  error: null | string;
};

const initialState = {
  socials: null,
  social: null,
  loading: false,
  error: null,
};

const userReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case actionTypes.GET_USER_CONTACTS:{
      return {...state,socials:action.payload}
    }

    case actionTypes.SINGLE_SOCIAL:{
      return {...state,social:action.payload}
    }

    default:
      return state;
  }
};

export default userReducer;