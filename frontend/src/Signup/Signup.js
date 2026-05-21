import React, { useEffect, useRef, useState } from "react";
import { Col, Card, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./signup.css";
import { signupUtil } from "../apiUtil";
import { useDispatch } from "react-redux";
import { errorActionCreator, signupAction } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";
const Signup = () => {

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const name = useRef("");
  const username = useRef("");
  const password = useRef("");

  const [pwdValidation, setPwdValidation] = useState({
    lowercase: false,
    uppercase: false,
    number: false,
    symbol: false,
    length: false,
  });

  const [isValid, setIsValid] = useState(false);
  const { lowercase, uppercase, number, symbol, length } = pwdValidation;

  // const [password, setPassword] = useState("");
  // const [username, setUsername] = useState("");
  // const [name, setName] = useState("");

  useEffect(() => {
    console.log("pwdValidation");
    const isPwdValid = Object.values(pwdValidation).every(Boolean);
    console.log(isPwdValid);
    setIsValid(isPwdValid);
    console.log(isValid);
  }, [pwdValidation]);

  const validatePassword = (e) => {
    const password = e.target.value;
    console.log(password);
    //regex.test(String)
    const lowercase = /(?=.*[a-z])/.test(password);
    const uppercase = /(?=.*[A-Z])/.test(password);
    const number = /(?=.*\d)/.test(password);
    const symbol = /(?=.*[\W_])/.test(password);
    const length = password.length >= 8;
    const isPwdValid = lowercase && uppercase && number && symbol && length;
    console.log(isPwdValid);
    // setIsValid(isPwdValid);
    setPwdValidation({ lowercase, uppercase, number, symbol, length });
  };

  const signup = async (e) => {
    const payload = {
      name: name.current.value,
      username: username.current.value,
      password: password.current.value,
    };
    console.log(payload);
    try {
    //  const data= (await signupUtil(payload))?.data
    //  console.log(data);
    dispatch(signupAction(payload))
    navigate("/login") 
    } catch (error) {
      // console.log(error);
      errorActionCreator(error)
      
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
          <Card.Title>Signup</Card.Title>
          <Card.Body>
            <Form.Group className="mb-4" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Full Name"
                ref={name}
                // onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>UserName</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter UserName"
                ref={username}
                // onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={validatePassword}
                ref={password}
              />
            </Form.Group>
            <Button disabled={!isValid} onClick={signup} variant="primary" type="submit">
              Submit
            </Button>
          </Card.Body>
          <div className="pwd-strength">
            <div className={lowercase ? "text-success" : "text-danger"}>
              Lowercase character :- a-z
            </div>
            <div className={uppercase ? "text-success" : "text-danger"}>
              Uppercase character :- A-Z
            </div>
            <div className={number ? "text-success" : "text-danger"}>
              Numeric character :- 0-9
            </div>
            <div className={symbol ? "text-success" : "text-danger"}>
              Special character :- !@#$%^&*()_+
            </div>
            <div className={length ? "text-success" : "text-danger"}>
              Password should consist of atleast 8 or more character
            </div>
          </div>
        </Card>
      </Col>
    </Container>
  );
};

export default Signup;
