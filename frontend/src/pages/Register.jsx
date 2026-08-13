import { useState, useEffect } from "react";
import AuthCard from "../components/AuthCard";
import SingleInput from "../components/SingleInput";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const { register } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        setError("");
        setIsLoading(true);
        try{
            await register(username, email, password);
            navigate("/");
        }catch(error){
          setError(error || {message: "Al momento abbiamo qualche problema ad eseguire la registrazione :("});
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if(username.length < 2 || username.length>15 || !EMAIL_REGEX.test(email) || password.length<8){
          setIsLoading(true);
        }else{
          setIsLoading(false);
        }
    }, [username, email, password])
    
    return (
    <AuthCard isLogin={false} onSubmit={handleSubmit} isLoading={isLoading}>
        {error && <p className="text-red-500 text-center text-md mb-2">{error.message}</p>}
         <SingleInput
          label="Username"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nome di gioco"
          minLength={2}
          maxLength={15}
        />
        <SingleInput
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nome@esempio.it"
        />
        <SingleInput
          label="Password"
          type="password"
          name="password"
          value={password}
          minLength={8}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="• • • • • • • •"
        />
    </AuthCard>
    )
}
export default Register;