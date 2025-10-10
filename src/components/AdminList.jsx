import React from "react";
import AdminCard from "./AdminCard";

export default function AdminList({ admins, isMobile, onDelete }) {
    if (!admins || admins.length === 0) {
        return <p style={{ color: "#fff" }}>Nenhum administrador cadastrado.</p>;
    }
    return (
        <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center"
        }}>
            {admins.map(admin => (
                <AdminCard
                    key={admin.uid}
                    admin={admin}
                    isMobile={isMobile}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}
