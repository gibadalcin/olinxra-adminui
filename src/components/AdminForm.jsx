import React from "react";
import CustomButton from "../components/CustomButton";

export default function AdminForm({ email, senha, setEmail, setSenha, handleRegister, isMobile, erro, sucesso, navigate }) {
    return (
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
                onChange={e => setEmail(e.target.value)}
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
                onChange={e => setSenha(e.target.value)}
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
                onClick={() => { }}
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
            {erro && <p style={{ color: "red", marginTop: "1rem" }}>{erro}</p>}
            {sucesso && <p style={{ color: "green", marginTop: "1rem" }}>{sucesso}</p>}
        </form>
    );
}
