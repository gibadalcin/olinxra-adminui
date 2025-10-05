import React from "react";
import AdminCard from "./AdminCard";
import useIsMasterAdmin from "../hooks/useIsMasterAdmin";

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
            {admins.map(admin => {
                const uid = admin.uid || "";
                const email = admin.email || "";
                const isMaster = useIsMasterAdmin({ uid, email });
                return (
                    <AdminCard
                        key={uid}
                        admin={admin}
                        isMaster={isMaster}
                        isMobile={isMobile}
                        onDelete={onDelete}
                    />
                );
            })}
        </div>
    );
}

// No Register.jsx
<AdminList
    admins={admins}
    isMobile={isMobile}
    onDelete={admin => { setModalOpen(true); setAdminToDelete(admin); }}
/>
