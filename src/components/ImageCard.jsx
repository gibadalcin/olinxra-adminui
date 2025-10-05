import React from "react";
import CustomButton from "../components/CustomButton";
import { FiPlus, FiX } from "react-icons/fi";

const USER_ADMIN_EMAIL = import.meta.env.VITE_USER_ADMIN_EMAIL;

export default function ImageCard({ img, isMobile, isAdmin, usuario, onDelete, onAssociate }) {
    // Glass color: vermelho para master, verde para outros admins
    const isMaster = img.owner_email === USER_ADMIN_EMAIL;
    const glassColor = isMaster
        ? "rgba(255, 0, 0, 0.12)" // leve vermelho
        : "rgba(0, 180, 60, 0.12)"; // leve verde
    return (
        <div key={img._id} style={{
            background: glassColor,
            borderRadius: "14px",
            padding: isMobile ? "0.5rem" : "1rem",
            boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
            minWidth: isMobile ? "180px" : "220px",
            maxWidth: "260px",
            width: isMobile ? "48vw" : "240px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            border: isMaster ? "2px solid rgba(255,0,0,0.18)" : "2px solid rgba(0,180,60,0.18)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
        }}>
            <img src={img.url} alt={img.nome} style={{
                width: "100%",
                minWidth: "187px", // 4:3 para minHeight 140px
                minHeight: "140px",
                aspectRatio: "4/3",
                borderRadius: "10px",
                maxHeight: "200px",
                objectFit: "contain",
                background: "#eee",
                display: "block",
                boxShadow: "0 1px 8px rgba(0,0,0,0.10)"
            }} />
            <p style={{
                color: "#fff",
                margin: "0.25rem 0 0.15rem 0",
                fontSize: isMobile ? "1em" : "1.08em",
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                wordBreak: "break-word",
                textAlign: "center",
                fontWeight: 500,
                letterSpacing: "0.2px"
            }} title={img.nome}>{img.nome}</p>
            {(isAdmin || (usuario && img.owner_uid === usuario.uid)) ? (
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%", gap: 0 }}>
                    <CustomButton
                        onClick={() => onAssociate(img._id)}
                        style={{
                            background: "linear-gradient(90deg, #00e913ff 0%, #04aa20ff 100%)",
                            textShadow: "0 1px 4px rgba(0,0,0,0.15)",
                            width: "50%",
                            height: "24px",
                            borderRadius: "08px 0 0 8px",
                            transition: "box-shadow 0.2s",
                            marginRight: "2px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        aria-label="Associar Conteúdo"
                    >
                        <FiPlus size={16} color="#fff" />
                    </CustomButton>
                    <CustomButton
                        onClick={() => onDelete(img._id)}
                        style={{
                            background: "linear-gradient(90deg, #d32f2f 0%, #ff6f60 100%)",
                            textShadow: "0 1px 4px rgba(0,0,0,0.15)",
                            width: "50%",
                            height: "24px",
                            borderRadius: "0 8px 8px 0",
                            transition: "box-shadow 0.2s",
                            marginLeft: "2px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        aria-label="Excluir"
                    >
                        <FiX size={16} color="#fff" />
                    </CustomButton>
                </div>
            ) : null}
        </div>
    );
}