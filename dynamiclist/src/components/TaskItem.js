import React, { useState } from "react";

function TaskItem({ task, deleteTask, toggleComplete, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEdit = () => {
    if (!newText.trim()) return;
    editTask(task.id, newText);
    setIsEditing(false);
  };

  return (
    <div className={`task ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <>
          <input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
        </>
      ) : (
        <>
          <span onClick={() => toggleComplete(task.id)}>
            {task.text}
          </span>
          <div>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskItem;