import axios from "axios";

const BASE_URL="";

const endpoints={
    SIGNUP:"/user/signup",
    LOGIN:"/user/login",
    ADD_FRIEND:"/user/addFriend",
    REMOVE_FRIEND:"/user/removeFriend",
    LOGOUT:"/user/logout",
    QR:"/user/generateQR",
    RESET_PWD:"/user/resetPwd"
}

export const signupUtil=(payload)=>{
    const url=BASE_URL+endpoints.SIGNUP;
    return axios.post(url,payload);
}
export const loginUtil=(payload)=>{
    const url=BASE_URL+endpoints.LOGIN;
    return axios.post(url,payload,{withCredentials:true});
}
export const loginWithCookieUtil=()=>{
    const url=BASE_URL+endpoints.LOGIN;
    return axios.get(url,{withCredentials:true});
}
export const addFriendUtil=(payload)=>{
    const url=BASE_URL+endpoints.ADD_FRIEND;
    return axios.patch(url,payload,{withCredentials:true});
}
export const removeFriendUtil=(payload)=>{
    const url=BASE_URL+endpoints.REMOVE_FRIEND;
    return axios.patch(url,payload,{withCredentials:true});
}
export const logoutUtil=(payload)=>{
    const url=BASE_URL+endpoints.LOGOUT;
    return axios.get(url,{withCredentials:true});
}
export const generateQRCodeUtil=(payload)=>{
    const url=BASE_URL+endpoints.QR;
    return axios.patch(url,payload);
}
export const resetPwdUtil=(payload)=>{
    const url=BASE_URL+endpoints.RESET_PWD;
    return axios.patch(url,payload);
}
