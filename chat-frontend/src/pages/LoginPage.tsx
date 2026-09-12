import {
    useState,
} from "react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import {
    GoogleLogin,
} from "@react-oauth/google";

import {
    useAuth,
} from "../context/AuthContext";

import "./LoginPage.css";


function LoginPage() {
    const {
        login,
        loginWithGoogle,
    } = useAuth();

    const navigate =
        useNavigate();

    const [
        email,
        setEmail,
    ] = useState("");

    const [
        password,
        setPassword,
    ] = useState("");

    const [
        error,
        setError,
    ] = useState<string | null>(null);

    const [
        isLoading,
        setIsLoading,
    ] = useState(false);


    async function handleSubmit(
        event: React.FormEvent,
    ) {
        event.preventDefault();

        try {
            setIsLoading(true);
            setError(null);

            await login(
                email,
                password,
            );

            navigate("/relay");
        } catch (error) {
            if (error instanceof Error) {
                setError(
                    error.message,
                );
            } else {
                setError(
                    "Unable to log in.",
                );
            }
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className="LoginPage">

            <div className="LoginCard">

                <div className="LoginBrand">
                    <div className="LoginBrandIcon">
                        R
                    </div>

                    <span>
                        Relay
                    </span>
                </div>


                <div className="LoginHeading">
                    <h1>
                        Welcome back
                    </h1>

                    <p>
                        Sign in to continue to Relay.
                    </p>
                </div>


                <form
                    className="LoginForm"
                    onSubmit={
                        handleSubmit
                    }
                >

                    <label>
                        Email

                        <input
                            type="email"
                            value={email}
                            onChange={
                                (
                                    event,
                                ) =>
                                    setEmail(
                                        event
                                            .target
                                            .value,
                                    )
                            }
                            required
                        />
                    </label>


                    <label>
                        Password

                        <input
                            type="password"
                            value={password}
                            onChange={
                                (
                                    event,
                                ) =>
                                    setPassword(
                                        event
                                            .target
                                            .value,
                                    )
                            }
                            required
                        />
                    </label>


                    {error && (
                        <div className="LoginError">
                            {error}
                        </div>
                    )}


                    <button
                        className="LoginSubmitButton"
                        type="submit"
                        disabled={
                            isLoading
                        }
                    >
                        {isLoading
                            ? "Signing in..."
                            : "Sign in"}
                    </button>

                </form>


                <div className="LoginDivider">
                    <span>
                        or
                    </span>
                </div>


                <div className="LoginGoogle">
                    <GoogleLogin
                        onSuccess={async (
                            response,
                        ) => {
                            if (
                                !response
                                    .credential
                            ) {
                                return;
                            }

                            try {
                                setError(
                                    null,
                                );

                                await loginWithGoogle(
                                    response
                                        .credential,
                                );

                                navigate(
                                    "/relay",
                                );
                            } catch (
                                error
                            ) {
                                if (
                                    error instanceof
                                    Error
                                ) {
                                    setError(
                                        error
                                            .message,
                                    );
                                }
                            }
                        }}
                        onError={() => {
                            setError(
                                "Google login failed.",
                            );
                        }}
                    />
                </div>


                <p className="LoginRegisterLink">
                    Don't have an account?{" "}
                    <Link to="/relay/register">
                        Create one
                    </Link>
                </p>

            </div>

        </div>
    );
}


export default LoginPage;