export default function FadeIn({ show, children, duration = "0.6s", distance = "80px" }) {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            width: "100vw",
            opacity: show ? 1 : 0,
            transition: `opacity ${duration}, transform ${duration}`,
            pointerEvents: show ? "auto" : "none",
            visibility: show ? "visible" : "hidden", // mantém no DOM para animar
            transform: show ? "translateY(0)" : `translateY(${distance})`
        }}>
            {children}
        </div>
    );
}