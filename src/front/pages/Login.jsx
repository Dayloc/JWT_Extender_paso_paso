import React, { useState } from 'react';
import { login } from '../services/fetchs';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { dispatch } = useGlobalReducer();
	const navigate = useNavigate();

	const handleLogin = async () => {
		if (!email || !password) {
			console.log("Faltan datos");
			return;
		}

		const response = await login({ email, password, dispatch });

		if (response.ok) {
			console.log("Login exitoso");
			navigate("/profile");
		} else {
			console.log("Login fallido");
		}

		setEmail("");
		setPassword("");
	};

	return (
		<div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
			<div className="card p-4 shadow w-100" style={{ maxWidth: "400px" }}>
				<h3 className="text-center mb-4 text-primary">Iniciar Sesión</h3>

				<div className="mb-3">
					<label className="form-label">Email</label>
					<input
						type="email"
						className="form-control"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="ejemplo@correo.com"
					/>
				</div>

				<div className="mb-4">
					<label className="form-label">Contraseña</label>
					<input
						type="password"
						className="form-control"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="********"
					/>
				</div>

				<button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>
					Entrar
				</button>

				<p className="text-center mb-0">
					¿No tienes cuenta?{" "}
					<Link to="/register" className="text-decoration-none text-primary">
						Regístrate aquí
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
