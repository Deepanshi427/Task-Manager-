import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { showSuccessToast, showErrorToast } from '../utils/toastNotification';

const EditProjectDrawer = ({ isOpen, onClose, token, projectId, refreshProjects }) => {
    const [formData, setFormData] = useState({ title: '', description: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Fetch project data when drawer opens or projectId changes
    useEffect(() => {
        if (isOpen && projectId) {
            const fetchProject = async () => {
                setLoading(true);
                try {
                    const config = {
                        headers: { Authorization: `Bearer ${token}` }
                    };
                    const res = await api.get(`/projects/${projectId}`, config);
                    setFormData({
                        title: res.data.title,
                        description: res.data.description
                    });
                    setErrors({});
                } catch (err) {
                    console.error("Error fetching project:", err);
                    showErrorToast("Error loading project data");
                } finally {
                    setLoading(false);
                }
            };
            fetchProject();
        }
    }, [isOpen, projectId, token]);

    const validate = () => {
        let tempErrors = {};
        if (!formData.title.trim()) {
            tempErrors.title = "Title is required";
        }
        if (formData.description.trim().length < 3) {
            tempErrors.description = "Description must be at least 3 characters";
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            console.log("Validation failed", errors);
            return;
        }

        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            await api.put(`/projects/${projectId}`, formData, config);

            // 1. Refresh the table
            if (refreshProjects) refreshProjects();

            // 2. Close the drawer
            onClose();

            showSuccessToast('Project updated successfully!');

        } catch (err) {
            console.error("Axios Error:", err.response?.data || err.message);
            showErrorToast(err.response?.data?.message || "Error updating project");
        }
    };

    return (
        <div className={`drawer-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
            <div className={`drawer-content ${isOpen ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="drawer-header">
                    <h2>Edit Project</h2>
                    <button type="button" className="close-x" onClick={onClose}>&times;</button>
                </div>

                {loading ? (
                    <div style={{ padding: '20px', textAlign: 'center' }}>Loading project data...</div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Project Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Enter title"
                                className={errors.title ? 'error-border' : ''}
                            />
                            {errors.title && <p className="err-msg">{errors.title}</p>}
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Min 3 characters..."
                                rows="5"
                                className={errors.description ? 'error-border' : ''}
                            />
                            {errors.description && <p className="err-msg">{errors.description}</p>}
                        </div>

                        <button type="submit" className="drawer-submit-btn">
                            Update Project
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EditProjectDrawer;
