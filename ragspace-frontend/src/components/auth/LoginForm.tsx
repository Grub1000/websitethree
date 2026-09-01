import {
    useState,
    type FormEvent,
} from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./LoginForm.css";

import {
    GoogleLogin,
} from "@react-oauth/google";


function LoginForm() {
    const {
        login,
        loginWithGoogle,
    } = useAuth();
    const navigate =
        useNavigate();


    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);


    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        setError("");
        setLoading(true);


        try {
            await login(
                email,
                password,
            );

            navigate(
                "/ragspace",
            );
        } catch {
            setError(
                "Invalid email or password.",
            );
        } finally {
            setLoading(false);
        }
    }


    async function handleGoogleLogin(
        credential?: string,
    ) {
        if (!credential) {
            setError(
                "Google login failed.",
            );

            return;
        }

        setError("");
        setLoading(true);

        try {
            await loginWithGoogle(
                credential,
            );

            navigate("/ragspace");
        } catch {
            setError(
                "Unable to sign in with Google.",
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            className="login-form"
            onSubmit={handleSubmit}
        >
            <div className="login-form-header">
                <h1>Welcome back</h1>

                <p>
                    Sign in to continue to
                    your Spaces.
                </p>
            </div>


            <div className="login-form-fields">

                <div className="form-field">
                    <label htmlFor="email">
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(
                                event.target.value,
                            )
                        }
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                    />
                </div>


                <div className="form-field">
                    <label htmlFor="password">
                        Password
                    </label>

                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(
                                event.target.value,
                            )
                        }
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        required
                    />
                </div>

            </div>


            {error && (
                <p className="login-form-error">
                    {error}
                </p>
            )}


            <button
                className="login-submit-button"
                type="submit"
                disabled={loading}
            >
                {loading
                    ? "Signing in..."
                    : "Sign in"}
            </button>

            <div className="login-divider">
                <span>or continue with</span>
            </div>

            <div className="google-login-container">
                <GoogleLogin
                    onSuccess={(response) =>
                        handleGoogleLogin(
                            response.credential,
                        )
                    }
                    onError={() =>
                        setError(
                            "Google login failed.",
                        )
                    }
                    theme="filled_black"
                    size="large"
                    shape="rectangular"
                    text="continue_with"
                    
                />
            </div>

        </form>
    );
}


export default LoginForm;