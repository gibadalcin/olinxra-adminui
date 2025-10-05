import { useState, useEffect } from "react";
import MainTitle from "../components/MainTitle";
import Copyright from "../components/Copyright";
import { useNavigate } from "react-router-dom";
import FadeIn from "../components/FadeIn";
import Header from "../components/Header";
import { fetchAdmins, createAdmin, deleteAdmin } from "../api";
import { getAuth } from "firebase/auth";
import AdminForm from "../components/AdminForm";
import AdminList from "../components/AdminList";
import DeleteAdminModal from "../components/DeleteAdminModal";

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
    const [formDirection, setFormDirection] = useState(window.innerWidth < 1420 ? "column" : "row");
    const navigate = useNavigate();
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
                const adminsList = await fetchAdmins(idToken);
                setAdmins(adminsList);
            } catch (err) {
                setErro("Erro ao buscar administradores: " + (err?.message || err));
                console.error("Erro ao buscar admins:", err);
            }
        }
        if (token) {
            loadAdmins();
        }
    }, [token]);

    const handleRegister = async (e) => {
        e.preventDefault();
        setErro("");
        setSucesso("");
        if (!email || !senha) {
            setErro("Preencha todos os campos.");
            return;
        }
        if (!token) {
            setErro("Usuário não autenticado. Faça login novamente.");
            return;
        }
        try {
            const res = await createAdmin(email, senha, token);
            if (res && res.ok) {
                setSucesso("Administrador cadastrado com sucesso!");
                setEmail("");
                setSenha("");
                try {
                    const adminsList = await fetchAdmins(token);
                    setAdmins(adminsList);
                } catch (err) {
                    setErro("Administrador cadastrado, mas erro ao atualizar lista: " + (err?.message || err));
                }
            } else if (res) {
                const data = await res.json();
                if (
                    data.detail && (
                        data.detail.includes("EMAIL_EXISTS") ||
                        data.detail.includes("já existe um usuário com este e-mail") ||
                        data.detail.includes("already exists")
                    )
                ) {
                    setErro("Já existe um administrador cadastrado com este e-mail.");
                } else {
                    setErro(data.message || data.detail || "Erro ao cadastrar.");
                }
            } else {
                setErro("Erro inesperado na resposta da API.");
            }
        } catch (err) {
            setErro("Erro ao cadastrar: " + (err?.message || err));
        }
    };

    const handleDeleteAdmin = async () => {
        if (!adminToDelete) {
            setErro("Nenhum administrador selecionado para exclusão.");
            return;
        }
        if (!token) {
            setErro("Usuário não autenticado. Faça login novamente.");
            return;
        }
        setErro("");
        try {
            const res = await deleteAdmin(adminToDelete.uid, token);
            if (res && res.ok) {
                setAdmins(admins.filter(a => a.uid !== adminToDelete.uid));
                setModalOpen(false);
                setAdminToDelete(null);
            } else if (res) {
                const data = await res.json();
                setErro(data.message || "Erro ao excluir.");
            } else {
                setErro("Erro inesperado na resposta da API.");
            }
        } catch (err) {
            setErro("Erro ao excluir: " + (err?.message || err));
        }
    };

    useEffect(() => {
        setTimeout(() => setShowContent(true), 400);
    }, []);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 994);
            setFormDirection(window.innerWidth < 1420 ? "column" : "row");
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div style={{
            width: "100vw",
            minHeight: "100vh",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: "url('/login.svg')",
            backgroundPosition: "center bottom",
            backgroundRepeat: "no-repeat",
        }}>
            <FadeIn show={showContent}>
                <div style={{
                    width: "100vw",
                    minHeight: "100vh",
                    display: showContent ? "flex" : "none",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: isMobile ? "column" : "row",
                }}>
                    {/* Header lateral no desktop */}
                    {!isMobile && (
                        <div style={{
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            border: "1px solid rgba(255,255,255,0.18)",
                            backdropFilter: "blur(18px)",
                            WebkitBackdropFilter: "blur(18px)",
                            paddingInline: isMobile ? "1rem" : "4rem",
                            width: "20%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Header />
                        </div>
                    )}
                    {/* Conteúdo principal */}
                    <div style={{
                        padding: isMobile ? "1rem" : "2rem",
                        borderRadius: "16px",
                        width: '100%',
                        height: '100%',
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                        border: "1px solid rgba(255,255,255,0.18)",
                        backdropFilter: "blur(18px)",
                        WebkitBackdropFilter: "blur(18px)",
                        textAlign: "center",
                    }}>
                        {isMobile && <Header />}
                        <MainTitle isMobile={isMobile}>Cadastrar novo administrador</MainTitle>
                        <AdminForm
                            email={email}
                            senha={senha}
                            setEmail={setEmail}
                            setSenha={setSenha}
                            handleRegister={handleRegister}
                            isMobile={isMobile}
                            erro={erro}
                            sucesso={sucesso}
                            navigate={navigate}
                            formStyle={{
                                display: "flex",
                                flexDirection: formDirection,
                                flexWrap: "wrap",
                                gap: "1rem",
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        />
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
                                scrollbarColor: "#cccccc #0000"
                            }}
                            className="admin-list-scroll"
                        >
                            <h2 style={{ color: "#fff", fontSize: isMobile ? "1.2em" : "1.4em", marginBottom: "1rem" }}>Administradores</h2>
                            <AdminList
                                admins={admins}
                                isMobile={isMobile}
                                onDelete={admin => { setModalOpen(true); setAdminToDelete(admin); }}
                            />
                        </div>
                        <DeleteAdminModal
                            open={modalOpen}
                            adminToDelete={adminToDelete}
                            onConfirm={handleDeleteAdmin}
                            onCancel={() => { setModalOpen(false); setAdminToDelete(null); }}
                        />
                        <Copyright />
                    </div>
                </div>
            </FadeIn>
        </div>
    );
}