import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
            <h1>Welcome to Influnite</h1>
            <p>Select a portal to proceed:</p>

            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
                    <h2>Admin</h2>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        <li><Link to="/admin/login">Login</Link></li>
                        <li><Link to="/admin/influencers">Influencers Listing</Link></li>
                        <li><Link to="/admin/business">Business Listing</Link></li>
                    </ul>
                </div>

                <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
                    <h2>Business</h2>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        <li><Link to="/business/register">Register</Link></li>
                        <li><Link to="/business/login">Login</Link></li>
                        <li><Link to="/business/forgot-password">Forgot Password</Link></li>
                        <li><Link to="/business/profile">Profile</Link></li>
                    </ul>
                </div>

                <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
                    <h2>Influencer</h2>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        <li><Link to="/influencer/register">Register</Link></li>
                        <li><Link to="/influencer/login">Login</Link></li>
                        <li><Link to="/influencer/forgot-password">Forgot Password</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
 