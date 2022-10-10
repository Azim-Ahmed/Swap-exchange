import axios from "../../api/axios";
import { authConstants } from "./constant";
import { errorAlert, handleErrorMessage } from 'Utils';

export const login = (user) => {
  //check this part
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    try {
      const res = await axios.post("/v1/users/login", {
        ...user,
      });
      if (res.status === 200) {
        const { token, user } = res.data;
        const newdata = await axios.get(`/v1/admin/${user.id}`);
        user.noofusernow = newdata.data.data.length
        window.localStorage.setItem("sqtoken", token);
        window.localStorage.setItem("squser", JSON.stringify(user));
        window.localStorage.setItem("rootuser", JSON.stringify(user));
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: {
            token,
            user,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: "INVALID CREDENTIALS" },
      });
    }

  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("sqtoken");

    if (token) {
      const user = JSON.parse(window.localStorage.getItem("squser"));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        // payload: { error: "Need to login" },
      });
    }
  };
};

const getLoggedInUserData = (id) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGGEDIN_USER_REQUEST });
    try {
      const res = await axios.get(`userData/${id}`);
      if (res.data.status === "ok") {
        // window.localStorage.setItem("sqtoken", token);
        // window.localStorage.setItem("squser", JSON.stringify(user));
        // window.localStorage.setItem("rootuser", JSON.stringify(user));
        dispatch({
          type: authConstants.LOGGEDIN_USER_SUCCESS,
          payload: {
            user: res?.data.data.userData
            // token,
            // user,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: "INVALID CREDENTIALS" },
      });
    }

  };
}
export const resetPassword = (username, url) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.RESET_PASSWORD_REQUEST,
    });
    try {
      if (username) {
        await axios.post(`/v1/projects/{projectId}/users/${username}/reset-password-request?redirectUrl=${url}`);
        dispatch({
          type: authConstants.RESET_PASSWORD_SUCCESS,
          // payload: { error: "Need to login" },
        });
      }
    } catch (error) {
      dispatch({
        type: authConstants.RESET_PASSWORD_FAILURE,
        // payload: { error: "Need to login" },
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("sqtoken");
    window.localStorage.removeItem("squser");
    window.localStorage.removeItem("rootuser");
    dispatch({
      type: authConstants.LOGOUT_SUCCESS,
      payload: "Success"
    });

  };
};

export const pageMove = () => {
  return (dispatch) => {
    dispatch({
      type: authConstants.CLEAR__ERROR,
    });
  };
};

export const handleRemoveSuccessFromForgetPass = (email, url) => {
  //check this part
  return async (dispatch) => {
    try {
      dispatch({
        type: authConstants.REMOVE_SUCCESS_FROM_FORGET_PASS,
      });
    } catch (error) {
      errorAlert(handleErrorMessage(error));
    }
  };
};



// getting user information
export const getSingedUserInfo = () => {
  //check this part
  return (dispatch) => {
    try {
      dispatch({
        type: authConstants.GET_USER_INFO_LOGGED_REQUEST,
      });
      const rootuser = JSON.parse(localStorage.getItem("rootuser"))
      if (Object.keys(rootuser).length) {
        console.log(rootuser)
        localStorage.setItem('squser', JSON.stringify(rootuser))
        dispatch({
          type: authConstants.GET_USER_INFO_LOGGED_SUCCESS,
          payload: rootuser
        });
      }
    } catch (error) {
      dispatch({
        type: authConstants.GET_USER_INFO_LOGGED_FAILED,
      });
    }

  }
}


// export const signout = () => {
//   return async (dispatch) => {
//     dispatch({
//       type: authConstants.LOGOUT_REQUEST,
//     });

//     try {
//       const res = await axios.get("/v1/users/logout");
//       if (res.status === 200) {
//         window.localStorage.removeItem("sqtoken");
//         window.localStorage.removeItem("squser");
//         dispatch({
//           type: authConstants.LOGOUT_SUCCESS,
//           payload: res.data
//         });
//       } else {
//         dispatch({
//           type: authConstants.LOGOUT_FAILURE,
//           payload: { error: res.data.error },
//         });
//       }
//     } catch (error) {
//       console.log("signout error", error);
//     }

//   };
// };

