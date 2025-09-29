export default function FadeIn({ show, children, duration = "0.6s" }) {
    return (
        <div style={{
            opacity: show ? 1 : 0,
            transition: `opacity ${duration}`,
            pointerEvents: show ? "auto" : "none"
        }}>
            {children}
        </div>
    );
}