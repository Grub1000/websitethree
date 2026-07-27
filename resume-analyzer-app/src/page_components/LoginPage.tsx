import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function LoginPage(){

    const { login } = useAuth();

    const [username,setUsername] = useState("");

    const [password,setPassword] = useState("");

    const navigate = useNavigate();


    async function handleSubmit(
        e: React.FormEvent
    ){

        e.preventDefault();


        await login(
            username,
            password
        );

        navigate("/profile")
    }



    return (

        <form onSubmit={handleSubmit}>


            <input
                value={username}
                onChange={
                    e => setUsername(e.target.value)
                }
            />


            <input
                type="password"
                value={password}
                onChange={
                    e => setPassword(e.target.value)
                }
            />


            <button type="submit">
                Login
            </button>


        </form>

    );

}


// export default LoginPage;