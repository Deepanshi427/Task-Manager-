

import React, { useState } from 'react';
import api from '../services/api';
import { showSuccessToast, showErrorToast } from '../utils/toastNotification';

const AddProjectDrawer = ({ isOpen, onClose, token, refreshProjects }) => {
    const [formData, setFormData] = useState({ title: '', description: '' });
    const [errors, setErrors] = useState({});

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
        e.preventDefault(); // This stops the page from reloading
        console.log("Submit button clicked!"); // Check your console for this!

        if (!validate()) {
            console.log("Validation failed", errors);
            return;
        }

        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const res = await api.post('/projects', formData, config);

            // 1. Refresh the table
            if (refreshProjects) refreshProjects();

            // 2. Reset the form
            setFormData({ title: '', description: '' });

            // 3. Close the drawer
            onClose();

            showSuccessToast('Project created successfully!');

        } catch (err) {
            console.error("Axios Error:", err.response?.data || err.message);
            showErrorToast(err.response?.data?.message || "Error creating project");
        }
    };

    return (
        <div className={`drawer-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
            <div className={`drawer-content ${isOpen ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="drawer-header">
                    <h2>New Project</h2>
                    <button type="button" className="close-x" onClick={onClose}>&times;</button>
                </div>

                {/* FORM START */}
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

                    {/* SUBMIT BUTTON MUST BE TYPE="SUBMIT" */}
                    <button type="submit" className="drawer-submit-btn">
                        Save Project
                    </button>
                </form>
                {/* FORM END */}
            </div>
        </div>
    );
};

export default AddProjectDrawer;
