import { type } from "@testing-library/user-event/dist/type";
import { addFriendUtil, generateQRCodeUtil, loginUtil, loginWithCookieUtil, logoutUtil, removeFriendUtil, resetPwdUtil, signupUtil } from "../apiUtil";

const initialState = {
  msg: "",
  success: false,
  name: "",
  username: "",
  loading:false,
  friendList: [],
  qr:""
};

const ACTIONS = {
  SIGNUP:"SIGNUP",
  LOGIN: "LOGIN",
  ERROR: "ERROR",
  LOGOUT:"LOGOUT",
  ADD_FRIEND:"ADD_FRIEND",
  REMOVE_FRIEND:"REMOVE_FRIEND",
  LOADING:"LOADING",
  QR:"QR",
  RESET_PWD:"RESET_PWD"
};

export const errorActionCreator = (payload) => ({
  type: ACTIONS.ERROR,
  payload,
});

const asyncActionCreator=(apiUtil,type,apiPayload)=>{
    return async (dispatch) => {
    try {
      dispatch(loadingAction(true))
      const data = (await apiUtil(apiPayload))?.data;
      console.log(data);

      dispatch({ type, payload: data });
    } catch (error) {
      const payload = error.response.data;
      console.log(error.response.data);
      dispatch(errorActionCreator(payload));
    }finally{
      dispatch(loadingAction(false))
    }
  };
}


export const resetPwdAction=(payload)=>{
  return asyncActionCreator(resetPwdUtil,ACTIONS.RESET_PWD,payload)
}
export const qrAction=(payload)=>{
  return asyncActionCreator(generateQRCodeUtil,ACTIONS.QR,payload)
}
export const signupAction=(payload)=>{
  return asyncActionCreator(signupUtil,ACTIONS.SIGNUP,payload)
}


export const loginWithCookieActionCreator = () => {
  return asyncActionCreator(loginWithCookieUtil,ACTIONS.LOGIN)
    //   return async (dispatch) => {
//     try {
//       const data = (await loginWithCookieUtil())?.data;
//       console.log(data);

//       dispatch({ type: ACTIONS.LOGIN, payload: data });
//     } catch (error) {
//       const payload = error.response.data;
//       console.log(error.response.data);
//       dispatch(errorActionCreator(payload));
//     }
//   };
};
export const loginActionCreator = (payload) => {
return asyncActionCreator(loginUtil,ACTIONS.LOGIN,payload)
    //   return async (dispatch) => {
//     try {
//       const data = (await loginUtil(payload))?.data;
//       console.log(data);

//       dispatch({ type: ACTIONS.LOGIN, payload: data });
//     } catch (error) {
//       const payload = error.response.data;
//       console.log(error.response.data);
//       dispatch(errorActionCreator(payload));
//     }
//   };
};

export const addFriendAction=(payload)=>{
return asyncActionCreator(addFriendUtil,ACTIONS.ADD_FRIEND,payload)
}
export const removeFriendAction=(payload)=>{
    return asyncActionCreator(removeFriendUtil,ACTIONS.REMOVE_FRIEND,payload)

}
export const logoutAction=(payload)=>{
return asyncActionCreator(logoutUtil,ACTIONS.LOGOUT)
}

export const loadingAction=payload=>{
  return {type:ACTIONS.LOADING,payload}
}


export const userReducer = (state = initialState, action) => {
  switch (action.type) {

    case ACTIONS.RESET_PWD:
      var { success, msg } = action?.payload;
      return {...state, success,msg}
    case ACTIONS.QR:
      var { success, msg:qrcode } = action?.payload;
      return {...state,success,qr:qrcode}
    case ACTIONS.SIGNUP:
      var { success, data, msg } = action?.payload;
      return {...state,msg,success}
    case ACTIONS.LOGIN:
      var { success, data, msg } = action?.payload;
      var { name, username, friendList } = data;
      return { ...state, name, username, friendList, success, msg };
    case ACTIONS.ERROR:
      var { msg, success } = action.payload;
      return { ...state, msg, success };
    case ACTIONS.LOGOUT:
      var { msg, success } = action.payload;
      return { ...initialState, msg, success };
      case ACTIONS.ADD_FRIEND:
        // var { msg, success ,data} = action.payload;
        // return {...state,msg,success,friendList:data}
      case ACTIONS.REMOVE_FRIEND:
        var { msg, success ,data} = action.payload;
        return {...state,msg,success,friendList:data}
    case ACTIONS.LOADING:
      const {payload} = action
      return {...state,loading:payload}
        default:
      return state;
  }
};
