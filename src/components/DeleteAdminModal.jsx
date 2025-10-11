import CustomButton from "./CustomButton";

const MOBILE_BREAKPOINT = 768;
const MAIN_BG_COLOR = "#012E57"; // azul escuro
const SECONDARY_BG_COLOR = "#d32f2f"; // vermelho
const LEFT_COL_BG_COLOR = "#ffffff"; // Branco

export default function DeleteAdminModal({ open, adminToDelete, onConfirm, onCancel, isMobile }) {
    if (!open) return null;
    return (
        <div style={{
            position: "fixed",
            background: "rgba(0,0,0,0.45)",
            zIndex: 9999,
            width: isMobile ? "100vw" : "70vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: LEFT_COL_BG_COLOR,
                borderRadius: "10px",
                padding: isMobile ? "1.2rem" : "2rem",
                margin: isMobile ? "1rem" : "0",
                boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
                minWidth: isMobile ? "auto" : "320px",
                maxWidth: isMobile ? "95vw" : "400px",
                textAlign: "center",
            }}>
                <h2 style={{ color: SECONDARY_BG_COLOR, marginBottom: "1rem" }}>Confirmar exclusão</h2>
                <p>Deseja realmente excluir o administrador <b>{adminToDelete?.email}</b>?</p>
                <div style={{
                    marginTop: "2rem",
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "center"
                }}>
                    <CustomButton
                        onClick={onConfirm}
                        style={{ background: SECONDARY_BG_COLOR, color: LEFT_COL_BG_COLOR }}
                    >
                        Excluir
                    </CustomButton>
                    <CustomButton
                        onClick={onCancel}
                        style={{ background: MAIN_BG_COLOR, color: LEFT_COL_BG_COLOR }}
                    >
                        Cancelar
                    </CustomButton>
                </div>
            </div>
        </div>
    );
}
