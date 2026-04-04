import React from 'react';
import api from '../services/api';
import { showSuccessToast, showErrorToast } from '../utils/toastNotification';

const TaskTable = ({ tasks, setTasks, token, projectId, onEditTask }) => {

    const handleDelete = async (taskId) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            try {
                await api.delete(`/tasks/${taskId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTasks(tasks.filter(t => t._id !== taskId));
                showSuccessToast('Task deleted successfully!');
            } catch (err) {
                console.error("Error deleting task:", err);
                showErrorToast('Error deleting task');
            }
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return '#28a745';
            case 'in-progress':
                return '#ffc107';
            case 'pending':
                return '#6c757d';
            default:
                return '#6c757d';
        }
    };

    return (
        <div className="table-frame">
            <div className="table-top-bar">
                <div className="show-entries">Show <strong>{tasks.length}</strong> entries</div>
                <div className="search-container">
                    <input type="text" className="table-search" placeholder="Search tasks..." />
                </div>
            </div>

            <div className="table-responsive">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Task Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            {/* <th>Due Date</th> */}
                            <th style={{ textAlign: 'right', paddingRight: '40px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length > 0 ? (
                            tasks.map((task) => (
                                <tr key={task._id}>
                                    <td>
                                        <div className="title-cell-content">
                                            <div className="project-avatar">{task.title.charAt(0)}</div>
                                            <span className="task-title">{task.title}</span>
                                        </div>
                                    </td>
                                    <td className="text-muted">{task.description || '—'}</td>
                                    <td>
                                        <span
                                            style={{
                                                backgroundColor: getStatusColor(task.status),
                                                color: 'white',
                                                padding: '6px 12px',
                                                borderRadius: '4px',
                                                fontSize: '12px',
                                                fontWeight: '500',
                                                textTransform: 'capitalize',
                                                display: 'inline-block'
                                            }}
                                        >
                                            {task.status}
                                        </span>
                                    </td>
                                    {/* <td>
                                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-GB') : '—'}
                                    </td> */}
                                    <td>
                                        <div className="actions-cell">
                                            {/* Edit Icon - Opens drawer */}
                                            <button
                                                title="Edit"
                                                onClick={() => onEditTask(task)}
                                                className="action-link edit"
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
                                            </button>

                                            {/* Delete Icon */}
                                            <button
                                                title="Delete"
                                                onClick={() => handleDelete(task._id)}
                                                className="action-link delete"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
                                    No tasks yet. Create your first task!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TaskTable;
