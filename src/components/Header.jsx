import React from "react";
import { useEffect, useState } from "react";


export default function Header() {
    const Width = 768;
    const [isMobile, setIsMobile] = useState(window.innerWidth <= Width);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= Width);
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
            marginBottom: isMobile ? "2rem" : "0",
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