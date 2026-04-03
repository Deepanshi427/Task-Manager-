import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const EditProject = () => {
    const { id } = useParams(); // Grabs the ID from the URL
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [formData, setFormData] = useState({ title: '', description: '' });
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

    // 1. Fetch existing data on load
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/projects/${id}`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setFormData({
                    title: res.data.title,
                    description: res.data.description
                });
            } catch (err) {
                console.error("Error fetching project:", err);
                alert("Project not found");
                navigate('/dashboard');
            } finally {
                setLoading(false);
            }
        };
        if (user?.token) fetchProject();
    }, [id, user, navigate]);

    const validate = () => {
        let tempErrors = {};
        if (!formData.title.trim()) tempErrors.title = "Title is required";
        if (formData.description.trim().length < 3) tempErrors.description = "Min 3 characters required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            await axios.put(`http://localhost:5000/api/projects/${id}`, formData, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            alert("Project updated successfully!");
            navigate('/dashboard'); // Go back to table
        } catch (err) {
            console.error("Update error:", err);
        }
    };

    if (loading) return <div className="loading">Loading project data...</div>;

    return (
        <div className="dashboard-container">
            <div className="table-frame" style={{ maxWidth: '600px', margin: '40px auto' }}>
                <div className="drawer-header">
                    <h2>Edit Project</h2>
                    <button className="close-x" onClick={() => navigate('/dashboard')}>&times;</button>
                </div>

                <form onSubmit={handleUpdate}>
                    <div className="form-group">
                        <label>Project Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className={errors.title ? 'error-border' : ''}
                        />
                        {errors.title && <p className="err-msg">{errors.title}</p>}
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows="6"
                            className={errors.description ? 'error-border' : ''}
                        />
                        {errors.description && <p className="err-msg">{errors.description}</p>}
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="submit" className="drawer-submit-btn">Update Changes</button>
                        <button
                            type="button"
                            className="action-btn"
                            style={{ width: '100%', marginTop: '20px' }}
                            onClick={() => navigate('/dashboard')}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProject;