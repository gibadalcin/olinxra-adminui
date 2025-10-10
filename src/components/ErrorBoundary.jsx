import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Você pode logar o erro em algum serviço externo aqui
        console.error("ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: 32, textAlign: "center", color: "#c00" }}>
                    <h2>Ocorreu um erro inesperado.</h2>
                    <pre>{this.state.error?.message}</pre>
                    <p>Tente recarregar a página ou entre em contato com o suporte.</p>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
