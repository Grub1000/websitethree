import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import "../css/LoginPage.css"

// React Router imports
import { Link } from "react-router-dom";


export default function LoginPage(){

    const { login, loginWithGoogle } = useAuth();


    const [email,setEmail] = useState("");

    const [password,setPassword] = useState("");

    const navigate = useNavigate();


    async function handleSubmit(
        e: React.FormEvent
    ){

        e.preventDefault();


        await login(
            email,
            password
        );

        navigate("/profile")
    }

    return (
        <section className="LoginPageWrapper">
            <form  className="LoginPageForm" onSubmit={handleSubmit} >
                <h1 className="LoginPageHeadingText">Welcome Back</h1>
                <p className="LoginPageSignUpLinkText">Don't have an account? <Link to="/register">Sign up</Link></p>
                <div className="LoginPageGoogleLoginButtonWrapper">
                    <GoogleLogin onSuccess={async (credentialResponse) => {
                    if (!credentialResponse.credential) {return}
                    try {await loginWithGoogle(credentialResponse.credential);
                        navigate("/profile");
                    }catch {
                        alert("Google login failed.");
                    }}}
                    onError={() => {
                        console.log(
                            "Google Login Failed"
                        );
                    }} />
                </div>
                <p className="LoginPageOrContinueText">or continue with</p>
                <input className="LoginPageInput"
                    value={email}
                    onChange={
                        e => setEmail(e.target.value)
                    }
                    placeholder="Your email address"
                />
                <input className="LoginPageInput"
                    type="password"
                    value={password}
                    onChange={
                        e => setPassword(e.target.value)
                    }
                    placeholder="Enter your password"
                />
                <Link className="LoginPageForgotPasswordLink" to="/forgot-password">
                    Forgot Password?
                </Link>

                <button  className="LoginPageButton Btn" type="submit">Login</button>
            </form>
        </section>

    );

}
