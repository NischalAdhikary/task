import { useState } from "react";
import Button from "../ui/button";
import { Trash, Pencil, EllipsisVertical } from "lucide-react";
import Modal from "../ui/modal";
import Taskform from "./Taskform";
import Taskdelete from "./Taskdelete";

import TaskItemSkeleton from "./SkeletonTaskList";
import { updateTask, updateTaskStatus } from "../../api/taskapp";
import DropdownMenu from "../ui/dropdown";

const statusOptions = [
  { value: "pending", label: "Pending" },
  {
    value: "done",
    label: "Completed",
  },
];
export default function TaskItem({ items, loading, refetch }) {
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedTask, setSeletedTask] = useState(null);
  const [statusOpen, setStatusOpen] = useState(false);

  const handleEditClick = (item) => {
    const date = item.dueDate;
    console.log(typeof date);
    setEditModal(true);
    setSeletedTask(item);
  };
  const handleDeleteClick = async (id) => {
    setDeleteModal(true);
    setSeletedTask(id);
  };
  const handleStatusClick = (data) => {
    setSeletedTask(data);
    setStatusOpen(true);
  };

  const onEditSubmit = async (data) => {
    console.log(data);
    await updateTask(data);
    refetch();

    setEditModal(false);
  };
  const onStatusChange = async (id, newStatus) => {
    await updateTaskStatus(id, newStatus);
    refetch();
    setStatusOpen(false);
  };

  return (
    <div className="space-y-3">
      {loading ? (
        <TaskItemSkeleton />
      ) : items && items.length > 0 ? (
        items.map((item) => (
          <div
            key={item.id}
            className="w-full p-4 border rounded-lg flex flex-col gap-2 sm:flex-row justify-between items-start sm:items-center bg-white shadow-sm hover:shadow-md transition"
          >
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600 mt-1">{item.description}</p>
              <div className="flex gap-4 mt-2 text-sm text-gray-500">
                <span>Due: {item.dueDate}</span>
                <span
                  className={`font-medium ${
                    item.status === "done"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>

            <div className="flex gap-2 relative mt-3 sm:mt-0">
              <Button
                onClick={() => handleEditClick(item)}
                variant="primary"
                className="flex  items-center gap-1"
              >
                <Pencil size={14} />
              </Button>
              <Button
                onClick={() => handleDeleteClick(item.id)}
                variant="danger"
                className="flex  items-center gap-1"
              >
                <Trash size={14} />
              </Button>
              <Button
                onClick={() => handleStatusClick(item)}
                variant="secondary"
                className="flex items-center gap-1"
              >
                <EllipsisVertical size={14} />
              </Button>
              {statusOpen && item.id === selectedTask.id && (
                <DropdownMenu
                  onClose={() => setStatusOpen(false)}
                  options={statusOptions}
                  value={item}
                  open={statusOpen}
                  onSelect={onStatusChange}
                />
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-xl text-center">No tasks </div>
      )}

      {editModal && (
        <Modal>
          <Taskform
            data={selectedTask}
            title={"Edit Task"}
            setTask={setSeletedTask}
            onSubmit={onEditSubmit}
            onClose={() => setEditModal(false)}
          />
        </Modal>
      )}
      {deleteModal && (
        <Taskdelete id={selectedTask} onClose={() => setDeleteModal(false)} />
      )}
    </div>
  );
}
