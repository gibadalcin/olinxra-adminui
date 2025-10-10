import React, { useEffect, useState } from 'react';
export default function Copyright() {
    const MOBILE_BREAKPOINT = 768;
    // Responsividade dinâmica
    const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_BREAKPOINT);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <footer
            style={{

                bottom: 0,
                textAlign: "center",
                color: "#fff",
                fontSize: isMobile ? "0.85em" : "0.95em",
                opacity: 0.7,
                padding: isMobile ? "30px 0" : "60px 0",
                zIndex: 9999,
                pointerEvents: 'none',
                background: 'transparent',
                userSelect: 'none'
            }}
            aria-label="Copyright olinx.digital"
        >
            © 2025 olinx.digital
        </footer>
    );
}