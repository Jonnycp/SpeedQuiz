import { useState } from "react";

import AuthCard from "../components/AuthCard";
import SingleInput from "../components/SingleInput";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthCard isLogin={true}>
      <form>
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
  );
};

export default Login;
