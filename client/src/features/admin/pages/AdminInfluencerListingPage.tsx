import { Link } from "react-router-dom";

const dummyInfluencers = [
    { id: 1, name: "Aarav Sharma", platform: "Instagram", followers: "120K", status: "Active" },
    { id: 2, name: "Priya Nair", platform: "YouTube", followers: "450K", status: "Active" },
    { id: 3, name: "Rohit Menon", platform: "Instagram", followers: "80K", status: "Inactive" },
    { id: 4, name: "Sneha Iyer", platform: "TikTok", followers: "200K", status: "Active" },
    { id: 5, name: "Kiran Das", platform: "YouTube", followers: "95K", status: "Pending" },
];

export default function AdminInfluencerListingPage() {
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
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "1.5rem",
                    }}
                >
                    <h1 style={{ fontSize: "1.5rem", margin: 0 }}>
                        Influencer Listing
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
                            <th style={{ padding: "0.6rem" }}>Name</th>
                            <th style={{ padding: "0.6rem" }}>Platform</th>
                            <th style={{ padding: "0.6rem" }}>Followers</th>
                            <th style={{ padding: "0.6rem" }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dummyInfluencers.map((inf) => (
                            <tr
                                key={inf.id}
                                style={{
                                    borderBottom: "1px solid #222",
                                }}
                            >
                                <td style={{ padding: "0.6rem" }}>{inf.id}</td>
                                <td style={{ padding: "0.6rem" }}>{inf.name}</td>
                                <td style={{ padding: "0.6rem" }}>{inf.platform}</td>
                                <td style={{ padding: "0.6rem" }}>{inf.followers}</td>
                                <td style={{ padding: "0.6rem" }}>
                                    <span
                                        style={{
                                            padding: "0.2rem 0.5rem",
                                            borderRadius: "4px",
                                            fontSize: "0.75rem",
                                            backgroundColor:
                                                inf.status === "Active"
                                                    ? "#076F92"
                                                    : inf.status === "Pending"
                                                    ? "#555"
                                                    : "#333",
                                            color: "#FFFFFF",
                                        }}
                                    >
                                        {inf.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
