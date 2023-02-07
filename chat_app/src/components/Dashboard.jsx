import React, { useEffect, useState } from "react";
import {  Container,Col, Row, Button, Card, Form   } from 'react-bootstrap';


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
                    <Container className="border border-dark h-auto">
                    <Row >
    
        <Col md="auto">
        <br/>
        <Card style={{ width: '18rem'}} >
        <Container >
            <br/>
        <Card.Title className="fw-bold text-center text-capitalize">{accounts.firstname} {accounts.lastname}</Card.Title>
   
        </Container>
        <br/>
        
      <Card.Header className="fw-bolder text-center fs-4">Contacts:</Card.Header>
      <br/>
      <div className="p-2 bg-light border border-dark h-10 align-bottom overflow-auto container-fluid" style= {{height: `300px`}}>
            <p className="fw-bold text-capitalize">Users </p>
            <p className="fw-bold text-capitalize">Users </p>
            <p className="fw-bold text-capitalize">Users </p>
            <p className="fw-bold text-capitalize">Users </p>
            <p className="fw-bold text-capitalize">Users </p>
            <p className="fw-bold text-capitalize">Users </p>
            <p className="fw-bold text-capitalize">Users </p>
            <p className="fw-bold text-capitalize">Users </p>
            <p className="fw-bold text-capitalize">Users </p>
 
          </div>
     

    </Card>
    <br></br>
            <br></br>
      
            <Button onClick={logout} variant="outline-success" className="btn-lg">Sign Out</Button>
                        </Col>
        <Col>
        <br/>
        <h3>Chatbox</h3>
        <h5>To: </h5>
          <div className="p-2 bg-light border border-dark h-10 align-bottom overflow-auto container-fluid" style= {{height: `300px`}}>
            <p>User1: Hi, how are you?</p>
            <p>User2: I'm good, thanks for asking.</p>
            <p>User1: What have you been up to?</p>
            <p>User2: Just been busy with work.</p>
       

           
          </div>
          <br/>
        <Form >

<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
  <Form.Label className="fw-bold">Message:</Form.Label>
  <Form.Control as="textarea"
                id="messageForm" 
                name="message" 
                className="border border-dark" 
               
                
  rows={5} style={{ resize: 'none'}} />
</Form.Group>
</Form>
<Button type="submit" variant="outline-success" className="float-end btn-lg" block>Send</Button>
        </Col>
      </Row>
                        
      <br/>
      <br/>
                        </Container>
                </div>
            })}
            

            </div>



    )
}
export default Dashboard;