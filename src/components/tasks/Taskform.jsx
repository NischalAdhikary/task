import React from "react";
import Input from "../ui/input";
import Button from "../ui/button";

export default function Taskform({ title, onClose, data, setTask, onSubmit }) {
  return (
    <div className="p-6 flex flex-col  bg-white w-full md:w-1/3 rounded gap-6">
      <h1 className="text-2xl font-bold text-center">{title}</h1>
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-lg font-semibold">
          Title
        </label>
        <Input
          id={"title"}
          type={"text"}
          value={data.title}
          onChange={(e) =>
            setTask((prev) => ({ ...prev, title: e.target.value }))
          }
          className={"p-2 border rounded "}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="description" className="text-lg font-semibold">
          Description
        </label>
        <Input
          type={"text"}
          id="description"
          value={data.description}
          onChange={(e) =>
            setTask((prev) => ({ ...prev, description: e.target.value }))
          }
          className={"p-2 border rounded "}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="date" className="text-lg font-semibold">
          Due Date
        </label>
        <Input
          type={"date"}
          id="date"
          value={data.dueDate}
          onChange={(e) =>
            setTask((prev) => ({ ...prev, dueDate: e.target.value }))
          }
          className={"p-2 border rounded "}
        ></Input>
      </div>
      <div className="self-end flex gap-3">
        <Button variant={"secondary"} onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={() => onSubmit(data)} variant={"success"}>
          Save
        </Button>
      </div>
    </div>
  );
}
