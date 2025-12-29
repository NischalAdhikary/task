import api from "./api";

export const getTasks = async () => {
  const result = await api.get("/tasks");
  return result.data;
};
export const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`);
  getTasks();
};
export const createTask = async (data) => {
  await api.post("/tasks", data);
  getTasks();
};

export const updateTask = async (data) => {
  console.log("from api call", data.id);
  await api.put(`/tasks/${data.id}`, data);
  getTasks();
};
export const updateTaskStatus = async (id, newStatus) => {
  await api.patch(`tasks/${id}`, { status: newStatus });
};
