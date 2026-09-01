import {
    useState,
    type FormEvent,
} from "react";

import { useNavigate } from "react-router-dom";

import {
    GoogleLogin,
} from "@react-oauth/google";

import {
    registerUser,
} from "../../api/authApi";

import {
    useAuth,
} from "../../context/AuthContext";

import "./RegisterForm.css";


function RegisterForm() {
    const navigate = useNavigate();

    const {
        login,
        loginWithGoogle,
    } = useAuth();


    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [
        confirmPassword,
        setConfirmPassword,
    ] = useState("");

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const passwordChecks = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password),
    };


    const passwordIsValid =
        Object.values(
            passwordChecks,
        ).every(Boolean);


    const passwordsMatch =
        password.length > 0 &&
        password === confirmPassword;


    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        setError("");


        if (!passwordIsValid) {
            setError(
                "Password does not meet all requirements.",
            );

            return;
        }


        if (!passwordsMatch) {
            setError(
                "Passwords do not match.",
            );

            return;
        }


        setLoading(true);


        try {
            await registerUser({
                email,
                password,
            });

            await login(
                email,
                password,
            );

            navigate(
                "/ragspace",
            );
        } catch (error) {
            if (
                error instanceof Error
            ) {
                setError(
                    error.message,
                );
            } else {
                setError(
                    "Registration failed.",
                );
            }
        } finally {
            setLoading(false);
        }
    }


    async function handleGoogleLogin(
        credential?: string,
    ) {
        if (!credential) {
            setError(
                "Google registration failed.",
            );

            return;
        }

        setError("");
        setLoading(true);

        try {
            await loginWithGoogle(
                credential,
            );

            navigate(
                "/ragspace",
            );
        } catch {
            setError(
                "Unable to continue with Google.",
            );
        } finally {
            setLoading(false);
        }
    }


    return (
        <form
            className="register-form"
            onSubmit={handleSubmit}
        >
            <div className="register-form-header">
                <h1>
                    Create your account
                </h1>

                <p>
                    Start building your first
                    intelligent Space.
                </p>
            </div>


            <div className="register-form-fields">

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
                        placeholder="Create a password"
                        autoComplete="new-password"
                        required
                    />
                    <div className="password-requirements">

                        <p
                            className={
                                passwordChecks.length
                                    ? "password-check valid"
                                    : "password-check"
                            }
                        >
                            <span>
                                {passwordChecks.length
                                    ? "✓"
                                    : "○"}
                            </span>

                            At least 8 characters
                        </p>


                        <p
                            className={
                                passwordChecks.uppercase
                                    ? "password-check valid"
                                    : "password-check"
                            }
                        >
                            <span>
                                {passwordChecks.uppercase
                                    ? "✓"
                                    : "○"}
                            </span>

                            One uppercase letter
                        </p>


                        <p
                            className={
                                passwordChecks.lowercase
                                    ? "password-check valid"
                                    : "password-check"
                            }
                        >
                            <span>
                                {passwordChecks.lowercase
                                    ? "✓"
                                    : "○"}
                            </span>

                            One lowercase letter
                        </p>


                        <p
                            className={
                                passwordChecks.number
                                    ? "password-check valid"
                                    : "password-check"
                            }
                        >
                            <span>
                                {passwordChecks.number
                                    ? "✓"
                                    : "○"}
                            </span>

                            One number
                        </p>


                        <p
                            className={
                                passwordChecks.special
                                    ? "password-check valid"
                                    : "password-check"
                            }
                        >
                            <span>
                                {passwordChecks.special
                                    ? "✓"
                                    : "○"}
                            </span>

                            One special character
                        </p>

                    </div>
                </div>
                

                <div className="form-field">
                    <label htmlFor="confirm-password">
                        Confirm password
                    </label>

                    <input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(event) =>
                            setConfirmPassword(
                                event.target.value,
                            )
                        }
                        placeholder="Re-enter your password"
                        autoComplete="new-password"
                        required
                    />

                    {confirmPassword && (
                        <p
                            className={
                                passwordsMatch
                                    ? "password-match valid"
                                    : "password-match invalid"
                            }
                        >
                            {passwordsMatch
                                ? "✓ Passwords match"
                                : "Passwords do not match"}
                        </p>
                    )}
                </div>

            </div>


            {error && (
                <p className="register-form-error">
                    {error}
                </p>
            )}


            <button
                className="register-submit-button"
                type="submit"
                disabled={loading}
            >
                {loading
                    ? "Creating account..."
                    : "Create account"}
            </button>


            <div className="register-divider">
                <span>
                    or continue with
                </span>
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
                            "Google registration failed.",
                        )
                    }
                    theme="filled_black"
                    size="large"
                    shape="rectangular"
                    text="continue_with"
                    // width="420"
                />
            </div>

        </form>
    );
}


export default RegisterForm;