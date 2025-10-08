import React from "react";
import CustomButton from "../components/CustomButton";

export default function ImageUploadForm({ file, setFile, nome, setNome, isMobile, uploading, handleUpload, onDashboardClick }) {
    // Função para limpar os campos após envio
    const handleSubmit = async (e) => {
        await handleUpload(e);
        // Limpa os campos se o upload foi bem-sucedido
        setFile(null);
        setNome("");
        // Opcional: também pode limpar o input file visualmente
        if (e.target && e.target.reset) e.target.reset();
    };
    return (
        <form
            onSubmit={handleSubmit}
            style={{
                margin: "0 auto 2rem auto",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                alignItems: "center",
                justifyContent: "center",
                width: '80%',
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
                        // Remove a extensão
                        let nomeBase = nomeArquivo.replace(/\.[^/.]+$/, "");
                        // Extrai apenas o primeiro conjunto antes de hífen, underline ou ponto
                        let nomeSimples = nomeBase.split(/[-_.]/)[0];
                        setNome(nomeSimples);
                    }
                }}
                required
                style={{
                    background: "#fff",
                    borderRadius: "6px",
                    padding: "0.5rem",
                    border: "none",
                    width: isMobile ? "80vw" : "100%",
                    fontSize: "16px",
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
                    width: isMobile ? "80vw" : "100%",
                    border: "none",
                    fontSize: "16px"
                }}
            />
            <CustomButton
                type="submit"
                disabled={uploading || !file || !nome}
                style={{
                    background: "#4cd964",
                    color: "#151515",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.15)",
                    width: isMobile ? "80vw" : "100%",
                    borderStyle: "solid",
                    borderWidth: "1px",
                    borderColor: "rgba(255,255,255,0.90)",
                }}
            >
                {uploading ? "Enviando..." : "Enviar"}
            </CustomButton>
        </form>
    );
}
