import React from "react";
import CustomButton from "../components/CustomButton";
import { FiPlus, FiX } from "react-icons/fi";
import useIsMasterAdmin from "../hooks/useIsMasterAdmin";

export default function ImageCard({ img, isMobile, isAdmin, usuario, onDelete, onAssociate }) {
    // Trate o risco de undefined
    const ownerUid = img.owner_uid || "";
    // Se ownerUid vier vazio, isMaster será false
    const isMaster = Boolean(useIsMasterAdmin({ uid: ownerUid }));

    // Glass color: vermelho para master, verde para outros admins
    const glassColor = isMaster
        ? "rgba(255, 0, 0, 0.12)" // leve vermelho
        : "rgba(0, 180, 60, 0.12)"; // leve verde

    return (
        <div
            style={{
                background: glassColor,
                borderRadius: "14px",
                padding: isMobile ? "0.5rem" : "1rem",
                boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
                flex: "1 1 45%",
                maxWidth: "220px", // tamanho máximo menor do card
                minWidth: "140px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem",
                border: isMaster ? "2px solid rgba(255,0,0,0.18)" : "2px solid rgba(0,180,60,0.18)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                boxSizing: "border-box"
            }}
        >
            {img.url ? (
                <img
                    src={img.url}
                    alt={img.nome}
                    style={{
                        width: "100%",
                        aspectRatio: "16/9",
                        borderRadius: "10px",
                        objectFit: "contain",
                        background: "#eee",
                        display: "block",
                        boxShadow: "0 1px 8px rgba(0,0,0,0.10)",
                        maxWidth: "220px",
                        maxHeight: "123px",
                    }}
                />
            ) : (
                <div
                    style={{
                        width: "100%",
                        aspectRatio: "16/9",
                        borderRadius: "10px",
                        background: "#eee",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#888",
                        fontSize: "1.1em",
                        maxWidth: "220px",
                        maxHeight: "123px",
                        boxShadow: "0 1px 8px rgba(0,0,0,0.10)"
                    }}
                >
                    Imagem não disponível
                </div>
            )}
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
            {(isAdmin || (usuario && ownerUid === usuario.uid)) ? (
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    gap: 0,
                    maxWidth: "220px" // <-- garante que os botões não ultrapassem o card
                }}>
                    <CustomButton
                        onClick={() => onAssociate(img._id)}
                        style={{
                            background: "linear-gradient(90deg, #00e913ff 0%, #04aa20ff 100%)",
                            textShadow: "0 1px 4px rgba(0,0,0,0.15)",
                            width: "50%",
                            minWidth: 0,
                            maxWidth: "110px", // metade do card
                            height: "24px",
                            borderRadius: "8px 0 0 8px",
                            transition: "box-shadow 0.2s",
                            marginRight: "2px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxSizing: "border-box"
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
                            minWidth: 0,
                            maxWidth: "110px", // metade do card
                            height: "24px",
                            borderRadius: "0 8px 8px 0",
                            transition: "box-shadow 0.2s",
                            marginLeft: "2px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxSizing: "border-box"
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