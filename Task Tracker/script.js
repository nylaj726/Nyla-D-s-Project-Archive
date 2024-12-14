// Select elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Load tasks from local storage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Add new task
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = taskInput.value;

  if (taskText.trim() === '') return;

  addTaskToDOM(taskText);
  saveTaskToLocalStorage(taskText);

  taskInput.value = ''; // Clear input
});

// Add task to DOM
function addTaskToDOM(taskText, completed = false) {
  const li = document.createElement('li');
  li.textContent = taskText;
  if (completed) li.classList.add('completed');

  // Mark task as complete
  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    toggleTaskCompletion(taskText);
  });

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete');
  deleteBtn.addEventListener('click', () => {
    li.remove();
    deleteTaskFromLocalStorage(taskText);
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Save task to local storage
function saveTaskToLocalStorage(taskText) {
  const tasks = getTasksFromLocalStorage();
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach((task) => addTaskToDOM(task.text, task.completed));
}

// Toggle task completion in local storage
function toggleTaskCompletion(taskText) {
  const tasks = getTasksFromLocalStorage();
  const task = tasks.find((t) => t.text === taskText);
  if (task) task.completed = !task.completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Delete task from local storage
function deleteTaskFromLocalStorage(taskText) {
  let tasks = getTasksFromLocalStorage();
  tasks = tasks.filter((task) => task.text !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks from local storage
function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}