import { useState } from "react";
import { Link } from "react-router-dom";

interface Business {
    id: number;
    name: string;
    industry: string;
    email: string;
    status: "Pending" | "Approved" | "Rejected";
}

const initialBusinesses: Business[] = [
    { id: 1, name: "TechNova Solutions", industry: "Technology", email: "contact@technova.com", status: "Pending" },
    { id: 2, name: "GreenLeaf Organics", industry: "Food & Beverage", email: "hello@greenleaf.com", status: "Pending" },
    { id: 3, name: "UrbanFit Studio", industry: "Fitness", email: "info@urbanfit.com", status: "Approved" },
    { id: 4, name: "Luxe Apparel Co.", industry: "Fashion", email: "biz@luxeapparel.com", status: "Pending" },
    { id: 5, name: "CloudStack Inc.", industry: "SaaS", email: "admin@cloudstack.io", status: "Rejected" },
];

export default function AdminBusinessListingPage() {
    const [businesses, setBusinesses] = useState<Business[]>(initialBusinesses);

    const updateStatus = (id: number, status: "Approved" | "Rejected") => {
        setBusinesses((prev) =>
            prev.map((b) => (b.id === id ? { ...b, status } : b))
        );
    };

    const statusColor = (status: string) => {
        if (status === "Approved") return "#076F92";
        if (status === "Rejected") return "#922007";
        return "#555";
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#000000",
                color: "#FFFFFF",
                fontFamily: "sans-serif",
                padding: "2rem",
            }}
        >
            <div style={{ maxWidth: "950px", margin: "0 auto" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "1.5rem",
                    }}
                >
                    <h1 style={{ fontSize: "1.5rem", margin: 0 }}>
                        Business Listing — Approval
                    </h1>
                    <Link
                        to="/home"
                        style={{ color: "#076F92", fontSize: "0.85rem" }}
                    >
                        ← Back to Home
                    </Link>
                </div>

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: "0.9rem",
                    }}
                >
                    <thead>
                        <tr
                            style={{
                                backgroundColor: "#076F92",
                                textAlign: "left",
                            }}
                        >
                            <th style={{ padding: "0.6rem" }}>#</th>
                            <th style={{ padding: "0.6rem" }}>Business Name</th>
                            <th style={{ padding: "0.6rem" }}>Industry</th>
                            <th style={{ padding: "0.6rem" }}>Email</th>
                            <th style={{ padding: "0.6rem" }}>Status</th>
                            <th style={{ padding: "0.6rem" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {businesses.map((biz) => (
                            <tr
                                key={biz.id}
                                style={{ borderBottom: "1px solid #222" }}
                            >
                                <td style={{ padding: "0.6rem" }}>{biz.id}</td>
                                <td style={{ padding: "0.6rem" }}>{biz.name}</td>
                                <td style={{ padding: "0.6rem" }}>{biz.industry}</td>
                                <td style={{ padding: "0.6rem" }}>{biz.email}</td>
                                <td style={{ padding: "0.6rem" }}>
                                    <span
                                        style={{
                                            padding: "0.2rem 0.5rem",
                                            borderRadius: "4px",
                                            fontSize: "0.75rem",
                                            backgroundColor: statusColor(biz.status),
                                            color: "#FFFFFF",
                                        }}
                                    >
                                        {biz.status}
                                    </span>
                                </td>
                                <td style={{ padding: "0.6rem" }}>
                                    {biz.status === "Pending" ? (
                                        <div style={{ display: "flex", gap: "0.5rem" }}>
                                            <button
                                                onClick={() => updateStatus(biz.id, "Approved")}
                                                style={{
                                                    padding: "0.3rem 0.7rem",
                                                    backgroundColor: "#076F92",
                                                    color: "#FFFFFF",
                                                    border: "none",
                                                    borderRadius: "4px",
                                                    cursor: "pointer",
                                                    fontSize: "0.75rem",
                                                }}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => updateStatus(biz.id, "Rejected")}
                                                style={{
                                                    padding: "0.3rem 0.7rem",
                                                    backgroundColor: "#922007",
                                                    color: "#FFFFFF",
                                                    border: "none",
                                                    borderRadius: "4px",
                                                    cursor: "pointer",
                                                    fontSize: "0.75rem",
                                                }}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    ) : (
                                        <span style={{ color: "#666", fontSize: "0.75rem" }}>—</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
