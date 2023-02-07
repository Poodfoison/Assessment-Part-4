import React, { useEffect, useState } from "react";
import {  Container,Col, Row, Button, ListGroup, Card, Form   } from 'react-bootstrap';


const Dashboard = ({ setAuth }) => {
    const [account, setAccount] = useState([]);

    const getProfile = async () => {
        try {
            //fetch api that uses the GET method
            const response = await fetch(
                "http://localhost:8000/account",
                {
                    method: "GET",
                    //retrieving the token and putting it in the Auth header
                    headers: { Authorization: "Bearer " + localStorage.getItem('token') }
                })
            //parsing the json back to a JS object
            const parseRes = await response.json();
            setAccount(parseRes);

        } catch (error) {
            console.log(error.message)
        }
    }

    const logout = async (e) => {
        e.preventDefault()
        try {
            //removing the token from localstorage
            localStorage.removeItem('token')
            setAuth(false)
        } catch (error) {
            console.log(error.message)
        }
    }



    useEffect(() => {
        const interval = setInterval(() => {
            getProfile();
            }, 1000);
            return () => clearInterval(interval);
    }, [])
    return (

 
        <div>
            <Container >
                <Row><br/><br/><br/>
                
                </Row>
            </Container>
       
            {account.map(accounts => {
                return <div key={accounts.userid}>
                    <Container style={{ backgroundColor:`white`}} >
                    <Row >
    
        <Col md="auto">

        <Card style={{ width: '18rem'}} >
        <Container >
            <br/>
        <Card.Title className="fw-bold text-center text-capitalize">{accounts.firstname} {accounts.lastname}</Card.Title>
   
        </Container>
        <br/>
        
      <Card.Header className="fw-bolder text-center fs-4">Contacts:</Card.Header>
      <ListGroup>
        <ListGroup.Item className="fw-bold text-capitalize">Users </ListGroup.Item>
        <ListGroup.Item className="fw-bold text-capitalize">Users </ListGroup.Item>
        <ListGroup.Item className="fw-bold text-capitalize">Users </ListGroup.Item>
        <ListGroup.Item className="fw-bold text-capitalize">Users </ListGroup.Item>

      </ListGroup>
  

    </Card>
    <br></br>
            <br></br>
      
            <Button onClick={logout} variant="outline-success">Sign Out</Button>
                        </Col>
        <Col>

        <h3>Chatbox</h3>
          <div className="d-flex flex-column p-2 bg-light">
            <p>User1: Hi, how are you?</p>
            <p>User2: I'm good, thanks for asking.</p>
            <p>User1: What have you been up to?</p>
            <p>User2: Just been busy with work.</p>
          </div>
        <Form >

<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
  <Form.Label className="fw-bold">Message:</Form.Label>
  <Form.Control as="textarea"
                id="messageForm" 
                name="message"  
               
                
  rows={5} style={{ resize: 'none'}} />
</Form.Group>
</Form>
<Button type="submit" variant="outline-success" block>Submit</Button>
        </Col>
      </Row>
                        
      
                        </Container>
                </div>
            })}
            

            </div>



    )
}
export default Dashboard;