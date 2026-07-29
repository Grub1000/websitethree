import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import "../css/LoginPage.css"


export default function LoginPage(){

    const { login } = useAuth();

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

    function handleForgotPassword(){
        navigate("/forgot-password")

    }

    return (
        <section className="LoginPageWrapper">
            <form  className="LoginPageForm" onSubmit={handleSubmit} >
                <GoogleLogin onSuccess={(credentialResponse) => {
                    console.log(
                        "credential",
                        credentialResponse.credential
                    );

                }}
                onError={() => {

                    console.log(
                        "Google Login Failed"
                    );

                }}/>
                <input className="LoginPageInput"
                    value={email}
                    onChange={
                        e => setEmail(e.target.value)
                    }
                />
                <input className="LoginPageInput"
                    type="password"
                    value={password}
                    onChange={
                        e => setPassword(e.target.value)
                    }
                />
                <a className="LoginPageForgotPasswordLink" href="#" onClick={handleForgotPassword}>
                    Forgot Password?
                </a>
                <button  className="LoginPageButton Btn" type="submit">
                    Login
                </button>
            </form>
        </section>

    );

}


// export default LoginPage;