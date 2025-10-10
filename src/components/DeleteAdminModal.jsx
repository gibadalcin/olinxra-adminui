import CustomButton from "./CustomButton";

export default function DeleteAdminModal({ open, adminToDelete, onConfirm, onCancel }) {
    if (!open) return null;
    return (
        <div style={{
            position: "fixed",
            background: "rgba(0,0,0,0.45)",
            zIndex: 9999,
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div style={{
                background: "#fff",
                borderRadius: "10px",
                padding: "2rem",
                boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
                minWidth: "320px",
                textAlign: "center"
            }}>
                <h2 style={{ color: "#d32f2f", marginBottom: "1rem" }}>Confirmar exclusão</h2>
                <p>Deseja realmente excluir o administrador <b>{adminToDelete?.email}</b>?</p>
                <div style={{
                    marginTop: "2rem",
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "center"
                }}>
                    <CustomButton
                        onClick={onConfirm}
                        style={{ background: "#d32f2f", color: "#fff" }}
                    >
                        Excluir
                    </CustomButton>
                    <CustomButton
                        onClick={onCancel}
                        style={{ background: "#012E57", color: "#fff" }}
                    >
                        Cancelar
                    </CustomButton>
                </div>
            </div>
        </div>
    );
}
