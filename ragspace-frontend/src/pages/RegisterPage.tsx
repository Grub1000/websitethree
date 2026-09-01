import {
    Link,
} from "react-router-dom";

import RegisterForm from "../components/auth/RegisterForm";

import "./RegisterPage.css";


function RegisterPage() {
    return (
        <main className="register-page">

            <section className="register-brand-panel">

                <div className="register-brand">
                    <div className="register-logo">
                        ◈
                    </div>

                    <span>
                        RAGspace
                    </span>
                </div>


                <div className="register-brand-content">
                    <h2>
                        Build your knowledge.
                        <br />
                        Ask better questions.
                    </h2>

                    <p>
                        Create Spaces for the
                        documents that matter,
                        then turn them into
                        searchable, conversational
                        knowledge.
                    </p>
                </div>

            </section>


            <section className="register-form-panel">

                <div className="register-form-container">

                    <RegisterForm />


                    <div className="register-login">
                        <span>
                            Already have an account?
                        </span>

                        <Link to="/ragspace/login">
                            Sign in
                        </Link>
                    </div>

                </div>

            </section>

        </main>
    );
}


export default RegisterPage;