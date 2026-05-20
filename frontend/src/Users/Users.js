import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import UsersListDemo from "../UsersList/UsersListDemo";
function Users() {
  //Array Destructuring
  const [name, setName] = useState("Rishabh");
  const [id, setId] = useState(1);

  const updateName = (e) => {
    console.dir(e);
    const { value } = e.target;
    setName(value);
  };
  useEffect(() => {
    //ComponentDidUpdate
    console.log("useEffect updated state : ", name);
    return () => {
      console.log("ComponentWillUnmount useEffect return function");
    };
  }, [name]);

  useEffect(() => {
    //(...code...)()-------->IIFE=>Immediate Invoke Function Expression
      (async () => {
          console.log("useEffect updated id: ", id);
          const URL = "https://jsonplaceholder.typicode.com/users/";
      const data = (await axios.get(URL + id)).data;
      console.log("userData: ", data);
    })();
  }, [id]);

  //   useEffect(() => {
  //     console.log("useEffect updated state : ", name);
  //     const URL = "https://jsonplaceholder.typicode.com/users";

  //     console.log(URL);
  //     const getData = async () => {
  //       try {
  //         console.log("Begin n/w req");
  //         const userData = await axios.get(URL);
  //         console.log(userData.data);
  //       } catch (error) {
  //         console.log("catch block", error.message);
  //       }
  //     };

  //     getData();
  //   }, []);

  // useEffect(() => {

  //     return () => {

  //     };
  // //ComponentDidMount
  //run only once
  // }, []);

  return (
    // e=>setName(e.target.value)
    <>
      <input onChange={updateName} type="text" placeholder="Enter Name" />
      <div>hello user , {name}.</div>
      <button onClick={() => alert(`Hello User, ${name}`)}>
        Show Greeting
      </button>
      <input
        min={1}
        max={10}
        onChange={(e) => setId(e.target.value)}
        type="number"
        placeholder="Enter Id"
      />
      <UsersListDemo/>
    </>
  );
}

export default Users;
