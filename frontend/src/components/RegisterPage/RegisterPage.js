import React, { useContext, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import urlConfig from "../../config.js";
import axios from "axios";
import { AppContext } from '../../context/AuthContext.js';

function RegisterPage() {

    const [firstName, setFn] = useState('');
    const [lastName, setLn] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPswrd] = useState('');

    const [showErr, setShowErr] =useState('');
    const { setIsLoggedIn, setUserName } = useContext(AppContext);
    const navigate =useNavigate();
    const handleRegister = async () => {
        try {
            const url = `${urlConfig.backend_url}/auth/register`;
            const userInfo = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            }
            const response = await axios.post(url,userInfo);
            
            // if error occurs at response catch will take care of it
            // if no error then a token is generated and sent
            const data = response.data;
            sessionStorage.setItem('authToken',data.token);
            sessionStorage.setItem('email',data.email);
            sessionStorage.setItem('username',data.firstName);
            setIsLoggedIn(true);
            setUserName(data.firstName);
            navigate('/');
        }
        catch (error) {
            // keys in error obj:{message, name, code, config, request, response}
            setShowErr(error.response.data.error); // backend is sending a response(json) with data as a json {error:"email already exists"}
        }
    }

    return (

        <div className="container ">
            <div className="row d-flex justify-content-center align-items-center ">
                <div className="col-lg-12 col-xl-11">
                    <div className="card text-black" style={{ borderRadius: '25px' }}>
                        <div className="card-body p-md-3">
                            <div className="row justify-content-center">
                                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                    <p className="text-center h1 fw-bold mb-4 mx-1 mx-md-4 mt-4">Sign up</p>
                                    <form className="mx-1 mx-md-4">
                                        <div className="form-floating mb-4">
                                            <input type="email" className="form-control" id="form3Example3c" placeholder="Your Email" onChange={(e)=>{setEmail(e.target.value)}} />
                                            <label htmlFor="form3Example3c">Email</label>
                                        </div>

                                        <div className="text-danger">{showErr}</div>

                                        <div className="form-floating mb-4">
                                            <input type="text" className="form-control" id="form3Example1c" placeholder="First Name" onChange={(e)=>{setFn(e.target.value)}}/>
                                            <label htmlFor="form3Example1c">Firstname</label>
                                        </div>
                                        <div className="form-floating mb-4">
                                            <input type="text" className="form-control" id="form3Example2c" placeholder="Last Name" onChange={(e)=>{setLn(e.target.value)}}/>
                                            <label htmlFor="form3Example2c">Lastname</label>
                                        </div>

                                        <div className="form-floating mb-4">
                                            <input type="password" className="form-control" id="form3Example4c" placeholder="Password" onChange={(e)=>{setPswrd(e.target.value)}}/>
                                            <label htmlFor="form3Example4c">Password</label>
                                        </div>
                                        {/* <div className="form-floating mb-4">
                                            <input type="password" className="form-control" id="form3Example4cd" placeholder="Repeat your password" />
                                            <label htmlFor="form3Example4cd">Repeat your password</label>
                                        </div> */}

                                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                            <button type="button" className="btn btn-primary btn-lg" onClick={handleRegister}>Register</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                        className="img-fluid" alt="Sample image" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
