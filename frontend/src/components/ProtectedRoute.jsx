import { useAuth } from "../contexts/AuthContext";

import { Navigate, Link } from "react-router";
import { Icon } from "@iconify/react";

export const MessagePage = ({ loadingPage }) => {
  return (
    <div className="flex flex-col h-screen items-center justify-center gap-10 text-3xl text-white text-center">
      {loadingPage ? (
        <>
          <p>
            Ti stiamo portando nel gioco
            <br />
            <br />
            Attendi...
          </p>
          <Icon icon="eos-icons:bubble-loading" width={50} />
        </>
      ) : (
        <>
          <p>
            <span className="text-xl text-secondary">Errore 404</span><br/>
            Ti sei perso?
            <br />
            <br />
            <Link to="/" className="underline">Torna alla home</Link>
          </p>
        </>
      )}
    </div>
  );
};

export const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  return isLoading ? (
    <MessagePage loadingPage/>
  ) : user ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

