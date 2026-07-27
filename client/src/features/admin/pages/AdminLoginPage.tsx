import { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Login attempted with: ${email}`);
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "sans-serif",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "400px",
                    padding: "2rem",
                    border: "1px solid #076F92",
                    borderRadius: "8px",
                }}
            >
                <h1
                    style={{
                        color: "#FFFFFF",
                        fontSize: "1.5rem",
                        marginBottom: "0.5rem",
                        textAlign: "center",
                    }}
                >
                    Admin Login
                </h1>
                <p
                    style={{
                        color: "#076F92",
                        textAlign: "center",
                        marginBottom: "1.5rem",
                        fontSize: "0.875rem",
                    }}
                >
                    Influnite Admin Panel
                </p>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "1rem" }}>
                        <label
                            style={{
                                color: "#FFFFFF",
                                display: "block",
                                marginBottom: "0.25rem",
                                fontSize: "0.875rem",
                            }}
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@influnite.com"
                            style={{
                                width: "100%",
                                padding: "0.5rem",
                                backgroundColor: "#111",
                                border: "1px solid #076F92",
                                borderRadius: "4px",
                                color: "#FFFFFF",
                                outline: "none",
                                boxSizing: "border-box",
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: "1.5rem" }}>
                        <label
                            style={{
                                color: "#FFFFFF",
                                display: "block",
                                marginBottom: "0.25rem",
                                fontSize: "0.875rem",
                            }}
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            style={{
                                width: "100%",
                                padding: "0.5rem",
                                backgroundColor: "#111",
                                border: "1px solid #076F92",
                                borderRadius: "4px",
                                color: "#FFFFFF",
                                outline: "none",
                                boxSizing: "border-box",
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "0.6rem",
                            backgroundColor: "#076F92",
                            color: "#FFFFFF",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontWeight: "bold",
                        }}
                    >
                        Login
                    </button>
                </form>

                <div style={{ textAlign: "center", marginTop: "1rem" }}>
                    <Link
                        to="/home"
                        style={{ color: "#076F92", fontSize: "0.8rem" }}
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
