import React, { useEffect, useState } from "react";
import {  Container,Col, Row, Button, Card, Form   } from 'react-bootstrap';
import {Messages} from "./Messages"
import {Incoming} from "./Incoming"

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

    const [contact, setContact] = useState([]);
   

    const getContact = async () => {
        try {
            //fetch api that uses the GET method
            const response = await fetch(
                "http://localhost:8000/contacts",
                {
                    method: "GET",
                    //retrieving the token and putting it in the Auth header
                    headers: { Authorization: "Bearer " + localStorage.getItem('token') }
                })
            //parsing the json back to a JS object
            const parseRes = await response.json();
            setContact(parseRes);

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
        getContact();

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

      
      <Form.Select htmlSize={15} aria-label="size 3 select example" > 
      {contact.map(contacts => {
                return <option className="fw-bold text-capitalize"  key={contacts.userid} value={contacts.userid}>{contacts.firstname} {contacts.lastname}</option>
          
        })}  
        </Form.Select>
       
    </Card>

    
    <br></br>
            <br></br>
      
            <Button onClick={logout} variant="outline-primary" className="btn-lg">Sign Out</Button>
                        </Col>
      <Col>
        
        <br/>
        <h3>Chatbox</h3>

          
          <br/>
          <Incoming/>
          <Messages/>


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