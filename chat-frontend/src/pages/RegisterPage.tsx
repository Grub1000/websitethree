import {
    useState,
} from "react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import {
    registerUser,
} from "../api/auth_service";

import "./RegisterPage.css";


type RegisterErrors = {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
};


function RegisterPage() {
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
        confirmPassword,
        setConfirmPassword,
    ] = useState("");

    const [
        errors,
        setErrors,
    ] = useState<RegisterErrors>({});

    const [
        isLoading,
        setIsLoading,
    ] = useState(false);


    function validateForm() {
    const newErrors:
        RegisterErrors = {};

    if (!email.trim()) {
        newErrors.email =
            "Email is required.";
    } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            email,
        )
    ) {
        newErrors.email =
            "Enter a valid email address.";
    }

    if (!password) {
        newErrors.password =
            "Password is required.";
    } else {
        const passwordErrors:
            string[] = [];

        if (
            password.length < 8
        ) {
            passwordErrors.push(
                "at least 8 characters",
            );
        }

        if (
            !/[A-Z]/.test(
                password,
            )
        ) {
            passwordErrors.push(
                "one uppercase letter",
            );
        }

        if (
            !/[a-z]/.test(
                password,
            )
        ) {
            passwordErrors.push(
                "one lowercase letter",
            );
        }

        if (
            !/[0-9]/.test(
                password,
            )
        ) {
            passwordErrors.push(
                "one number",
            );
        }

        if (
            passwordErrors.length > 0
        ) {
            newErrors.password =
                `Password must contain ${passwordErrors.join(", ")}.`;
        }
    }

    if (!confirmPassword) {
        newErrors.confirmPassword =
            "Please confirm your password.";
    } else if (
        password !==
        confirmPassword
    ) {
        newErrors.confirmPassword =
            "Passwords do not match.";
    }

    setErrors(newErrors);

    return (
        Object.keys(
            newErrors,
        ).length === 0
    );
}


    async function handleSubmit(
        event: React.FormEvent,
    ) {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setIsLoading(true);
            setErrors({});

            await registerUser(
                email.trim(),
                password,
            );

navigate("/login");

            navigate(
                "/relay/login",
            );
        } catch (error) {
            if (
                error instanceof Error
            ) {
                const apiError =
                    error as Error & {
                        data?: Record<
                            string,
                            string[] | string
                        >;
                    };

                const data =
                    apiError.data;

                if (data) {
                    setErrors({
                        username:
                            getErrorMessage(
                                data.username,
                            ),
                        email:
                            getErrorMessage(
                                data.email,
                            ),
                        password:
                            getErrorMessage(
                                data.password,
                            ),
                        general:
                            getErrorMessage(
                                data.detail,
                            ) ??
                            getErrorMessage(
                                data.non_field_errors,
                            ),
                    });
                } else {
                    setErrors({
                        general:
                            error.message,
                    });
                }
            } else {
                setErrors({
                    general:
                        "Unable to create account.",
                });
            }
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className="RegisterPage">

            <div className="RegisterCard">

                <div className="RegisterBrand">
                    <div className="RegisterBrandIcon">
                        R
                    </div>

                    <span>
                        Relay
                    </span>
                </div>


                <div className="RegisterHeading">
                    <h1>
                        Create your account
                    </h1>

                    <p>
                        Join Relay and start messaging.
                    </p>
                </div>


                <form
                    className="RegisterForm"
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
                                (event) =>
                                    setEmail(
                                        event.target.value,
                                    )
                            }
                            autoComplete="email"
                        />

                        {errors.email && (
                            <span className="RegisterFieldError">
                                {errors.email}
                            </span>
                        )}
                    </label>


                    <label>
                        Email

                        <input
                            type="email"
                            value={
                                email
                            }
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
                            autoComplete="email"
                        />

                        {errors.email && (
                            <span className="RegisterFieldError">
                                {
                                    errors.email
                                }
                            </span>
                        )}
                    </label>


                    <label>
                        Password

                        <input
                            type="password"
                            value={
                                password
                            }
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
                            autoComplete="new-password"
                        />

                        {errors.password && (
                            <span className="RegisterFieldError">
                                {
                                    errors.password
                                }
                            </span>
                        )}
                    </label>


                    <label>
                        Confirm password

                        <input
                            type="password"
                            value={
                                confirmPassword
                            }
                            onChange={
                                (
                                    event,
                                ) =>
                                    setConfirmPassword(
                                        event
                                            .target
                                            .value,
                                    )
                            }
                            autoComplete="new-password"
                        />

                        {errors.confirmPassword && (
                            <span className="RegisterFieldError">
                                {
                                    errors.confirmPassword
                                }
                            </span>
                        )}
                    </label>


                    {errors.general && (
                        <div className="RegisterGeneralError">
                            {
                                errors.general
                            }
                        </div>
                    )}


                    <button
                        className="RegisterSubmitButton"
                        type="submit"
                        disabled={
                            isLoading
                        }
                    >
                        {isLoading
                            ? "Creating account..."
                            : "Create account"}
                    </button>

                </form>


                <p className="RegisterLoginLink">
                    Already have an account?{" "}
                    <Link to="/relay/login">
                        Sign in
                    </Link>
                </p>

            </div>

        </div>
    );
}


function getErrorMessage(
    value:
        | string
        | string[]
        | undefined,
) {
    if (!value) {
        return undefined;
    }

    if (
        Array.isArray(value)
    ) {
        return value.join(" ");
    }

    return value;
}


export default RegisterPage;