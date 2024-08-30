import React, { useState } from "react";

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [archive, setArchive] = useState([]);

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            addTask();
        }
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks([
                ...tasks,
                { text: newTask, completed: false, editing: false }
            ]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            const temp = updatedTasks[index];
            updatedTasks[index] = updatedTasks[index - 1];
            updatedTasks[index - 1] = temp;
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            const temp = updatedTasks[index];
            updatedTasks[index] = updatedTasks[index + 1];
            updatedTasks[index + 1] = temp;
            setTasks(updatedTasks);
        }
    }

    function toggleComplete(index, isArchive = false) {
        const taskList = isArchive ? archive : tasks;
        const setTaskList = isArchive ? setArchive : setTasks;

        const updatedTasks = taskList.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTaskList(updatedTasks);
    }

    function saveTaskText(index, newText) {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, text: newText } : task
        );
        setTasks(updatedTasks);
    }

    function toggleEditTask(index) {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, editing: !task.editing } : task
        );
        setTasks(updatedTasks);
    }

    function archiveTask(index) {
        const taskToArchive = tasks[index];
        setArchive([...archive, taskToArchive]);
        deleteTask(index);
    }

    function deleteArchiveTask(index) {
        const updatedArchive = archive.filter((_, i) => i !== index);
        setArchive(updatedArchive);
    }

    return (
        <div className="to-do-list">
            <h1>To-Do List</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter a task..."
                    value={newTask}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                />
                <button onClick={addTask}>Add Task</button>
            </div>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleComplete(index)}
                        />
                        {task.editing ? (
                            <input
                                type="text"
                                value={task.text}
                                onChange={(e) => saveTaskText(index, e.target.value)}
                                onBlur={() => toggleEditTask(index)}
                            />
                        ) : (
                            <span
                                style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                                onDoubleClick={() => toggleEditTask(index)}
                            >
                                {task.text}
                            </span>
                        )}
                        <div>
                            <button onClick={() => moveTaskUp(index)}>↑</button>
                            <button onClick={() => moveTaskDown(index)}>↓</button>
                            <button onClick={() => deleteTask(index)}>Delete</button>
                            <button onClick={() => toggleEditTask(index)}>Edit</button>
                            <button onClick={() => archiveTask(index)}>Archive</button>
                        </div>
                    </li>
                ))}
            </ul>

            {archive.length > 0 && (
                <div>
                    <h2>Archived Tasks</h2>
                    <ul>
                        {archive.map((task, index) => (
                            <li key={index}>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleComplete(index, true)}
                                />
                                <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                    {task.text}
                                </span>
                                <button onClick={() => deleteArchiveTask(index)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ToDoList;


