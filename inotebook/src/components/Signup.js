import React from 'react'
import { useNavigate } from 'react-router';

const Signup = (props) => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.elements.name.value;
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const cpassword = e.target.elements.cpassword.value;

        try {
            const response = await fetch("http://localhost:4000/api/auth/createUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                }),
            });

            if (response.ok) {
                const json = await response.json();
                const user = json.user;
                const token = json.token;


                console.log("User:", user);
                console.log("Token:", token);
                alert("Succesfully Created account !!", "success")
            } else {
                const errorResponse = await response.json();
                alert("Could not sign up", "danger");
                console.error("SignUp failed:", errorResponse.error);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <div>
            <div className="container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>SignUp</h2>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" required />
                    </div>

                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required minLength={7} />
                    </div>
                    <div>
                        <label htmlFor="cpassword">Password:</label>
                        <input type="password" id="cpassword" name="cpassword" required minLength={7} />
                    </div>


                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Signup;
