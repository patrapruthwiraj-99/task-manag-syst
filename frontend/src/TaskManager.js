import React, { useEffect, useState } from 'react';
import { FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { CreateTask, DeleteTaskById, GetAllTasks, UpdateTaskById } from './api';
import { notify } from './utils';

function TaskManager() {
    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([]);
    const [copyTasks, setCopyTasks] = useState([]);
    const [updateTask, setUpdateTask] = useState(null);

    const handleTask = () => {
        if (updateTask && input) {
            const obj = {
                taskName: input,
                isDone: updateTask.isDone,
                _id: updateTask._id
            };
            handleUpdateItem(obj);
        } else if (!updateTask && input) {
            handleAddTask();
        }
        setInput('');
    };

    useEffect(() => {
        if (updateTask) {
            setInput(updateTask.taskName);
        }
    }, [updateTask]);

    // ✅ ADD TASK
    const handleAddTask = async () => {
        const obj = {
            taskName: input,
            isDone: false
        };

        try {
            const res = await CreateTask(obj);

            if (res.success) {
                notify(res.message, 'success');
            } else {
                notify(res.message, 'error');
            }

            fetchAllTasks();
        } catch (err) {
            console.error(err);
            notify('Failed to create task', 'error');
        }
    };

    // ✅ FETCH TASKS (FIXED)
    const fetchAllTasks = async () => {
        try {
            const res = await GetAllTasks();

            console.log("API RESPONSE:", res.data); // 👈 debug

            let taskArray = [];

            // ✅ handle different backend formats
            if (Array.isArray(res.data)) {
                taskArray = res.data;
            } else if (Array.isArray(res.data.data)) {
                taskArray = res.data.data;
            } else if (Array.isArray(res.data.tasks)) {
                taskArray = res.data.tasks;
            }

            setTasks(taskArray);
            setCopyTasks(taskArray);

        } catch (err) {
            console.error(err);
            notify('Failed to fetch tasks', 'error');
        }
    };

    useEffect(() => {
        fetchAllTasks();
    }, []);

    // ✅ DELETE
    const handleDeleteTask = async (id) => {
        try {
            const res = await DeleteTaskById(id);

            if (res.success) {
                notify(res.message, 'success');
            } else {
                notify(res.message, 'error');
            }

            fetchAllTasks();
        } catch (err) {
            console.error(err);
            notify('Failed to delete task', 'error');
        }
    };

    // ✅ CHECK / UNCHECK
    const handleCheckAndUncheck = async (item) => {
        const obj = {
            taskName: item.taskName,
            isDone: !item.isDone
        };

        try {
            const res = await UpdateTaskById(item._id, obj);

            if (res.success) {
                notify(res.message, 'success');
            } else {
                notify(res.message, 'error');
            }

            fetchAllTasks();
        } catch (err) {
            console.error(err);
            notify('Failed to update task', 'error');
        }
    };

    // ✅ UPDATE
    const handleUpdateItem = async (item) => {
        const obj = {
            taskName: item.taskName,
            isDone: item.isDone
        };

        try {
            const res = await UpdateTaskById(item._id, obj);

            if (res.success) {
                notify(res.message, 'success');
            } else {
                notify(res.message, 'error');
            }

            fetchAllTasks();
        } catch (err) {
            console.error(err);
            notify('Failed to update task', 'error');
        }
    };

    // ✅ SEARCH
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        const results = copyTasks.filter((item) =>
            item.taskName.toLowerCase().includes(term)
        );
        setTasks(results);
    };

    return (
        <div className='d-flex flex-column align-items-center w-50 m-auto mt-5'>
            <h1 className='mb-4'>Task Manager App</h1>

            {/* Input */}
            <div className='d-flex justify-content-between align-items-center mb-4 w-100'>
                <div className='input-group flex-grow-1 me-2'>
                    <input
                        type='text'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className='form-control me-1'
                        placeholder='Add a new Task'
                    />
                    <button
                        onClick={handleTask}
                        className='btn btn-success btn-sm me-2'
                    >
                        <FaPlus className='m-2' />
                    </button>
                </div>

                <div className='input-group flex-grow-1'>
                    <span className='input-group-text'>
                        <FaSearch />
                    </span>
                    <input
                        onChange={handleSearch}
                        className='form-control'
                        type='text'
                        placeholder='Search tasks'
                    />
                </div>
            </div>

            {/* TASK LIST */}
            <div className='d-flex flex-column w-100'>
                {
                    Array.isArray(tasks) && tasks.map((item) => (
                        <div
                            key={item._id}
                            className='m-2 p-2 border bg-light w-100 rounded-3 d-flex justify-content-between align-items-center'
                        >
                            <span className={item.isDone ? 'text-decoration-line-through' : ''}>
                                {item.taskName}
                            </span>

                            <div>
                                <button
                                    onClick={() => handleCheckAndUncheck(item)}
                                    className='btn btn-success btn-sm me-2'
                                >
                                    <FaCheck />
                                </button>

                                <button
                                    onClick={() => setUpdateTask(item)}
                                    className='btn btn-primary btn-sm me-2'
                                >
                                    <FaPencilAlt />
                                </button>

                                <button
                                    onClick={() => handleDeleteTask(item._id)}
                                    className='btn btn-danger btn-sm me-2'
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>

            <ToastContainer position='top-right' autoClose={3000} />
        </div>
    );
}

export default TaskManager;