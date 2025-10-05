import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import FadeIn from "../components/FadeIn";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Copyright from "../components/Copyright";
import MainTitle from "../components/MainTitle";
import CustomButton from "../components/CustomButton";
import UserInfo from "../components/UserInfo";
import DashboardActions from "../components/DashboardActions";

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
            overflow: "hidden", // Evita scroll durante transição
            position: "relative", // Para posicionar o Loader
        }}>
            {/* Loader aparece sobre o fundo, antes dos componentes */}
            {(!showContent || loading) && (
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 10,
                }}>
                    <Loader />
                </div>
            )}
            <FadeIn show={showContent}>
                {/* Conteúdo principal com fade-in */}
                <div style={{
                    width: "100vw",
                    minHeight: "100vh",
                    display: showContent ? "flex" : "none",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: isMobile ? "column" : "row",
                }}>
                    {/* Header só fica separado se não for mobile */}
                    {!isMobile && (
                        <div style={{
                            background: "rgba(255,255,255,0.10)",
                            padding: "2rem",
                            borderRadius: "16px",
                            width: '100%',
                            height: '100%',
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "column",
                            backdropFilter: "blur(18px)",
                            WebkitBackdropFilter: "blur(18px)",
                            textAlign: "center",
                        }}>
                            <Header />
                        </div>
                    )}
                    <div style={{
                        padding: isMobile ? "1rem" : "2rem",
                        borderRadius: "16px",
                        border: "1px solid rgba(255,255,255,0.18)",
                        width: isMobile ? '100%' : '60%',
                        height: '100%',
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                        backdropFilter: "blur(18px)",
                        WebkitBackdropFilter: "blur(18px)",
                        textAlign: "center",
                    }}>
                        {/* Header aparece junto dos componentes quando mobile */}
                        {isMobile && <Header />}
                        <MainTitle isMobile={isMobile}>Dashboard</MainTitle>
                        <UserInfo usuario={usuario} isMobile={isMobile} />
                        <DashboardActions
                            usuario={usuario}
                            isMobile={isMobile}
                            onImages={() => navigate("/images")}
                            onRegister={() => navigate("/register")}
                        />
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