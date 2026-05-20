import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./UsersDisplay.css";
import { Col } from "react-bootstrap";
import { addFriendAction, removeFriendAction } from "../reducers/userReducer";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
function UsersDisplay(props) {
  //  "id": 1,
  //     "email": "john@mail.com",
  //     "password": "changeme",
  //     "name": "John",
  //     "role": "customer",
  //     "avatar": "https://i.imgur.com/LDOO4Qs.jpg",

  // const { id, role, name, email, avatar } = props.user;
  // const { username,dispatch,isFriend, user:{role, name, avatar }} = props;
  const {  id,role, name, avatar } = props.user;
  const {dispatch,isFriend} = props;
  const {username} = useSelector(state=>state.user)
  const navigate=useNavigate();
  const {pathname}=useLocation()
  
  const addFriend=()=>{
    if(!username){
      alert("Please Login to the App...!!")
      navigate("/login",{state:pathname})
    }
    const payload={id:id,name:name}
    dispatch(addFriendAction(payload))
  }
  const removeFriend=()=>{
     const payload={id:id,name:name}
    dispatch(removeFriendAction(payload))
  }

  return (
    <Col lg={4} md={6} sm={10}>
      <Card className="user mb-2">
        <Card.Body className="d-flex justify-content-between">
          <img alt="img" src={avatar} height="100px" />
          <div className="d-flex flex-column justify-content-around">
            <div className="mb-4">
             {id} {role} {name} {isFriend}
            </div>
            {isFriend ?
            <Button variant="danger" onClick={removeFriend}>Remove Friend</Button>
            :<Button variant="primary" onClick={addFriend}>Add Friend</Button>
            }
            </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default UsersDisplay;
