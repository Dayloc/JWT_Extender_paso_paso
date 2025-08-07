import React, { useState } from "react";
import { Register_end } from "../services/fetchs";
import { useNavigate } from "react-router-dom";

function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleRegister = async () => {
		if (!email || !password) {
			console.log("Faltan datos");
			return;
		}
		const { ok, data } = await Register_end(email, password);

		if (ok) {
			console.log("✅ Registro exitoso:", data);
			setEmail("");
			setPassword("");
			navigate("/login");
		} else {
			console.log("❌ Error al registrar:", data.message);
		}
	};

	return (
		<div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
			<div className="card p-4 shadow w-100" style={{ maxWidth: "400px" }}>
				<h3 className="text-center mb-4 text-primary">Crear Cuenta</h3>

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

				<button className="btn btn-primary w-100" onClick={handleRegister}>
					Registrarse
				</button>
			</div>
		</div>
	);
}

export default Register;
