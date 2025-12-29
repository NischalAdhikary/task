import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import TaskHeader from "./TaskHeader";
import { createTask, getTasks } from "../../api/taskapp";
import TaskFilter from "./Taskfilter";
import TaskSort from "./Tasksort";
import { useDebounce } from "../../hooks/useDebounce";

export default function TaskMain() {
  const [taskLoading, setTaskLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [query, setQuery] = useState("");
  const [newTask, setNewTask] = useState({
    title: "",
    status: "pending",
    description: "",
    dueDate: "",
  });
  const debounceValue = useDebounce(query, 400);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("");
  useEffect(() => {
    const fetchTasks = async () => {
      const result = await getTasks(setTasks);
      setTasks(result);
      setTaskLoading(false);
    };
    fetchTasks();
  }, [taskLoading]);

  const onSaveClick = async (data) => {
    await createTask(data);
  };
  const getFilteredTasks = () => {
    let filtered = tasks;
    if (filter === "pending")
      filtered = filtered.filter((t) => t.status !== "done");
    if (filter === "done")
      filtered = filtered.filter((t) => t.status === "done");

    if (debounceValue) {
      filtered = filtered.filter((t) =>
        t.title.toLowerCase().includes(debounceValue.toLowerCase())
      );
    }

    return filtered;
  };

  const getSortedTasks = (tasksToSort) => {
    const sorted = [...tasksToSort];

    if (sortBy === "name-asc") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "name-desc") {
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === "date-asc") {
      sorted.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sortBy === "date-desc") {
      sorted.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
    }

    return sorted;
  };

  const filteredTasks = getFilteredTasks();
  const sortedAndFilteredTasks = getSortedTasks(filteredTasks);

  return (
    <div className="w-full p-2  min-h-screen">
      <div className="container bg-gray-200 mx-auto w-full md:max-w-2xl border p-6 space-y-4">
        <TaskHeader
          query={query}
          setQuery={setQuery}
          task={newTask}
          setTask={setNewTask}
          onSubmit={onSaveClick}
        />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <TaskFilter onFilterChange={setFilter} />
          <TaskSort onSortChange={setSortBy} />
        </div>
        <TaskItem
          items={sortedAndFilteredTasks}
          loading={taskLoading}
          setTask={setNewTask}
        />
      </div>
    </div>
  );
}
