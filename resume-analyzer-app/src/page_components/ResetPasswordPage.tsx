import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function ResetPasswordPage() { 

    const [password, setPassword] = useState(""); 
    const [confirmPassword, setConfirmPassword] = useState(""); 
    const [message, setMessage] = useState(""); 
    const [error, setError] = useState(""); 
    const [loading, setLoading] = useState(false);
    const token = new URLSearchParams( window.location.search ).get("token");
    async function handleSubmit( event: React.FormEvent ) {
        event.preventDefault(); 
        setMessage(""); 
        setError("");
        if (!token) { setError( "Invalid password reset link." ); return; }
        if (password !== confirmPassword) { setError( "Passwords do not match." ); return; }
        setLoading(true);
        try { 
            const response = await fetch( 
                `${API_URL}/auth/reset-password/`, { 
                    method: "POST", 
                    headers: { "Content-Type": "application/json", }, 
                    body: JSON.stringify({ token, password, }), } );

            const data = await response.json();

            if (!response.ok) { throw new Error( data.token || "Unable to reset password." ); }
            setMessage( data.message ); 
            setPassword(""); 
            setConfirmPassword(""); 

        } catch (error) { 

            setError( error instanceof Error ? error.message : "Something went wrong." ); 

        } finally { 

            setLoading(false); } } 

        return ( 
        <div> 
            <h1> Reset Password </h1> 
            <form onSubmit={handleSubmit}> 
                <input type="password" placeholder="New Password" value={password} onChange={ (event) => setPassword( event.target.value ) } required /> 
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={ (event) => setConfirmPassword( event.target.value ) } required /> 
                <button type="submit" disabled={loading} > { loading ? "Resetting..." : "Reset Password" } </button> 
            </form> { message && <p> {message} </p> } { error && <p> {error} </p> } 
        </div> ); } 

        export default ResetPasswordPage;