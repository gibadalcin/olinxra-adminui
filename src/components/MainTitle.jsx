export default function MainTitle({ children, isMobile }) {
    return (
        <h1
            style={{
                color: "#fff",
                fontSize: isMobile ? "1.6em" : "2.2em",
                marginBottom: isMobile ? "1rem" : "2rem",
                fontWeight: "400",
                textAlign: "center"
            }}
        >
            {children}
        </h1>
    );
}