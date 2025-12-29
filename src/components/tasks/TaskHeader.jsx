import React, { useState } from "react";
import Input from "../ui/input";
import Button from "../ui/button";
import { Plus } from "lucide-react";
import Modal from "../ui/modal";
import Taskform from "./Taskform";
export default function TaskHeader({
  task,
  setTask,
  onSubmit,
  setQuery,
  query,
}) {
  const [addModal, setAddModal] = useState(false);
  return (
    <div className="w-full h-20  flex items-center justify-center gap-4">
      <Input
        type={"text"}
        placeholder={"Search by Title"}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={"w-full h-10 border-2 rounded p-2 font-medium"}
      />
      <Button onClick={() => setAddModal(true)} variant={"primary"}>
        <Plus />
      </Button>
      {addModal && (
        <Modal>
          <Taskform
            title={"Add Task"}
            data={task}
            setTask={setTask}
            onSubmit={onSubmit}
            onClose={() => setAddModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}
