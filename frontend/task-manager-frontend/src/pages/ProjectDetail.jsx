import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import TaskTable from '../components/TaskTable';
import AddTaskDrawer from '../components/AddTaskDrawer';
import EditTaskDrawer from '../components/EditTaskDrawer';

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    // Fetch project and tasks
    const fetchProjectAndTasks = useCallback(async () => {
        try {
            const projRes = await api.get(`/projects/${id}`);
            setProject(projRes.data);
            const tasksRes = await api.get(`/tasks/${id}`);
            setTasks(tasksRes.data);
        } catch (err) {
            console.error('Error fetching project:', err);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchProjectAndTasks();
    }, [fetchProjectAndTasks]);

    const handleEditTask = (task) => {
        setSelectedTask(task);
        setIsEditDrawerOpen(true);
    };

    if (loading) return <div className="loading">Loading project...</div>;
    if (!project) return <div className="loading">Project not found</div>;

    return (
        <div className="dashboard-container">
            <div className="table-header-row">
                <div>
                    <button onClick={() => navigate('/dashboard')} className="back-btn">← Back to Projects</button>
                    <h2 className="project-page-heading">{project.title}</h2>
                    <p className="text-muted project-page-description">{project.description}</p>
                </div>
                <button
                    className="add-project-btn"
                    onClick={() => setIsAddDrawerOpen(true)}
                >
                    <span className="plus-icon">+</span> New Task
                </button>
            </div>

            {/* Task Table */}
            <TaskTable
                tasks={tasks}
                setTasks={setTasks}
                token={user?.token}
                projectId={id}
                onEditTask={handleEditTask}
            />

            {/* Add Task Drawer */}
            <AddTaskDrawer
                isOpen={isAddDrawerOpen}
                onClose={() => setIsAddDrawerOpen(false)}
                token={user?.token}
                projectId={id}
                refreshTasks={fetchProjectAndTasks}
            />

            {/* Edit Task Drawer */}
            <EditTaskDrawer
                isOpen={isEditDrawerOpen}
                onClose={() => setIsEditDrawerOpen(false)}
                token={user?.token}
                task={selectedTask}
                refreshTasks={fetchProjectAndTasks}
            />
        </div>
    );
};

export default ProjectDetail;
