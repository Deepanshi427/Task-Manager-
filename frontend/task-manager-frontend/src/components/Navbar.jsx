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
            <div className="navbar-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <h1 className="navbar-title">Task Manager</h1>
                {user && (
                    <button
                        onClick={handleLogout}
                        className="logout-btn"
                        style={{ backgroundColor: '#7c3aed', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: '500', position: 'absolute', right: '20px' }}
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
