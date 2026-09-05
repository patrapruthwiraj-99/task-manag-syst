import { API_URL } from "./utils";

// CREATE
export const CreateTask = async (taskObj) => {
    const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(taskObj)
    });
    return await res.json();
};

// GET ALL
export const GetAllTasks = async () => {
    const res = await fetch(`${API_URL}/tasks`);
    return await res.json();
};

// DELETE
export const DeleteTaskById = async (id) => {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE"
    });
    return await res.json();
};

// UPDATE
export const UpdateTaskById = async (id, body) => {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    return await res.json();
};