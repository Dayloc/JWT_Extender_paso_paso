import React, { useState } from 'react';
import { login } from '../services/fetchs';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { store, dispatch } = useGlobalReducer()
  const handleLogin = () => {
    if (!email || !password) {
      console.log("Faltan datos");
      return;
    }
    login({ email, password ,dispatch});
  };

  return (
    <div>
      <input
        className='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email'
      />
      <input
        className='password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
      />
      <button onClick={handleLogin}>ENTER</button>
    </div>
  );
}

export default Login;
