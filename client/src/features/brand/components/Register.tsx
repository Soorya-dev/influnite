import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "influencer",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage(`Success: ${data.name} registered as ${data.role}`);
            } else {
                setMessage(`Error: ${data.message}`);
            }
        } catch (error) {
            setMessage("Error: Failed to connect to server");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px" }}>
                <input name="name" placeholder="Name" onChange={handleChange} required />
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
                <select name="role" onChange={handleChange} value={formData.role}>
                    <option value="influencer">Influencer</option>
                    <option value="business">Business</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
            <Link to="/login">Go to Login</Link>
        </div>
    );
}
