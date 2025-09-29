import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import FadeIn from "../components/FadeIn";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Copyright from "../components/Copyright";
import MainTitle from "../components/MainTitle";
import CustomButton from "../components/CustomButton";

const USER_ADMIN_EMAIL = import.meta.env.VITE_USER_ADMIN_EMAIL;

export default function Dashboard() {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 994);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 994);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUsuario(user);
            setLoading(false);
            setTimeout(() => setShowContent(true), 400); // Transição suave
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await auth.signOut();
        navigate("/");
    };

    return (
        <div style={{
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
        }}>
            {/* Loader aparece junto com fundo */}
            {(!showContent || loading) && <Loader />}
            <FadeIn show={showContent}>
                {/* Conteúdo principal com fade-in */}
                <div style={{
                    width: "100vw",
                    minHeight: "100vh",
                    display: showContent ? "flex" : "none",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden"
                }}>
                    <div style={{
                        background: "rgba(255,255,255,0.10)",
                        padding: isMobile ? "1rem" : "2rem",
                        borderRadius: "16px",
                        boxShadow: "0 4px 32px rgba(0,0,0,0.25)",
                        width: isMobile ? "90vw" : "50%",
                        minWidth: "260px",
                        maxWidth: "420px",
                        border: "1px solid rgba(255,255,255,0.18)",
                        backdropFilter: "blur(18px)",
                        WebkitBackdropFilter: "blur(18px)",
                        textAlign: "center",
                    }}>
                        <Header />
                        <MainTitle isMobile={isMobile}>Dashboard</MainTitle>
                        <p style={{ color: "#fff", fontSize: isMobile ? "1em" : "1.1em" }}>
                            <strong>E-mail:</strong> {usuario?.email}
                        </p>
                        {usuario?.photoURL && (
                            <img
                                src={usuario.photoURL}
                                alt="Avatar"
                                style={{
                                    borderRadius: "50%",
                                    width: isMobile ? "60px" : "80px",
                                    margin: "1rem auto",
                                }}
                            />
                        )}
                        <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <CustomButton
                                onClick={() => navigate("/images")}
                                style={{
                                    background: "#FFD700",
                                    color: "#151515",
                                    borderStyle: "solid",
                                    borderWidth: "1px",
                                    borderColor: "rgba(255,255,255,0.90)",
                                    textShadow: "0 1px 4px rgba(0,0,0,0.15)",
                                }}
                            >
                                Gerenciar Imagens
                            </CustomButton>
                            {usuario?.email === USER_ADMIN_EMAIL && (
                                <CustomButton
                                    onClick={() => navigate("/register")}
                                    style={{
                                        background: "#012E57",
                                        color: "#fff",
                                        borderStyle: "solid",
                                        borderWidth: "1px",
                                        borderColor: "rgba(255,255,255,0.90)",
                                        textShadow: "0 1px 2px rgba(0,0,0,0.50)",
                                    }}
                                >
                                    Cadastrar Administrador
                                </CustomButton>
                            )}
                        </div>
                        <CustomButton
                            onClick={handleLogout}
                            style={{
                                marginTop: "2rem",
                                background: "#d32f2f",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.20)",
                                color: "#fff",
                                borderStyle: "solid",
                                borderWidth: "1px",
                                borderColor: "rgba(255,255,255,0.18)",
                                textShadow: "0 1px 4px rgba(0,0,0,0.15)",
                            }}
                        >
                            Sair
                        </CustomButton>
                        <Copyright />
                    </div>
                </div>
            </FadeIn>
        </div>
    );
}