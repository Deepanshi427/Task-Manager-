import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <h1 className="navbar-title">Task Manager</h1>
                {user && (
                    <button
                        onClick={handleLogout}
                        className="logout-btn"
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
