import React from "react";
import CustomButton from "../components/CustomButton";

export default function ImageUploadForm({ file, setFile, nome, setNome, isMobile, uploading, handleUpload, onDashboardClick }) {
    return (
        <form
            onSubmit={handleUpload}
            style={{
                marginTop: 0,
                marginRight: "auto",
                marginBottom: isMobile ? "1rem" : "2rem",
                marginLeft: "auto",
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? ".8rem" : "1rem",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                maxWidth: "500px"
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
                    width: isMobile ? "80%" : "auto",
                    border: "none",
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
                    width: isMobile ? "80%" : "auto",
                    border: "none",
                    fontSize: "16px"
                }}
            />
            <CustomButton
                type="submit"
                disabled={uploading || !file || !nome}
                onClick={() => { }}
                style={{
                    background: "#FFD700",
                    color: "#151515",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.15)",
                    width: isMobile ? "80%" : "auto",
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
                    width: isMobile ? "80%" : "auto",
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
