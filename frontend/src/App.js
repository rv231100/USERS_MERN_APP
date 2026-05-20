// import logo from './logo.svg';
import './App.css';
// import UsersClass from './Users/UsersClass';
// import React from 'react';
import Users from "./Users/Users";
import {lazy, Suspense, useEffect, useState } from "react";
// import { BrowserRouter, Routes, Route,Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavbar from "./MyNavbar";
import { loginWithCookieUtil } from "./apiUtil";
import { useDispatch, useSelector } from "react-redux";
import { loginWithCookieActionCreator } from "./reducers/userReducer";
import Spinner from 'react-bootstrap/Spinner';

const FlexboxDemo =lazy(()=>import("./Flexbox/FlexboxDemo") );
const UsersListDemo =lazy(()=>import( "./UsersList/UsersListDemo") );
const RoutingComp =lazy(()=>import( "./Routing/RoutingComp") );
const  Login =lazy(()=>import("./Login/Login") ) ;
const Signup = lazy(()=>import( "./Signup/Signup") );
const Counter = lazy(()=>import( "./Counter/Counter") );
const Toast = lazy(()=>import( "./Toast") );


function App() {
  // const name = "rishabh";
  const [showUsers, setShowUsers] = useState(true);
  const [loginData, setLoginData] = useState(null);
  const dispatch = useDispatch();
  const {loading} = useSelector(state=>state.user)
  useEffect(() => {
    // (async () => {
    //   try {
    //     const data = (await loginWithCookieUtil())?.data;
    //     if (data) {
    //       setLoginData(data);
    //       console.log(data);
    //       alert(data.msg);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // })();
  
  dispatch(loginWithCookieActionCreator())
  }, []);
  return (
    <BrowserRouter>
    {loading ? <Spinner variant="primary" className="spin" animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>: null}
     
    <Toast/>
      <MyNavbar user={loginData} />
      {/* <h1>Router Links</h1>
    <div className='d-flex justify-content-evenly' >
    <Link to='/home'>Home</Link>
    <Link to='/users'>Users</Link>
    <Link to='/cm'>Class-Comp</Link>
    <Link to='/flex'>Flex-Comp</Link>
    <Link to='/route'>Routing-Comp</Link>
    </div> */}
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <button
                onClick={(e) => {
                  setShowUsers(!showUsers);
                }}
              >
                {showUsers ? "Hide Users" : "Show Users"}
              </button>
              <h3>Functional Component Demo</h3>
              {showUsers ? <Users /> : null} <br />
              <hr />
            </div>
          }
        />
        <Route />
        <Route path="/flex" element={<FlexboxDemo />} />
        <Route path="/route/:id" element={<RoutingComp />} />
        {/* <Route
          path="/cm"
          element={
            <div>
              <h3>Class Component</h3>
              {showUsers ? <UsersClass /> : null}
            </div>
          }
        /> */}
        <Route
          path="/users"
          element={
            <div>
              <UsersListDemo />
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div>
              <Login />
            </div>
          }
        />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/count"  element={<Counter/>}/>
      </Routes>
      </Suspense>
      <div className="App">{/* <FlexboxDemo/> */}</div>
    </BrowserRouter>
  );
}

export default App;
