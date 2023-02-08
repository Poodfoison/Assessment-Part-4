import React, {  useState , useEffect } from "react";


export const Incoming = ({ setAuth }) => {
    const [incoming, setIncoming] = useState([]);

    const getMessage = async () => {
        try {
            //fetch api that uses the GET method
            const response = await fetch(
                "http://localhost:8000/recieved",
                {
                    method: "GET",
                    //retrieving the token and putting it in the Auth header
                    headers: { Authorization: "Bearer " + localStorage.getItem('token') }
                })
            //parsing the json back to a JS object
            const parseRes = await response.json();
            setIncoming(parseRes);

        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {


        const interval = setInterval(() => {
            getMessage();
            }, 1000);
            return () => clearInterval(interval);

            
    }, [])
  return (
    <div>
         <div className="p-2 bg-light border border-dark h-10 align-bottom overflow-auto container-fluid" style= {{height: `300px`}}>
         {incoming.map(incomings => {
                return <div className="border-dark container">
                    <p className="m-0 sm-4 fw-bold text-capitalize text-wrap"><u>{incomings.firstname} {incomings.lastname}</u></p>
                    <p className="m-0 sm-4 text-capitalize text-muted text-wrap"><small> {incomings.time}</small></p>
                    <p className="m-0 sm-4">{incomings.message}</p>
                    <p>---------------------------------------------------------------------------------------------------------------------------------</p>
   
                    
                </div>
            

            })} 
          </div>
        
    </div>
  )
  }