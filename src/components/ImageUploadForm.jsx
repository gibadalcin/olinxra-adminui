import React from "react";
import CustomButton from "../components/CustomButton";

export default function ImageUploadForm({ file, setFile, nome, setNome, isMobile, uploading, handleUpload, onDashboardClick }) {
    return (
        <form
            onSubmit={handleUpload}
            style={{
                margin: "0 auto 2rem auto",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                alignItems: "center",
                justifyContent: "center",
                width: isMobile ? "90%" : "90%",
                maxWidth: "600px",
            }}>
            <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={e => {
                    const arquivo = e.target.files[0];
                    setFile(arquivo);
                    if (arquivo) {
                        let nomeArquivo = arquivo.name;
                        let nomeBase;
                        if (nomeArquivo.includes("_")) {
                            nomeBase = nomeArquivo.split("_")[0];
                        } else if (nomeArquivo.includes("-")) {
                            nomeBase = nomeArquivo.split("-")[0];
                        } else {
                            nomeBase = nomeArquivo.split(".")[0];
                        }
                        setNome(nomeBase);
                    }
                }}
                required
                style={{
                    background: "#fff",
                    borderRadius: "6px",
                    padding: "0.5rem",
                    border: "none",
                    width: "100%",
                    fontSize: "16px"
                }}
            />
            <input
                type="text"
                placeholder="Nome da imagem"
                value={nome}
                onChange={e => setNome(e.target.value)}
                required
                style={{
                    background: "#fff",
                    borderRadius: "6px",
                    padding: "0.5rem",
                    width: "100%",
                    border: "none",
                    fontSize: "16px"
                }}
            />
            <CustomButton
                type="submit"
                disabled={uploading || !file || !nome}
                style={{
                    background: "#FFD700",
                    color: "#151515",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.15)",
                    width: "100%",
                    borderStyle: "solid",
                    borderWidth: "1px",
                    borderColor: "rgba(255,255,255,0.90)",
                }}
            >
                {uploading ? "Enviando..." : "Enviar"}
            </CustomButton>
            <CustomButton
                type="button"
                onClick={onDashboardClick}
                style={{
                    background: "#012E57",
                    color: "#fff",
                    textShadow: "0 1px 4px rgba(0,0,0,0.15)",
                    width: "100%",
                    borderStyle: "solid",
                    borderWidth: "1px",
                    borderColor: "rgba(255,255,255,0.90)",
                }}
            >
                Dashboard
            </CustomButton>
        </form>
    );
}
