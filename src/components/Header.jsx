import React, { useState, useEffect, useMemo } from "react";

// 1. Mover constantes para fora do componente
// Usar PascalCase para constantes globais é uma convenção comum
const MOBILE_BREAKPOINT = 768;
const LOGO_SRC_DARK = "/adm-logo-dark.png"; // Caminho da logomarca
const LOGO_SRC_LIGHT = "/adm-logo-light.png"; // Caminho da logomarca para tema claro
const LOGO_ALT = "Olinxra Logo";

export default function Header() {

    // 2. Inicialização do estado de mobile usando a constante
    // A variável Width foi removida do escopo do componente
    const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_BREAKPOINT);

    // 3. Otimização do useEffect (Melhoria de Performance e Semântica)
    useEffect(() => {
        const handleResize = () => {
            // Apenas atualiza o estado se o breakpoint for cruzado para evitar re-renderizações desnecessárias
            const newIsMobile = window.innerWidth <= MOBILE_BREAKPOINT;
            if (newIsMobile !== isMobile) {
                setIsMobile(newIsMobile);
            }
        };

        window.addEventListener("resize", handleResize);

        // Cleanup function
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [isMobile]); // Dependência adicionada para que a função `handleResize` tenha o estado `isMobile` atualizado

    // 4. Utilizar useMemo para calcular estilos dependentes
    // Isso evita que o objeto de estilo seja recriado em cada renderização
    const headerStyle = useMemo(() => ({
        // Usar '100%' para mobile (preenche a largura) e largura natural no desktop
        width: isMobile ? "100%" : "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }), [isMobile]);

    const logoStyle = useMemo(() => ({
        // Altura variável
        height: isMobile ? "124px" : "160px",
        width: "100%",
        objectFit: "contain",
        // Adicionar uma transição sutil para suavizar a mudança de tamanho (UX)
        transition: 'height 0.3s ease-in-out',
    }), [isMobile]);

    return (
        // 5. Aplicação dos estilos memoizados
        <header style={headerStyle}>
            <img
                src={isMobile ? LOGO_SRC_LIGHT : LOGO_SRC_DARK}
                alt={LOGO_ALT}
                style={logoStyle}
            />
        </header>
    );
}