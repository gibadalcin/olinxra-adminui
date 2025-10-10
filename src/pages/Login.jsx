// CORREÇÃO CRÍTICA: Importar React, useState, e useEffect
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Header from "../components/Header";
import Copyright from "../components/Copyright";
import MainTitle from "../components/MainTitle";
import FadeIn from "../components/FadeIn";
import LoginForm from "../components/LoginForm";

export default function Login() {
    const MOBILE_BREAKPOINT = 768;
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [erro, setErro] = useState("");
    const [showFade, setShowFade] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_BREAKPOINT);
    const navigate = useNavigate();

    useEffect(() => {
        setShowFade(true);
        const handleResize = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
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
        <div>
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
                                background: "#ffffff",
                                width: "100%",
                                height: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex",
                                textAlign: "center",
                            }}
                        >
                            <Header />
                        </div>
                    )}
                    <div
                        style={{
                            background: "#012E57",
                            width: isMobile ? "100%" : "60%",
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "column",
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