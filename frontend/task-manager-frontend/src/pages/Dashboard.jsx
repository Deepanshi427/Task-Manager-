


// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import ProjectTable from "../components/ProjectTable"; // Import the new component

// const Dashboard = () => {
//     const [projects, setProjects] = useState([]);
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(true);
//     const { user } = useContext(AuthContext);
//     const [isDrawerOpen, setIsDrawerOpen] = useState(false);

//     useEffect(() => {
//         const fetchProjects = async () => {
//             try {
//                 if (user?.token) {
//                     const res = await axios.get('http://localhost:5000/api/projects', {
//                         headers: { Authorization: `Bearer ${user.token}` }
//                     });
//                     setProjects(res.data);
//                 }
//             } catch (err) {
//                 console.error('Error fetching projects:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProjects();
//     }, [user]);

//     if (loading) return <div className="loading">Loading projects...</div>;

//     return (
//         <div className="dashboard-container">
//             <div className="table-header-row">
//                 <h2>Project Inventory</h2>
//             </div>
//             <button
//                 className="add-project-btn"
//                 onClick={() => navigate('/create-project')}
//             >
//                 <span className="plus-icon">+</span> New Project
//             </button>

//             {/* Pass the data into the component as a prop */}
//             <ProjectTable projects={projects} />

//         </div>
//     );
// };

// export default Dashboard;

import React, { useEffect, useState, useContext, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import ProjectTable from "../components/ProjectTable";
import AddProjectDrawer from "../components/AddProjectDrawer";
import EditProjectDrawer from "../components/EditProjectDrawer"; // Import Edit Drawer
import api from '../services/api';

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    // 2. Move fetch logic to a reusable function
    const fetchProjects = useCallback(async () => {
        try {
            if (user?.token) {
                const res = await api.get('/projects', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setProjects(res.data);
            }
        } catch (err) {
            console.error('Error fetching projects:', err);
        } finally {
            setLoading(false);
        }
    }, [user]);

    const handleEditProject = (projectId) => {
        setSelectedProjectId(projectId);
        setIsEditDrawerOpen(true);
    };

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    if (loading) return <div className="loading">Loading projects...</div>;

    return (
        <div className="dashboard-container">
            <div className="table-header-row">
                <h2>Project Inventory</h2>
                {/* 3. Change onClick to open the drawer */}
                <button
                    className="add-project-btn"
                    onClick={() => setIsDrawerOpen(true)}
                >
                    <span className="plus-icon">+</span> New Project
                </button>
            </div>

            {/* Pass state and refresh function to the table */}
            <ProjectTable
                projects={projects}
                setProjects={setProjects}
                token={user?.token}
                onEditProject={handleEditProject}
            />

            {/* 4. Add the Create Drawer Component here */}
            <AddProjectDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                token={user?.token}
                refreshProjects={fetchProjects}
            />

            {/* 5. Add the Edit Drawer Component */}
            <EditProjectDrawer
                isOpen={isEditDrawerOpen}
                onClose={() => setIsEditDrawerOpen(false)}
                token={user?.token}
                projectId={selectedProjectId}
                refreshProjects={fetchProjects}
            />
        </div>
    );
};

export default Dashboard;
