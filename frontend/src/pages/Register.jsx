import { useState } from "react";
import AuthCard from "../components/AuthCard";
import SingleInput from "../components/SingleInput";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    return (
    <AuthCard isLogin={false}>
      <form>
         <SingleInput
          label="Username"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nome di gioco"
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
          placeholder="••••••••"
        />
      </form>
    </AuthCard>
    )
}
export default Register;