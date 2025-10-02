export default function Loader({ height = "60vh" }) {
    return (
        <div style={{
            width: "100vw",
            height,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <div style={{
                border: "6px solid #FFD700",
                borderTop: "6px solid #012E57",
                borderRadius: "50%",
                width: "48px",
                height: "48px",
                animation: "spin 1s linear infinite"
            }} />
            <style>
                {`@keyframes spin { 100% { transform: rotate(360deg); } }`}
            </style>
        </div>
    );
}