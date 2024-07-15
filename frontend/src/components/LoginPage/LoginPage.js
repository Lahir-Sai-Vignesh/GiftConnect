import React, { useContext, useEffect, useState } from 'react'
import urlConfig from '../../config.js';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AuthContext.js';

function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPswrd] = useState('');
    const [incorrect,setIncorrect] = useState('');

    const navigate = useNavigate();
    const { setIsLoggedIn,setUserName } = useContext(AppContext);

    useEffect(()=>{
        if (sessionStorage.getItem('authToken')){
            navigate("/")
        }
    },[]);

    async function handleLogin() {
        try {
            const url = `${urlConfig.backend_url}/auth/login`
            const response = await axios.post(url, { email: email, password: password });
            const data = response.data;
            sessionStorage.setItem('authToken', data.token);
            sessionStorage.setItem('email', data.email);
            sessionStorage.setItem('username',data.firstName);
            setIsLoggedIn(true);
            setUserName(data.firstName);
            navigate('/');
        }
        catch (error) {
            console.log(error)
            setIncorrect("Wrong username or password. Try again.");
          setTimeout(() => {
            setIncorrect("");
          }, 10000);
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
                                    <p className="text-center h1 fw-bold mb-4 mx-1 mx-md-4 mt-4">Login</p>
                                    <form className="mx-1 mx-md-4">
                                        <div className="form-floating mb-4">
                                            <input type="email" className="form-control" id="form3Example3c" placeholder="Your Email"
                                                onChange={(e) => { setEmail(e.target.value) }} />
                                            <label htmlFor="form3Example3c">Email</label>
                                        </div>

                                        <div className="form-floating mb-4">
                                            <input type="password" className="form-control" id="form3Example4c" placeholder="Password"
                                                onChange={(e) => { setPswrd(e.target.value) }} />
                                            <label htmlFor="form3Example4c">Password</label>
                                        </div>

                                        <span style={{ color: 'red', height: '.5cm', display: 'block', fontStyle: 'italic', fontSize: '12px' }}>{incorrect}</span>
                                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">

                                            <button className="btn btn-lg btn-outline-primary btn-block" type="button" onClick={handleLogin}>
                                                <i className="fa fa-sign-in"></i> Login
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                        className="img-fluid" alt="Sample image" />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default LoginPage
