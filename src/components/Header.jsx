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
            width: "100%",
            maxWidth: "600px",
            margin: "0 auto",
            padding: "1rem 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: isMobile ? "0" : "4rem",
        }}>
            <img
                src="/adminui.svg" // Altere para o caminho da sua logomarca
                alt="Olinxra Logo"
                style={{
                    height: isMobile ? "100px" : "160px",
                    width: "auto",
                    objectFit: "contain"
                }}
            />
        </header>
    );
}