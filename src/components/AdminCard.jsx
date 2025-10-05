import React from "react";

export default function AdminCard({ admin, masterEmail, isMobile, onDelete }) {
    return (
        <div
            key={admin.uid}
            style={{
                display: "inline-flex",
                alignItems: "center",
                background: "rgba(255,255,255,0.18)",
                borderRadius: "12px",
                padding: isMobile ? "0.3rem 0.8rem" : "0.4rem 1.2rem",
                margin: "0.2rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                fontSize: isMobile ? "1em" : "1.1em",
                wordBreak: "break-word",
                border: admin.email === masterEmail ? "1px solid #d32f2f" : "1px solid #2ecc40",
                maxWidth: "320px"
            }}
        >
            <span style={{
                color: "#012E57",
                fontWeight: 500,
                marginRight: "0.7rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "180px"
            }}>
                {admin.email}
            </span>
            <button
                onClick={() => onDelete(admin)}
                style={{
                    background: "none",
                    border: "none",
                    color: "#d32f2f",
                    fontSize: "1.5em",
                    cursor: "pointer",
                    padding: 0,
                    marginLeft: "0.2rem",
                    display: "flex",
                    alignItems: "center"
                }}
                title="Excluir administrador"
            >
                <b>&times;</b>
            </button>
        </div>
    );
}
