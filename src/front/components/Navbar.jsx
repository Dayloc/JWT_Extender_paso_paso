import { Link, useNavigate } from "react-router-dom";
import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();
	const { token } = store;
	const navigate = useNavigate();

	const handleDeleteToken = () => {
		localStorage.removeItem("token");
		dispatch({ type: "save_token", payload: "" }); // esto actualiza el store
		navigate("/login");
	};

	return (
		<nav className="navbar navbar-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1 text-warning">Home</span>
				</Link>
				<div className="ml-auto">
					{token ? (
						<button className="btn btn-primary" onClick={handleDeleteToken}>
							Logout
						</button>
					) : (
						<Link to="/login">
							<button className="btn btn-primary">Login</button>
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
};
