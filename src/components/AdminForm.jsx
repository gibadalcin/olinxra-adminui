import CustomButton from "../components/CustomButton";

export default function AdminForm({ email, senha, setEmail, setSenha, handleRegister, isMobile, isTablet, erro, sucesso, navigate, formStyle }) {
    return (
        <form
            onSubmit={handleRegister}
            style={{
                ...formStyle,
                width: isMobile ? "80vw" : "auto",
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: "center",
                justifyContent: "center",

                gap: ".5rem",
            }}
        >
            <div
                style={{
                    display: "flex",
                    gap: isMobile ? "1rem" : "1rem",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: isMobile ? "column" : "row",
                }}
            >
                <div style={{
                    display: isMobile ? 'contents' : 'flex',
                    width: isMobile ? '80vw' : 'auto',
                    flexDirection: isMobile < isTablet ? "column" : "row",
                    gap: '.5rem',
                }}>
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        style={{
                            background: "#fff",
                            borderRadius: "6px",
                            padding: "0.5rem",
                            border: "none",
                            fontSize: "16px",
                            width: isMobile ? "80vw" : "auto",
                            flexDirection: window.innerWidth < 768 ? "column" : "row",
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                        required
                        style={{
                            background: "#fff",
                            borderRadius: "6px",
                            padding: "0.5rem",
                            border: "none",
                            fontSize: "16px",
                            width: isMobile ? "80vw" : "auto",
                        }}
                    />
                </div>

                <div style={{
                    display: isMobile ? 'contents' : 'flex',
                    width: isMobile ? '80vw' : 'auto',
                    flexDirection: isMobile < isTablet ? "column" : "row",
                    gap: '.5rem',
                }}>
                    <CustomButton
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        style={{
                            background: "#012E57",
                            color: "#fff",
                            textShadow: "0 1px 4px rgba(0,0,0,0.15)",
                            width: isMobile ? "80vw" : "100%",
                            borderStyle: "solid",
                            borderWidth: "1px",
                            borderColor: "rgba(255,255,255,0.90)",
                        }}
                    >
                        Dashboard
                    </CustomButton>

                    <CustomButton
                        type="submit"
                        onClick={() => { }}
                        style={{
                            background: "#4cd964",
                            color: "#151515",
                            textShadow: "2px 2px 4px rgba(0,0,0,0.15)",
                            width: isMobile ? "80vw" : "100%",
                            border: '1px solid #ffffff',
                        }}>
                        Cadastrar
                    </CustomButton>
                </div>
            </div>
            {erro && <p style={{ color: "red", marginTop: "1rem" }}>{erro}</p>}
            {sucesso && <p style={{ color: "green", marginTop: "1rem" }}>{sucesso}</p>}
        </form>
    );
}
