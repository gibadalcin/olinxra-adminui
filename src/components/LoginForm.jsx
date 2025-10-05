import React from "react";
import CustomButton from "./CustomButton";

export default function LoginForm({ email, setEmail, senha, setSenha, isLoading, handleLogin, isMobile }) {
    return (
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
                disabled={isLoading}
                onClick={() => { }}
                style={{
                    padding: "0.75rem",
                    borderRadius: "6px",
                    background: "#FFD700",
                    opacity: isLoading ? 0.7 : 1,
                    boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
                    color: "#151515",
                    border: "none",
                    fontSize: isMobile ? "1em" : "1.1em",
                    cursor: isLoading ? 'not-allowed' : 'pointer'
                }}
            >
                {isLoading ? "Aguarde..." : "Entrar"}
            </CustomButton>
        </form>
    );
}
