import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { showSuccessToast, showErrorToast } from '../utils/toastNotification';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { email, password });
            login(res.data.token);
            showSuccessToast('Login successful!');
            navigate('/dashboard');
        } catch (err) {
            showErrorToast('Invalid credentials');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Authenticate</h1>
                <p>Enter credentials to access your dashboard.</p>
                <form onSubmit={handleSubmit}>
                    <label>EMAIL</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="operative@system.com" required />

                    <label>PASSWORD</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" required />

                    <button type="submit" className="login-btn">LOG IN</button>
                </form>
                <div className="divider">OR</div>
                {/* <button className="google-btn">CONTINUE WITH GOOGLE</button> */}
                <p className="footer-text">No access clearance? <Link to="/register">Sign Up</Link></p>
            </div>
        </div>
    );
};

export default Login;
