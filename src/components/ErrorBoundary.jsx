import React from "react";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Você pode logar o erro em algum serviço externo aqui
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ width: '100vw' }}>
                    <div style={{ padding: "2rem", textAlign: "center", color: "#d32f2f", width: "100%", background: "#ffebee" }}>
                        <h2>Ocorreu um erro inesperado.</h2>
                        <p>Por favor, recarregue a página ou tente novamente mais tarde.</p>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}
