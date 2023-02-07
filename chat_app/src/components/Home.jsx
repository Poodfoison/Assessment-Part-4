import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { ModalRegister } from "./ModalRegister";




const Home = ({ setAuth }) => {
    const [modalShow, setModalShow] = useState(false);
    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    })

    //setting the inputs
    const onChange = e => {    //username     : barney   
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    //deconstructing the username and password variable from the inputs
    const { username, password } = inputs

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {

            //making a body object from the values of username and password
            const body = { username, password }

            //fetch api for POST method
            const response = await fetch(
                "http://localhost:8000/login",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            )

            const parseRes = await response.json()
   


            if (parseRes.token) {
                //localstorage
                localStorage.setItem("token", parseRes.token)
                setAuth(true)
            } else {
                setAuth(false)
                   
                
            }

        } catch (error) {
            console.log(error.message)
        }
    }
    return (

        <>
        

        <div>
  
        <div className="" >
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card border-0 shadow rounded-3 my-5">
                        <div className="card-body p-4 p-sm-5">
                        <h3 className="card-title text-center text-uppercase font-weight-bold ">Chat App</h3>
                            <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                            <form onSubmit={onSubmitForm} className="p-4 p-sm-3">
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        id="usernameForm"
                                        name="username"
                                        className="form-control"
                                        value={username}
                                        onChange={e => onChange(e)} />
                                    <label className="form-label">username</label>
                                </div>


                                <div className="form-floating mb-3">
                                    <input
                                        type="password"
                                        id="passwordForm"
                                        name="password"
                                        className="form-control"
                                        value={password}
                                        onChange={e => onChange(e)} />
                                    <label className="form-label">Password</label>
                                </div>


                                <div className="d-grid">
                                    <button className="btn btn-outline-success btn-login text-uppercase fw-bold" type="submit">Sign
                                        in</button>
                                <br/>
                                        <Button variant="outline-success" className="text-uppercase fw-bold" onClick={() => setModalShow(true)}>Sign Up</Button>
          <ModalRegister
        show={modalShow}
        onHide={() => setModalShow(false)}

      />
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        </div>

        </>
    )
}
export default Home;