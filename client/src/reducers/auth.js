import { AUTH, LOGOUT } from "../utils/constants/actionTypes";

const initAuthData = JSON.parse(localStorage.getItem("profile"));

const authReducer = (state = { authData: initAuthData }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.removeItem("profile");
      return { ...state, authData: null };

    default:
      return state;
  }
};

export default authReducer;
