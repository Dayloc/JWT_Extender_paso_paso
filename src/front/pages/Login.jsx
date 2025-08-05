import React, { useState } from 'react';
import { login } from '../fetchs/fetchs';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      console.log("Faltan datos");
      return;
    }
    login({ email, password });
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
