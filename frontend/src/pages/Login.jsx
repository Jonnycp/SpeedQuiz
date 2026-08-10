import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

import AuthCard from "../components/AuthCard";
import SingleInput from "../components/SingleInput";

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true)

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(password.length < 8 || !EMAIL_REGEX.test(email)){
      setIsLoading(true)
    }else{
      setIsLoading(false)
    }
  }, [email, password])

  async function handleSubmit(e){
    e.preventDefault();
    setError("");
    setIsLoading(true)
    try{
      await login(email, password);
      navigate("/");
    }catch(err) {
      setError(err || {message: "Al momento abbiamo qualche problema ad eseguire il login :("});
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <AuthCard isLogin={true} onSubmit={handleSubmit} isLoading={isLoading}>
      {error && <p className="text-red-500 text-center text-md mb-2">{error.message}</p>}
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
  );
};

export default Login;
