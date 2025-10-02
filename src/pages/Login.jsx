// CORREÇÃO CRÍTICA: Importar React, useState, e useEffect
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import CustomButton from "../components/CustomButton";
import Header from "../components/Header";
import Copyright from "../components/Copyright";
import MainTitle from "../components/MainTitle";
import FadeIn from "../components/FadeIn";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    // Estado introduzido para controlar o feedback visual
    const [isLoading, setIsLoading] = useState(false);
    const [erro, setErro] = useState("");
    const [showFade, setShowFade] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setShowFade(true); // animação de entrada ao montar
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setErro("");
        // 1. ATIVA O LOADING IMEDIATAMENTE.
        setIsLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, senha);

            // 2. SUCESSO: Navega. O componente será desmontado.
            navigate("/dashboard");

        } catch (err) {
            // 3. FALHA: Mostra o erro e desativa o loading.
            setErro("Usuário ou senha inválidos.");
            setIsLoading(false);
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
            <FadeIn show={showFade} duration="0.6s" distance="40px">
                <div
                    style={{
                        background: "rgba(255,255,255,0.10)",
                        padding: isMobile ? "1rem" : "2rem",
                        borderRadius: "16px",
                        boxShadow: "0 4px 32px rgba(0,0,0,0.25)",
                        width: isMobile ? "90vw" : "50%",
                        minWidth: "260px",
                        maxWidth: "400px",
                        border: "1px solid rgba(255,255,255,0.18)",
                        backdropFilter: "blur(18px)",
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
                            // NOVO: Desativa o botão enquanto carrega
                            disabled={isLoading}
                            style={{
                                padding: "0.75rem",
                                borderRadius: "6px",
                                background: "#FFD700",
                                // NOVO: Mudar a opacidade e cursor
                                opacity: isLoading ? 0.7 : 1,
                                boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
                                color: "#151515",
                                border: "none",
                                fontSize: isMobile ? "1em" : "1.1em",
                                cursor: isLoading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {/* NOVO: Mudar o texto do botão */}
                            {isLoading ? "Aguarde..." : "Entrar"}
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
            </FadeIn>
        </div>
    );
}