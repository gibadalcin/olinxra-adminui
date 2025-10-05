import { useMediaQuery } from "react-responsive";

export default function CustomButton({ children, onClick, style = {}, ...props }) {
    const isMobile = useMediaQuery({ maxWidth: 994 });

    // Detecta se o botão é redondo (borderRadius >= 50%) para remover padding
    const isRound = style?.borderRadius && (typeof style.borderRadius === "string" ? style.borderRadius.includes("%") || parseInt(style.borderRadius) >= 24 : style.borderRadius >= 24);
    return (
        <button
            onClick={onClick}
            style={{
                padding: isRound ? 0 : (isMobile ? "0.5rem 1rem" : "0.75rem 2rem"),
                borderRadius: isRound ? style.borderRadius : "6px",
                fontWeight: isRound ? undefined : "700",
                fontSize: isRound ? undefined : (isMobile ? "1em" : "1.1em"),
                textTransform: isRound ? undefined : "uppercase",
                cursor: "pointer",
                border: "none",
                letterSpacing: isRound ? undefined : "0.5px",
                textAlign: "center",
                minWidth: "260px",
                maxWidth: "420px",
                ...style
            }}
            {...props}
        >
            {children}
        </button>
    );
}