import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { Task } from "../types/task";

export const TaskForm: React.FC = () => {
  const { addTask } = useTasks();
  const [formData, setFormData] = useState<Omit<Task, "id" | "createdAt">>({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("Title is required");
      return;
    }
    addTask(formData);
    setFormData({
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
    });
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Add New Task</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Task Title"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          className="border p-2 rounded"
          maxLength={100}
          required
        />
        <textarea
          placeholder="Description (optional)"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          className="border p-2 rounded"
        />
        <select
          value={formData.priority}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              priority: e.target.value as Task["priority"],
            }))
          }
          className="border p-2 rounded"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};
