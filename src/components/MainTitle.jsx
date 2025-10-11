export default function MainTitle({ children, isMobile, isTablet }) {
    return (
        <h1
            style={{
                color: "#fff",
                fontSize: isMobile ? "1.6em" : "2.2em",
                marginBottom: "2rem",
                fontWeight: "400",
                textAlign: "center",
                marginTop: isMobile ? "1rem" : "0",
                width: isTablet ? '80vw' : '70vw',
            }}
        >
            {children}
        </h1>
    );
}