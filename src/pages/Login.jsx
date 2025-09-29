import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import CustomButton from "../components/CustomButton";
import Header from "../components/Header";
import Copyright from "../components/Copyright";
import MainTitle from "../components/MainTitle";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErro("");
        try {
            await signInWithEmailAndPassword(auth, email, senha);
            navigate("/dashboard");
        } catch (err) {
            setErro("Usuário ou senha inválidos.");
        }
    };

    const isMobile = window.innerWidth <= 994;

    return (
        <div
            style={{
                width: "100vw",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: "url('/login.svg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div
                style={{
                    background: "rgba(255,255,255,0.10)", // mais translúcido
                    padding: isMobile ? "1rem" : "2rem",
                    borderRadius: "16px",
                    boxShadow: "0 4px 32px rgba(0,0,0,0.25)",
                    width: isMobile ? "90vw" : "50%",
                    minWidth: "260px",
                    maxWidth: "400px",
                    border: "1px solid rgba(255,255,255,0.18)",
                    backdropFilter: "blur(18px)", // efeito glass mais suave
                    WebkitBackdropFilter: "blur(18px)",
                }}
            >
                <div style={{
                    flexDirection: "column",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                    marginBottom: "1.5rem",
                }}>
                    <Header />
                    <MainTitle isMobile={isMobile}>Login</MainTitle>
                </div>
                <form
                    onSubmit={handleLogin}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}
                >
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            padding: "0.75rem",
                            borderRadius: "6px",
                            border: "1px solid #555",
                            fontSize: isMobile ? "1em" : "1.1em",
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                        style={{
                            padding: "0.75rem",
                            borderRadius: "6px",
                            border: "1px solid #555",
                            fontSize: isMobile ? "1em" : "1.1em",
                        }}
                    />
                    <CustomButton
                        type="submit"
                        style={{
                            padding: "0.75rem",
                            borderRadius: "6px",
                            background: "#FFD700",
                            boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
                            color: "#151515",
                            border: "none",
                            fontSize: isMobile ? "1em" : "1.1em",
                        }}
                    >
                        Entrar
                    </CustomButton>
                </form>
                {erro && (
                    <p
                        style={{
                            color: "red",
                            textAlign: "center",
                            marginTop: "1rem",
                        }}
                    >
                        {erro}
                    </p>
                )}
                <Copyright />
            </div>
        </div>
    );
}