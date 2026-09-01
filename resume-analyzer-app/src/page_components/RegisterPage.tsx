import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import {registerUser} from "../api/auth_service";

import '../css/authentication_pages_css/RegisterPage.css';

// React Router imports
import { Link } from "react-router-dom";


export default function RegisterPage() {

  const { loginWithGoogle } = useAuth();

  // const { login, loginWithGoogle } = useAuth();
  // const navigate = useNavigate();
  const [email,setEmail] = useState("");

  const [password,setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const securePasswordRegex: RegExp =  /^(?=.{8,64}$)(?=\S+$)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$])[A-Za-z\d!@#$]+$/;

  let passwordIsValid = password.length >= 8 && password.length <= 64 && securePasswordRegex.test(password);

  const navigate = useNavigate();

  async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ){
      e.preventDefault();
      setError("");
      setLoading(true);
      if(passwordIsValid) {
       try {
            await registerUser({
                email,
                password,
            });

            navigate("/login", {
              state: {
                successMessage: "Account successfully created! You may now log in using your credentials.",
              },
            });
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Registration failed."
            );
            console.log(error);
            // setLoading(false)
        } finally {
            setLoading(false);
        }
      } else {
        setLoading(false);
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
              navigate("/resume-analyzer");
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
        <button className="RegisterPageButton Btn" type="submit" disabled={loading}>{loading ? "Creating account..." : "Register"}</button>

        {/* Messages for secure password requirements */}
        {password.length >= 8 && password.length <= 64 || password === "" ? null : <p className="RegisterPageErrorText">password must be between 8 and 64 characters long.</p>}
        {/^\S+$/.test(password) || password === "" ? null : <p className="RegisterPageErrorText">password cannot contain whitespace.</p>}
        {/[A-Z]/.test(password) || password === "" ? null : <p className="RegisterPageErrorText">at least one uppercase letter.</p>}
        {/[a-z]/.test(password) || password === "" ? null : <p className="RegisterPageErrorText">at least one lowercase letter.</p>}
        {/\d/.test(password) || password === "" ? null : <p className="RegisterPageErrorText">at least one number.</p>}
        {/[!@#$]/.test(password) || password === "" ? null : <p className="RegisterPageErrorText">at least one special character !,@,#,$.</p>}
        {passwordIsValid || password === "" ? null : <p className="RegisterPageErrorText">password does not meet all requirements.</p>}

        {/* Error message from registration api */}
        {error && (
                <p className="RegisterPageErrorText">
                    {error}
                </p>
            )}
      </form>
    </section>
  );
}

