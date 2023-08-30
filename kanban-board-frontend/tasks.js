const kanbanBoard = document.querySelector(".kanban-board");

async function fetchTasks() {
  try {
    const response = await fetch("http://localhost:9090/api/tasks");
    const tasks = await response.json();
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
}

async function renderTasks() {
  const tasks = await fetchTasks();

  tasks.forEach((task) => {
    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");

    const taskTitle = document.createElement("h3");
    taskTitle.textContent = task.title;

    const taskDescription = document.createElement("p");
    taskDescription.textContent = task.description;

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("task-card-buttons");

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-button");
    editButton.addEventListener("click", () => {
      const newTitle = prompt("Enter new title:");
      const newDesc = prompt("Enter new Description");
      if (newTitle && newDesc) {
        taskTitle.textContent = newTitle;
        taskDescription.textContent = newDesc;
        // Update task title in the database
        updateTaskTitle(task._id, newTitle, newDesc);
      }
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => {
      // Removing the task from the UI and database
      taskCard.remove();
      deleteTask(task._id);
    });

    const statusSelect = document.createElement("select");
    statusSelect.classList.add("status-select");
    ["ToDo", "Doing", "Done"].forEach((option) => {
      const statusOption = document.createElement("option");
      statusOption.value = option.toLowerCase();
      statusOption.textContent = option;
      statusSelect.appendChild(statusOption);
    });

    statusSelect.value = task.status.toLowerCase();

    statusSelect.addEventListener("change", async () => {
      const newStatus = statusSelect.value;
      await updateTaskStatus(task._id, newStatus);
      window.location.reload();
      await renderTasks();
    });

    buttonsDiv.appendChild(editButton);
    buttonsDiv.appendChild(deleteButton);
    buttonsDiv.appendChild(statusSelect);

    taskCard.appendChild(taskTitle);
    taskCard.appendChild(taskDescription);
    taskCard.appendChild(buttonsDiv);

    const column = document.getElementById(task.status.toLowerCase());
    if (column) {
      // Remove the task card from its current position
      taskCard.remove();

      // Append the task card to the new column
      column.appendChild(taskCard);
    }
  });
}

async function updateTaskTitle(taskId, newTitle) {
  const response = await fetch(`http://localhost:9090/api/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: newTitle }),
  });
  const updatedTask = await response.json();
  console.log("Task title updated:", updatedTask);
}

async function deleteTask(taskId) {
  const response = await fetch(`http://localhost:9090/api/tasks/${taskId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    console.log("Task deleted");
  } else {
    console.error("Error deleting task");
  }
}

renderTasks();

async function updateTaskStatus(taskId, newStatus) {
  try {
    const res = await fetch(`http://localhost:9090/api/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!res.ok) {
      throw new Error("Failed to update task status");
    }
  } catch (error) {
    console.error("Error updating task status:", error);
  }
}
