import React, { useState } from 'react';
import api from '../services/api';
import { showSuccessToast, showErrorToast } from '../utils/toastNotification';

const AddTaskDrawer = ({ isOpen, onClose, token, projectId, refreshTasks }) => {
    const [formData, setFormData] = useState({ title: '', description: '', dueDate: '', status: 'pending' });
    const [errors, setErrors] = useState({});

    const validate = () => {
        let tempErrors = {};
        if (!formData.title.trim()) {
            tempErrors.title = "Task title is required";
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const payload = {
                title: formData.title,
                description: formData.description,
                dueDate: formData.dueDate || null,
                status: formData.status
            };

            const res = await api.post(`/tasks/${projectId}`, payload, config);

            // 1. Refresh the table
            if (refreshTasks) refreshTasks();

            // 2. Reset the form
            setFormData({ title: '', description: '', dueDate: '', status: 'pending' });

            // 3. Close the drawer
            onClose();

            showSuccessToast('Task created successfully!');

        } catch (err) {
            console.error("Axios Error:", err.response?.data || err.message);
            showErrorToast(err.response?.data?.message || "Error creating task");
        }
    };

    return (
        <div className={`drawer-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
            <div className={`drawer-content ${isOpen ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="drawer-header">
                    <h2>New Task</h2>
                    <button type="button" className="close-x" onClick={onClose}>&times;</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Task Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Enter task title"
                            className={errors.title ? 'error-border' : ''}
                        />
                        {errors.title && <p className="err-msg">{errors.title}</p>}
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Enter task description (optional)"
                            rows="4"
                            className={errors.description ? 'error-border' : ''}
                        />
                        {errors.description && <p className="err-msg">{errors.description}</p>}
                    </div>

                    {/* <div className="form-group">
                        <label>Due Date</label>
                        <input
                            type="date"
                            value={formData.dueDate}
                            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                        />
                    </div> */}

                    <div className="form-group">
                        <label>Status</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '4px',
                                border: '1px solid #ddd',
                                fontSize: '14px',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <button type="submit" className="drawer-submit-btn">
                        Create Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTaskDrawer;
