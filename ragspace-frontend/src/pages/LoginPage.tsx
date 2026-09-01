import { Link } from "react-router-dom";

import LoginForm from "../components/auth/LoginForm";

import "./LoginPage.css";


function LoginPage() {
    return (
        <main className="login-page">

            <section className="login-brand-panel">

                <div className="login-brand">
                    <div className="login-logo">
                        ◈
                    </div>

                    <span>
                        RAGspace
                    </span>
                </div>


                <div className="login-brand-content">
                    <h2>
                        Your knowledge.
                        <br />
                        One intelligent space.
                    </h2>

                    <p>
                        Organize your documents,
                        ask questions, and get
                        grounded answers from the
                        knowledge that matters.
                    </p>
                </div>

            </section>


            <section className="login-form-panel">

                <div className="login-form-container">

                    <LoginForm />


                    <div className="login-register">
                        <span>
                            Don't have an account?
                        </span>

                        <Link to="/ragspace/register">
                            Create one
                        </Link>
                    </div>

                </div>

            </section>

        </main>
    );
}


export default LoginPage;