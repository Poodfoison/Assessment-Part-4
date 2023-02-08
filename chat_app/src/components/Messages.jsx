import React, {  useState } from "react";
import {  Button, Form   } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

export const Messages = ({ setAuth }) => {
const [messages, setMessage] = useState({
    message: "",
})

const onChange = e => {    
    setMessage({...messages, [e.target.name] : e.target.value})
}

const {message} = messages

const handleSubmit = async (e) => {
    e.preventDefault()
 
    try {
        const body = {message}
        toast.success('Message Sent', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            });
        
        const response = await fetch(
            "http://localhost:8000/messages",
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('token') 
                },
                body: JSON.stringify(body)
            }
        )
        
        const parseRes = await response.json()

        if(parseRes.token) {
            //localstorage
            localStorage.setItem("token", parseRes.token)
            setAuth(true)
        } else {
            setAuth(false)
        }

    } catch (error) {
        console.log(error.message)
    }
    setMessage({message:""});
}


  return (
    <div>
    <ToastContainer />
    <Form onSubmit={handleSubmit}>

    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label className="fw-bold" >Message:</Form.Label>
    <Form.Control as="textarea"
                name="message" 
                className="border border-dark" 
                value={message}
                onChange={e => onChange(e)}
                rows={5} 
                style={{ resize: 'none'}} />
    </Form.Group>
    <Button type="submit" variant="outline-primary" className="float-end btn-lg">Send</Button>
    </Form>
    </div>
  )
  }