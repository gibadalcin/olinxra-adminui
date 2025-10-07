import React from "react";
import { useEffect, useState } from "react";


export default function Header() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 769);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 769);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <header style={{
            width: isMobile ? "100%" : "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "8rem",
            marginBottom: "2rem",
            marginInline: "4rem",
        }}>
            <img
                src="/adminui.svg" // Altere para o caminho da sua logomarca
                alt="Olinxra Logo"
                style={{
                    height: isMobile ? "130px" : "160px",
                    width: "auto",
                    objectFit: "contain",
                }}
            />
        </header>
    );
}