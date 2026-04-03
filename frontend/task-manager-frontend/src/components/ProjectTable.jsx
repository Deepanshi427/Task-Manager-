

// import React from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const ProjectTable = ({ projects, setProjects, token }) => {

//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure you want to delete this project?")) {
//             try {
//                 await axios.delete(`http://localhost:5000/api/projects/${id}`, {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });
//                 // Remove the deleted project from the local state
//                 setProjects(projects.filter(p => p._id !== id));
//             } catch (err) {
//                 console.error("Error deleting project:", err);
//             }
//         }
//     };

//     return (
//         <div className="table-frame">
//             <div className="table-top-bar">
//                 <div className="show-entries">Show <strong>10</strong> entries</div>
//                 <div className="search-container">
//                     <input type="text" className="table-search" placeholder="Search projects..." />
//                 </div>
//             </div>

//             <div className="table-responsive">
//                 <table className="custom-table">
//                     <thead>
//                         <tr>
//                             <th>Project Title</th>
//                             <th>Description</th>
//                             <th>Created Date</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {projects.map((project) => (
//                             <tr key={project._id}>
//                                 <td>
//                                     <div className="title-cell-content">
//                                         <div className="project-avatar">{project.title.charAt(0)}</div>
//                                         <Link to={`/project/${project._id}`} className="project-link">
//                                             {project.title}
//                                         </Link>
//                                     </div>
//                                 </td>
//                                 <td className="text-muted">{project.description}</td>
//                                 <td>{new Date(project.createdAt).toLocaleDateString('en-GB')}</td>
//                                 <td>
//                                     <div className="actions-cell">
//                                         {/* Edit Button - Moves to the edit route */}
//                                         <Link to={`/edit-project/${project._id}`} className="action-btn edit">
//                                             ✏️
//                                         </Link>
//                                         {/* Delete Button - Triggers delete route */}
//                                         <button
//                                             onClick={() => handleDelete(project._id)}
//                                             className="action-btn delete"
//                                         >
//                                             🗑️
//                                         </button>
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };
// export default ProjectTable;
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { showSuccessToast, showErrorToast } from '../utils/toastNotification';

const ProjectTable = ({ projects, setProjects, token, onEditProject }) => {

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            try {
                await axios.delete(`http://localhost:5000/api/projects/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProjects(projects.filter(p => p._id !== id));
                showSuccessToast('Project deleted successfully!');
            } catch (err) {
                console.error("Error deleting project:", err);
                showErrorToast('Error deleting project');
            }
        }
    };

    return (
        <div className="table-frame">
            <div className="table-top-bar">
                <div className="show-entries">Show <strong>10</strong> entries</div>
                <div className="search-container">
                    <input type="text" className="table-search" placeholder="Search projects..." />
                </div>
            </div>

            <div className="table-responsive">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Project Title</th>
                            <th>Description</th>
                            <th>Created Date</th>
                            <th style={{ textAlign: 'right', paddingRight: '40px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project._id}>
                                <td>
                                    <div className="title-cell-content">
                                        <div className="project-avatar">{project.title.charAt(0)}</div>
                                        <Link to={`/project/${project._id}`} className="project-link">
                                            {project.title}
                                        </Link>
                                    </div>
                                </td>
                                <td className="text-muted">{project.description}</td>
                                <td>{new Date(project.createdAt).toLocaleDateString('en-GB')}</td>
                                <td>
                                    <div className="actions-cell">
                                        {/* Edit Icon - Opens drawer instead of navigating */}
                                        <button
                                            title="Edit"
                                            onClick={() => onEditProject(project._id)}
                                            className="action-link edit"
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
                                        </button>

                                        {/* Delete Icon */}
                                        <button title="Delete" onClick={() => handleDelete(project._id)} className="action-link delete">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-svg"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProjectTable;