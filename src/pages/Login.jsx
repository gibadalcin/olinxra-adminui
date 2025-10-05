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
import LoginHeader from "../components/LoginHeader";
import LoginForm from "../components/LoginForm";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [erro, setErro] = useState("");
    const [showFade, setShowFade] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 994);
    const navigate = useNavigate();

    useEffect(() => {
        setShowFade(true);
        const handleResize = () => setIsMobile(window.innerWidth <= 994);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setErro("");
        setIsLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, senha);
            navigate("/dashboard");
        } catch (err) {
            setErro("Usuário ou senha inválidos.");
            setIsLoading(false);
        }
    };

    return (
        <div
            style={{
                width: "100vw",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: "url('/login.svg')",
                backgroundSize: "cover",
                backgroundPosition: "center top",
                backgroundRepeat: "no-repeat",
                overflow: "hidden",
                position: "relative",
            }}
        >
            <FadeIn show={showFade} duration="0.6s" distance="40px">
                <div
                    style={{
                        width: "100vw",
                        minHeight: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: isMobile ? "column" : "row",
                    }}
                >
                    {!isMobile && (
                        <div
                            style={{
                                background: "rgba(255,255,255,0.10)",
                                padding: "2rem",
                                borderRadius: "16px",
                                boxShadow: "0 4px 32px rgba(0,0,0,0.25)",
                                width: "100%",
                                height: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex",
                                flexDirection: "column",
                                border: "1px solid rgba(255,255,255,0.18)",
                                backdropFilter: "blur(18px)",
                                WebkitBackdropFilter: "blur(18px)",
                                textAlign: "center",
                            }}
                        >
                            <Header />
                        </div>
                    )}
                    <div
                        style={{
                            padding: isMobile ? "1rem" : "2rem",
                            borderRadius: "16px",
                            width: isMobile ? "100%" : "60%",
                            minWidth: "260px",
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "column",
                            border: "1px solid rgba(255,255,255,0.18)",
                            backdropFilter: "blur(18px)",
                            WebkitBackdropFilter: "blur(18px)",
                            textAlign: "center",
                        }}
                    >
                        {isMobile && <Header />}
                        <MainTitle isMobile={isMobile}>Login</MainTitle>
                        <LoginForm
                            email={email}
                            setEmail={setEmail}
                            senha={senha}
                            setSenha={setSenha}
                            isLoading={isLoading}
                            handleLogin={handleLogin}
                            isMobile={isMobile}
                        />
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
            </FadeIn>
        </div>
    );
}