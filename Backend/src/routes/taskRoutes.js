const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const {
    createTask,
    getTasks,
    updateTask,
    deleteTask
} = require("../controllers/taskController");

router.use(protect);

router.post("/:projectId", createTask);
router.get("/:projectId", getTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;