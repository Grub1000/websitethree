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

  const securePasswordRegex: RegExp =  /^(?=.{8,64}$)(?=\S+$)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$])[A-Za-z\d!@#$]+$/;

  let passwordIsValid = password.length >= 8 && password.length <= 64 && securePasswordRegex.test(password);

  const navigate = useNavigate();

  async function handleSubmit(
        e: React.FormEvent
    ){
      if(passwordIsValid) {
        e.preventDefault();
        console.log(email, password);

        // await login(
        //     email,
        //     password
        // );

        // navigate("/profile")
      } else {
        e.preventDefault();
        alert("Please fix the errors in the form before submitting.");
      }
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
        {password.length >= 8 && password.length <= 64 || password === "" ? null : <p className="RegisterPageErrorText">password must be between 8 and 64 characters long.</p>}
        {/^\S+$/.test(password) || password === "" ? null : <p className="RegisterPageErrorText">password cannot contain whitespace</p>}
        {/[A-Z]/.test(password) || password === "" ? null : <p className="RegisterPageErrorText">at least one uppercase letter</p>}
        {/[a-z]/.test(password) || password === "" ? null : <p className="RegisterPageErrorText">at least one lowercase letter</p>}
        {/\d/.test(password) || password === "" ? null : <p className="RegisterPageErrorText">at least one number</p>}
        {/[!@#$]/.test(password) || password === "" ? null : <p className="RegisterPageErrorText">at least one special character !,@,#,$</p>}
        {passwordIsValid || password === "" ? null : <p className="RegisterPageErrorText">password does not meet all requirements</p>}
      </form>
    </section>
  );
}

