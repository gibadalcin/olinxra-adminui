import { useState } from "react";
import ImageCard from "./ImageCard";
import Content from "./../../pages/Content";

export default function ImageList({ imagens, isMobile, isAdmin, usuario, onDelete, onAssociate }) {
    const [imagemSelecionada, setImagemSelecionada] = useState(null);

    if (!imagens || imagens.length === 0) {
        return <p style={{ color: "#fff", fontSize: isMobile ? "1em" : "1.2em" }}>Nenhuma imagem cadastrada.</p>;
    }

    return (
        <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: isMobile ? "center" : "flex-start",
            padding: isMobile ? "1rem" : "2rem",
            overflowY: "auto",
            boxSizing: "border-box",
            backgroundColor: "rgba(255,255,255,0.08)",
            width: "100%",
        }}>
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: isMobile ? "1rem" : "2rem",
                width: "100%",
                margin: "0 auto",
            }}>
                {imagens.map(img => (
                    <ImageCard
                        key={img._id}
                        img={img}
                        isMobile={isMobile}
                        isAdmin={isAdmin}
                        usuario={usuario}
                        onDelete={onDelete}
                        onAssociate={(imgId, ownerUid) => onAssociate(imgId, ownerUid)}
                        onClick={() => setImagemSelecionada(img)}
                    />
                ))}
                {imagemSelecionada && (
                    <Content
                        isMaster={usuario.isMaster}
                        ownerId={imagemSelecionada.owner_uid}
                        imageId={imagemSelecionada._id}
                    />
                )}
            </div>
        </div>
    );
}
