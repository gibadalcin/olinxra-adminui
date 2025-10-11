import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import Loader from "./Loader";

export default function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUsuario(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div><Loader /></div>;
  if (!usuario) return <Navigate to="/" />;
  return children;
}