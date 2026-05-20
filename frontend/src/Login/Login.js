import React, { useState } from "react";
import { Col, Card, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import { loginUtil } from "../apiUtil";
import { useDispatch } from "react-redux";
import { loginActionCreator } from "../reducers/userReducer";
import { useLocation, useNavigate } from "react-router-dom";
const Login = ({ handleLoginData }) => {
  // const state = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const {name,msg}=state;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { state: prevPath } = useLocation();
  const navigate = useNavigate();
  const login = async () => {
    const payload = { username, password };
    try {
      dispatch(loginActionCreator(payload));
      //  const data =  (await loginUtil(payload))?.data;
      //  console.log(data);
      if (prevPath) {
        navigate(prevPath);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Col
        lg={{ span: 4, offset: 4 }}
        md={{ span: 6, offset: 3 }}
        sm={{ span: 10, offset: 1 }}
      >
        <Card className=" users mt-5 p-5">
          <Card.Title>Login</Card.Title>
          <Card.Body>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>UserName</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter UserName"
                // ref={username}
                onBlur={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onBlur={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              disabled={!(username.length > 0 && password.length > 0)}
              onClick={login}
              variant="primary"
              type="submit"
            >
              Login
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
};

export default Login;
