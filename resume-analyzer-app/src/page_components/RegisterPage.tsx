import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import '../css/RegisterPage.css';

// React Router imports
import { Link } from "react-router-dom";


export default function RegisterPage() {

  const { loginWithGoogle } = useAuth();

  // const { login, loginWithGoogle } = useAuth();
  // const navigate = useNavigate();
  const [email,setEmail] = useState("");

  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(
        e: React.FormEvent
    ){

        e.preventDefault();
        console.log(email, password);

        // await login(
        //     email,
        //     password
        // );

        // navigate("/profile")
    }

  return (
   <section className="RegisterPageWrapper">
      <form className="RegisterPageForm" onSubmit={handleSubmit}>
        <h1 className="RegisterPageHeadingText">Register free account</h1>
        <p className="RegisterPageSignUpLinkText">Already have an account? <Link to="/login">Log in</Link></p>
        <div className="RegisterPageGoogleLoginButtonWrapper">
          <GoogleLogin text="signup_with" onSuccess={async (credentialResponse) => {
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
        <p className="RegisterPageOrContinueText">or continue with</p>
        <input className="RegisterPageInput" type="email" id="email" placeholder="Your email address" onChange={
                        e => setEmail(e.target.value)
                    }/>
        <input className="RegisterPageInput" type="password" id="password" placeholder="Enter your password" onChange={
                        e => setPassword(e.target.value)
                    }/>
        <button className="RegisterPageButton Btn" type="submit">Register</button>
      </form>
    </section>
  );
}

