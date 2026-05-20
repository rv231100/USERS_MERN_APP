import axios from "axios";
import React, { useEffect, useState } from "react";
import UsersDisplay from "../UserUI/UsersDisplay";
import { Container, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadingAction } from "../reducers/userReducer";
function UsersListDemo() {
  const [usersList, setUsersList] = useState([]);
  const [searchQuery] = useSearchParams();

  useEffect(() => {
    const URL = "https://api.escuelajs.co/api/v1/users";
    (async () => {
      dispatch(loadingAction(true))
      const data = (await axios.get(URL))?.data;
      dispatch(loadingAction(false))
      console.log(data);
      setUsersList(data);
    })();
  }, []);

  //--post req-->create
  //     const sendData = async () => {
  //   try {
  //     const response = await axios.post('https://api.escuelajs.co/api/v1/users/', {
  //   "name": "Nicolas",
  //   "email": "nico@gmail.com",
  //   "password": "1234",
  //   "avatar": "https://picsum.photos/800"
  // });
  //     console.log(response.data); // Access server response
  //   } catch (error) {
  //     console.error('Error sending data:', error);
  //   }
  // };
  // sendData();

  //----put req-->update
  //   const updateData = async () => {
  //     try {
  //       const response = await axios.put('https://api.escuelajs.co/api/v1/users/16', {

  //     "avatar": "https://randomuser.me/api/portraits/men/24.jpg"
  //       });
  //       console.log('Update Successful:', response.data);
  //     } catch (error) {
  //       console.error('Error updating resource:', error);
  //     }
  //   };
  //   updateData();

  //  "id": 1,
  //     "email": "john@mail.com",
  //     "password": "changeme",
  //     "name": "John",
  //     "role": "customer",
  //     "avatar": "https://i.imgur.com/LDOO4Qs.jpg",

  // {/* <div>Users List..</div>
  //      {usersList.map(user=>{
  //        return( <>
  //        <div>
  //            {user.name}
  //        </div>
  //        </>)
  //      })} */}
  const searchTerm = searchQuery.get("search");
  console.log(searchTerm);

  const { friendList } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <>
      <div>Users List..</div>
      <Container fluid>
        <Row>
          {usersList
            .filter(({ name, role }) => {
              return (
                !searchTerm || (name + role).toLowerCase().includes(searchTerm)
              );
            })
            .map((user) => {
              const isFriend = friendList.includes(`${user?.id}`);
              console.log(isFriend);
              
              return <UsersDisplay
                key={user.id}
                user={user}
                isFriend={isFriend}
                dispatch={dispatch}
              />;
            })}
        </Row>
      </Container>
    </>
  );
}

export default UsersListDemo;
