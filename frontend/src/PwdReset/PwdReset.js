import React, { useState } from "react";
import { Button, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { qrAction, resetPwdAction } from "../reducers/userReducer";
import parse from "html-react-parser";
import { Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function PwdReset() {
  const dispatch = useDispatch();
  const { qr } = useSelector((state) => state.user);
  console.log(qr);
  const htmlString = qr;

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [pass,setPass]=useState("");
  const [tok,setTok]=useState();

  console.log({username,pass,tok});

  const reset = () => {
    const payload = { username };
    console.log(payload);

    dispatch(qrAction(payload));
  };

  const updatePwd=()=>{
    try {
        const payload={
      username,
      password:pass,
      token:tok
    }
    console.log(payload);
    
    dispatch(resetPwdAction(payload))
    navigate("/login")
    } catch (error) {
      console.log(error);
      
    }
  }


  return (
    <>
      <Container>
        <Row>
          <Col className="p-1 m-1">
            <div  style={{fontSize:"20px"}}>Pwd Reset Page...</div>
            <br />
            <label style={{margin:'10px',fontSize:"20px"}} for="qr">
              Enter username to generate QR Code for Password Resetting..
            </label>
            <br />
            <input  style={{margin:'10px'}} type="text" onChange={(e) => setUsername(e.target.value)} /><br/>
            <Button  variant="primary" style={{margin:'10px'}} onClick={(e) => reset()}>Submit</Button>
            <br />
            {parse(htmlString)} 
            <br />
          </Col>
        </Row>
      </Container>
      <div style={{borderBottom:"2px solid lightGrey",width:"70%",marginLeft:"110px"}}></div>
      <Container  className="p-2">
        <Row>
          <Col className="p-2 m-3">
            <Form>
              {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Enter Username</Form.Label>
                <Form.Control  onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter username" />
              </Form.Group> */}
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Label  style={{fontSize:"20px"}}>New Password</Form.Label>
                <Form.Control  onChange={(e) => setPass(e.target.value)} type="text" placeholder="Enter New Password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicC">
                <Form.Label  style={{fontSize:"20px"}}>Enter Google Auth Token Number</Form.Label>
                <Form.Control  onChange={(e) => setTok(+(e.target.value))} type="text" placeholder="Enter Google Auth Token Number" />
              </Form.Group>
              <Button onClick={(e)=>updatePwd()} variant="primary">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PwdReset;
