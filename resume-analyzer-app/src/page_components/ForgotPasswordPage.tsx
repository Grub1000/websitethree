import { useState } from "react"; 
// import axios from "axios"; 

// CSS Styling Imports
import "../css/authentication_pages_css/ForgotPasswordPage.css"


function ForgotPasswordPage() { 

    const [email, setEmail] = useState(""); 
    const [message, setMessage] = useState(""); 
    const [error, setError] = useState(""); 
    const [loading, setLoading] = useState(false); 

    const API_URL = import.meta.env.VITE_API_URL;

    async function handleSubmit( event: React.FormEvent ) { 
        event.preventDefault(); 
        setMessage(""); 
        setError(""); 
        setLoading(true); 
        try { 
            const response = await fetch( `${API_URL}/auth/forgot-password/`, {
                 method: "POST", 
                 headers: { "Content-Type": "application/json", }, 
                 body: JSON.stringify({ email, }), } ); 
            if (!response.ok) { 
                throw new Error( "Password reset request failed." ); } 
            const data = await response.json(); 
            setMessage( data.message ); 
            setEmail(""); 

        } catch (error) { 

            setError( "Something went wrong. Please try again." ); 

        } finally { setLoading(false); } }

    return ( 

    <section className="ForgotPasswordPageWrapper"> 
        <h1 className="ForgotPasswordHeaderText"> Forgot Password </h1> 
        <form onSubmit={handleSubmit}> 
            <input className="ForgotPasswordEmailInput" type="email" placeholder="Email" value={email} onChange={ (event) => setEmail( event.target.value ) } required /> 
            <button className="ForgotPassworSendResetLinkButton" type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
            </button> 
        </form> 
            { message && <p> {message} </p> } { error && <p> {error} </p> } 
    </section> 
    ); 
} 

export default ForgotPasswordPage;