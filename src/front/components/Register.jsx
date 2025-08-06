import React, {useState} from 'react'
import { Register_end } from '../services/fetchs';
import { useNavigate } from 'react-router-dom';


function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

   const handleRegister = async () => {
        if (!email || !password) {
          console.log("Faltan datos");
          return;
        }// lo haremos así para saber si fue bien el registro
        const { ok, data } = await Register_end(email, password);

        if (ok) {
          console.log("✅ Registro exitoso:", data);
          setEmail("");
          setPassword("");
          // Redirigimos a login
          navigate('/login')
        } else {
          console.log("❌ Error al registrar:", data.message);
        }
      };


  return (
    <div>
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
            <button className='btn btn-primary m-4' onClick={handleRegister}>ENTER</button>

            
      </div>
    </div>
  )
}

export default Register
