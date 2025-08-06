import React, { useState } from 'react';
import { login } from '../services/fetchs';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, useNavigate } from 'react-router-dom';


const Login=()=> {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate(); // 👈

  const handleLogin = async () => {
    if (!email || !password) {
      console.log("Faltan datos");
      return;
    }

    const response = await login({ email, password, dispatch }); // 👈 await aquí

    if (response.ok) {
      console.log("Login exitoso");
      navigate("/profile"); // 👈 redirigir
    } else {
      console.log("Login fallido");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center ">
      <div className="log d-flex flex-column w-25  justify-content-center align-items-center  m-5">
        <input
          className='email m-3'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />
        <input
          className='password m-3'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
        <button className='btn btn-primary m-4' onClick={handleLogin}>ENTER</button>
      </div>
      <div>
        <p>Si aún no se ha registrado, por favor, regístrese <br /> 
          <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}
export default Login;