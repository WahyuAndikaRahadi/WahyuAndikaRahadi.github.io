const taskInput = document.getElementById("taskInput");
const taskCategoryInput = document.getElementById("taskCategoryInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const filterCategory = document.getElementById("filterCategory");

let tasks = [];

document.addEventListener("DOMContentLoaded", loadTasks);
filterCategory.addEventListener("change", renderTasks);

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
  renderTasks();
}

addBtn.onclick = () => {
  const text = taskInput.value.trim();
  const category = taskCategoryInput.value;
  if (text === "") return;

  const newTask = {
    id: Date.now(),
    text: text,
    category: category,
    completed: false,
  };

  tasks.push(newTask);
  taskInput.value = "";
  saveTasks();
  renderTasks();
};

function renderTasks() {
  list.innerHTML = "";
  const currentFilter = filterCategory.value;

  const filteredTasks = tasks.filter(task => 
    currentFilter === "Semua" || task.category === currentFilter
  );

  filteredTasks.forEach(task => {
    const li = document.createElement("li");
    li.dataset.id = task.id;

    if (task.completed) {
      li.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onchange = () => toggleComplete(task.id);

    const span = document.createElement("span");
    span.textContent = task.text;
    span.classList.add("task-text");
    span.ondblclick = () => makeEditable(li, span, task.id);

    const categorySpan = document.createElement("span");
    categorySpan.textContent = `[${task.category}]`;
    categorySpan.classList.add("task-category");

    const delBtn = document.createElement("button");
    delBtn.textContent = "Hapus";
    delBtn.className = "delete";
    delBtn.onclick = () => deleteTask(task.id);

    li.appendChild(checkbox);
    li.appendChild(categorySpan);
    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

function toggleComplete(id) {
  const taskIndex = tasks.findIndex(t => t.id === id);
  if (taskIndex > -1) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    saveTasks();
    renderTasks();
  }
}

function makeEditable(li, span, id) {
  const currentText = span.textContent;
  
  const input = document.createElement('input');
  input.type = 'text';
  input.value = currentText;
  input.classList.add('inline-edit-input');
  
  li.replaceChild(input, span);
  input.focus();

  const saveEdit = () => {
    const newText = input.value.trim();
    if (newText !== "" && newText !== currentText) {
      updateTaskText(id, newText);
    }
    li.replaceChild(span, input);
  };

  input.addEventListener('blur', saveEdit);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    }
  });
}

function updateTaskText(id, newText) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.text = newText;
    saveTasks();
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}