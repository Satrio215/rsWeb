import React, { Component } from "react";

// Komponen ErrorBoundary untuk menangani error
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorInfo: null };
    }

    // Menangkap error yang terjadi pada komponen anak
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    // Menangkap informasi error tambahan (stack trace)
    componentDidCatch(error, info) {
        this.setState({ errorInfo: info });
        // Anda bisa mengirim informasi error ke log server di sini jika perlu
    }

    render() {
        if (this.state.hasError) {
            // Jika ada error, tampilkan fallback UI
            return (
                <div
                    style={{
                        padding: "20px",
                        border: "1px solid red",
                        backgroundColor: "#f8d7da",
                    }}
                >
                    <h2>Terjadi kesalahan!</h2>
                    <details style={{ whiteSpace: "pre-wrap" }}>
                        {this.state.errorInfo &&
                            this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }

        // Jika tidak ada error, tampilkan komponen anak
        return this.props.children;
    }
}

export default ErrorBoundary;
