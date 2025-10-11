import AdminCard from "./AdminCard";

const _masterUID = import.meta.env.VITE_USER_ADMIN_UID;

export default function AdminList({ admins, isMobile, onDelete }) {
    if (!admins || admins.length === 0) {
        return <p style={{ color: "#fff" }}>Nenhum administrador cadastrado.</p>;
    }
    return (
        <div style={{
            display: "flex",
            flexWrap: "wrap",
            width: '100%',
            minWidth: '100%',
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
                    isMaster={admin.uid === _masterUID}
                />
            ))}
        </div>
    );
}
