import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { showSuccessToast, showErrorToast } from '../utils/toastNotification';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            showErrorToast("Passwords don't match");
            return;
        }
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
            login(res.data.token);
            showSuccessToast('Account created successfully!');
            navigate('/dashboard');
        } catch (err) {
            showErrorToast(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Create Account</h1>
                <p>Register to start managing your projects.</p>
                <form onSubmit={handleSubmit}>
                    <label>NAME</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" required />

                    <label>EMAIL</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required />

                    <label>PASSWORD</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" required />

                    <label>CONFIRM PASSWORD</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="********" required />

                    <button type="submit" className="login-btn">SIGN UP</button>
                </form>
                <p className="footer-text">Already have an account? <Link to="/login">Login here</Link></p>
            </div>
        </div>
    );
};

export default Register;
