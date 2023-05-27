import React from "react";
import { useNavigate } from 'react-router-dom';
import './Login.css'


const Login = (props) => {
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.elements.email.value; // Retrieve email from the form input
        const password = e.target.elements.password.value;
        try {
            const response = await fetch("http://localhost:4000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            if (response.ok) {
                const json = await response.json();
                localStorage.setItem('token', json.token);

                console.log(json);
                navigate('/')

                alert("Succesfully logged in!!", "success")
            } else {
                const errorResponse = await response.json();
                alert("Invalid credentials", "danger")
                console.error("Login failed:", errorResponse.error);
            }
        } catch (error) {
            console.error("An error occurred:", error);

        }
    };

    return (
        <div className="container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
