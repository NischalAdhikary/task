import React from "react";
import Modal from "../ui/modal";
import Button from "../ui/button";

export default function Taskdelete({ onClose, id, onSubmit }) {
  return (
    <Modal>
      <div className="p-4 w-auto rounded bg-white flex gap-10 flex-col">
        <h2 className="text-3xl font-semibold">
          Are you sure to delete this task?
        </h2>
        <div className="self-end flex gap-3">
          <Button variant={"secondary"} onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onSubmit(id)} variant={"danger"}>
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  );
}
