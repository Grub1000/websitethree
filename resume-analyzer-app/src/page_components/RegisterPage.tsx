// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";

import '../css/RegisterPage.css';

// React Router imports
import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
   <section className="RegisterPageWrapper">
      <form>
        <h1 className="RegisterPageHeadingText">Register</h1>
        <p className="RegisterPageSignUpLinkText">Don't have an account? <Link to="/register">Sign up</Link></p>
        <div>
          <label htmlFor="userName">Username:</label>
          <input type="text" id="userName" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" />
        </div>
        <button type="submit">Register</button>
      </form>
    </section>
  );
}

