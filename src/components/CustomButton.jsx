import { useMediaQuery } from "react-responsive";

export default function CustomButton({ children, onClick, style = {}, ...props }) {
    const isMobile = useMediaQuery({ maxWidth: 994 });

    return (
        <button
            onClick={onClick}
            style={{
                padding: isMobile ? "0.5rem 1rem" : "0.75rem 2rem",
                borderRadius: "6px",
                fontWeight: "700",
                fontSize: isMobile ? "1em" : "1.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                border: "none",
                letterSpacing: "0.5px",
                textAlign: "center",
                ...style
            }}
            {...props}
        >
            {children}
        </button>
    );
}