import { useState, useEffect } from "react";
import MainTitle from "../components/MainTitle";
import CustomButton from "../components/CustomButton";
import Copyright from "../components/Copyright";
import { useNavigate } from "react-router-dom";
import FadeIn from "../components/FadeIn";
import Header from "../components/Header";
import { fetchAdmins, createAdmin, deleteAdmin } from "../api"; // ajuste o import
import { getAuth } from "firebase/auth";

export default function Register() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [admins, setAdmins] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [adminToDelete, setAdminToDelete] = useState(null);
    const [showContent, setShowContent] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 994);
    const navigate = useNavigate();

    // Exemplo de obtenção de token (ajuste conforme sua autenticação)
    const [token, setToken] = useState(null);

    useEffect(() => {
        async function fetchToken() {
            const usuario = getAuth().currentUser;
            if (usuario) {
                const idToken = await usuario.getIdToken();
                setToken(idToken);
            } else {
                setToken(null);
            }
        }
        fetchToken();
    }, []);

    useEffect(() => {
        async function loadAdmins() {
            try {
                const usuario = getAuth().currentUser;
                if (!usuario) {
                    setErro("Usuário não autenticado.");
                    return;
                }
                const idToken = await usuario.getIdToken();
                const adminsList = await fetchAdmins(idToken); // Correto!
                setAdmins(adminsList);
            } catch (err) {
                setErro("Erro ao buscar administradores: " + err.message);
                console.error("Erro ao buscar admins:", err);
            }
        }
        if (token) {
            loadAdmins();
        }
    }, [token]);

    // Cadastro usando API
    const handleRegister = async (e) => {
        e.preventDefault();
        setErro("");
        setSucesso("");
        try {
            const res = await createAdmin(email, senha, token);
            if (res.ok) {
                setSucesso("Administrador cadastrado com sucesso!");
                setEmail("");
                setSenha("");
                const adminsList = await fetchAdmins(token);
                setAdmins(adminsList);
            } else {
                const data = await res.json();
                // Ajuste para mensagem amigável
                if (
                    (data.detail && (
                        data.detail.includes("EMAIL_EXISTS") ||
                        data.detail.includes("já existe um usuário com este e-mail") ||
                        data.detail.includes("already exists")
                    ))
                ) {
                    setErro("Já existe um administrador cadastrado com este e-mail.");
                } else {
                    setErro(data.message || data.detail || "Erro ao cadastrar.");
                }
            }
        } catch (err) {
            setErro("Erro ao cadastrar: " + err.message);
        }
    };

    // Exclusão usando API
    const handleDeleteAdmin = async () => {
        if (!adminToDelete) return;
        setErro("");
        try {
            const res = await deleteAdmin(adminToDelete.uid, token);
            if (res.ok) {
                setAdmins(admins.filter(a => a.uid !== adminToDelete.uid));
                setModalOpen(false);
                setAdminToDelete(null);
            } else {
                const data = await res.json();
                setErro(data.message || "Erro ao excluir.");
            }
        } catch (err) {
            setErro("Erro ao excluir: " + err.message);
        }
    };

    useEffect(() => {
        setTimeout(() => setShowContent(true), 400);
    }, []);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 994);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Defina o email do master (ajuste conforme sua configuração/env)
    const masterEmail = import.meta.env.VITE_USER_ADMIN_EMAIL;

    return (
        <div style={{
            width: "100vw",
            minHeight: "100vh",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: "url('/login.svg')",
            backgroundPosition: "left top",
            backgroundRepeat: "no-repeat",
        }}>
            <FadeIn show={showContent}>
                <div style={{
                    width: "100vw",
                    minHeight: "100vh",
                    display: showContent ? "flex" : "none",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <div style={{
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        borderRadius: "8px",
                        padding: isMobile ? "1rem" : "2rem",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        border: "1px solid rgba(255,255,255,0.18)",
                        backdropFilter: "blur(18px)",
                        WebkitBackdropFilter: "blur(18px)",
                        width: "80%",
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Header />
                        <MainTitle isMobile={isMobile}>Cadastrar novo administrador</MainTitle>
                        <form
                            onSubmit={handleRegister}
                            style={{
                                marginBottom: isMobile ? "1rem" : "2rem",
                                display: "flex",
                                flexDirection: isMobile ? "column" : "row",
                                gap: isMobile ? ".8rem" : "1rem",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%",
                                maxWidth: "500px",
                                margin: "0 auto"
                            }}
                        >
                            <input
                                type="email"
                                placeholder="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{
                                    background: "#fff",
                                    borderRadius: "6px",
                                    padding: "0.5rem",
                                    width: isMobile ? "80%" : "auto",
                                    border: "none",
                                    fontSize: "16px"
                                }}
                            />
                            <input
                                type="password"
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                                style={{
                                    background: "#fff",
                                    borderRadius: "6px",
                                    padding: "0.5rem",
                                    width: isMobile ? "80%" : "auto",
                                    border: "none",
                                    fontSize: "16px"
                                }}
                            />
                            <CustomButton
                                type="submit"
                                style={{
                                    background: "#FFD700",
                                    color: "#151515",
                                    textShadow: "2px 2px 4px rgba(0,0,0,0.15)",
                                    width: isMobile ? "80%" : "auto",
                                    borderStyle: "solid",
                                    borderWidth: "1px",
                                    borderColor: "rgba(255,255,255,0.90)",
                                }}>
                                Cadastrar
                            </CustomButton>
                            <CustomButton
                                type="button"
                                onClick={() => navigate("/dashboard")}
                                style={{
                                    background: "#012E57",
                                    color: "#fff",
                                    textShadow: "0 1px 4px rgba(0,0,0,0.15)",
                                    width: isMobile ? "80%" : "auto",
                                    borderStyle: "solid",
                                    borderWidth: "1px",
                                    borderColor: "rgba(255,255,255,0.90)",
                                }}
                            >
                                Dashboard
                            </CustomButton>
                        </form>
                        {erro && <p style={{ color: "red", marginTop: "1rem" }}>{erro}</p>}
                        {sucesso && <p style={{ color: "green", marginTop: "1rem" }}>{sucesso}</p>}

                        {/* Lista de administradores */}
                        <div
                            style={{
                                background: "rgba(255,255,255,0.24)",
                                padding: isMobile ? "0.5rem" : "1.5rem",
                                borderRadius: "8px",
                                boxShadow: "0 4px 32px rgba(0,0,0,0.25)",
                                width: "94%",
                                border: "1px solid rgba(255,255,255,0.18)",
                                backdropFilter: "blur(18px)",
                                WebkitBackdropFilter: "blur(18px)",
                                textAlign: "center",
                                margin: isMobile ? "16px auto" : "24px auto",
                                maxHeight: isMobile ? "260px" : "340px",
                                overflowY: "auto",
                                scrollbarWidth: "thin",
                                scrollbarColor: "#cccccc #0000",
                            }}
                            className="admin-list-scroll"
                        >
                            <h2 style={{ color: "#fff", fontSize: isMobile ? "1.2em" : "1.4em", marginBottom: "1rem" }}>Administradores</h2>
                            {admins.length === 0 ? (
                                <p style={{ color: "#fff" }}>Nenhum administrador cadastrado.</p>
                            ) : (
                                <div style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "1rem",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    {admins.map(admin => (
                                        <div
                                            key={admin.uid}
                                            style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                background: "rgba(255,255,255,0.18)",
                                                borderRadius: "12px",
                                                padding: isMobile ? "0.3rem 0.8rem" : "0.4rem 1.2rem",
                                                margin: "0.2rem",
                                                boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                                                fontSize: isMobile ? "1em" : "1.1em",
                                                wordBreak: "break-word",
                                                border: admin.email === masterEmail ? "1px solid #d32f2f" : "1px solid #2ecc40",
                                                maxWidth: "320px"
                                            }}
                                        >
                                            <span style={{
                                                color: "#012E57",
                                                fontWeight: 500,
                                                marginRight: "0.7rem",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                maxWidth: "180px"
                                            }}>
                                                {admin.email}
                                            </span>
                                            <button
                                                onClick={() => { setModalOpen(true); setAdminToDelete(admin); }}
                                                style={{
                                                    background: "none",
                                                    border: "none",
                                                    color: "#d32f2f",
                                                    fontSize: "1.5em",
                                                    cursor: "pointer",
                                                    padding: 0,
                                                    marginLeft: "0.2rem",
                                                    display: "flex",
                                                    alignItems: "center"
                                                }}
                                                title="Excluir administrador"
                                            >
                                                <b>&times;</b>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Modal de confirmação de exclusão */}
                        {modalOpen && (
                            <div style={{
                                position: "fixed",
                                // top: 0, width: "100vw", height: "100vh",
                                background: "rgba(0,0,0,0.45)",
                                //display: "flex", alignItems: "center", justifyContent: "center",
                                zIndex: 9999
                            }}>
                                <div style={{
                                    background: "#fff",
                                    borderRadius: "10px",
                                    padding: "2rem",
                                    boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
                                    minWidth: "320px",
                                    textAlign: "center"
                                }}>
                                    <h2 style={{ color: "#d32f2f", marginBottom: "1rem" }}>Confirmar exclusão</h2>
                                    <p>Deseja realmente excluir o administrador <b>{adminToDelete?.email}</b>?</p>
                                    <div style={{
                                        marginTop: "2rem",
                                        display: "flex",
                                        gap: "1rem",
                                        justifyContent: "center"
                                    }}>
                                        <CustomButton
                                            onClick={handleDeleteAdmin}
                                            style={{ background: "#d32f2f", color: "#fff" }}
                                        >
                                            Excluir
                                        </CustomButton>
                                        <CustomButton
                                            onClick={() => { setModalOpen(false); setAdminToDelete(null); }}
                                            style={{
                                                background: "#012E57",
                                                color: "#fff",
                                            }}
                                        >
                                            Cancelar
                                        </CustomButton>
                                    </div>
                                </div>
                            </div>
                        )}

                        <Copyright />
                    </div>
                </div>
            </FadeIn>
        </div>
    );
}