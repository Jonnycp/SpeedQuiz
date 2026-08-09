import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

import AuthCard from "../components/AuthCard";
import SingleInput from "../components/SingleInput";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  
  async function handleSubmit(e){
    e.preventDefault();
    setError("");

    try{
      await login(email, password);
      navigate("/");
    }catch(err) {
      setError(err || "Al momento abbiamo qualche problema ad eseguire il login :(");
    }
  }

  return (
    <AuthCard isLogin={true} onSubmit={handleSubmit}>
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
          placeholder="••••••••"
        />
    </AuthCard>
  );
};

export default Login;
