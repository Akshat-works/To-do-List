let categories = JSON.parse(localStorage.getItem("categories")) || {
  Default: [],
};

let currentCategory = localStorage.getItem("currentCategory") || "Default";

function addCategory() {
  const categoryInput = document.getElementById("new-category-input");
  const categoryName = categoryInput.value.trim();

  if (!categoryName) {
    alert("Category name cannot be empty.");
    return;
  }

  if (categories[categoryName]) {
    alert("Category already exists.");
    return;
  }

  categories[categoryName] = [];
  categoryInput.value = "";
  switchCategory(categoryName);
  renderCategories();
  saveDataToLocalStorage();
}

function switchCategory(categoryName) {
  currentCategory = categoryName;
  document.getElementById(
    "current-category"
  ).textContent = `Current: ${categoryName}`;
  displayTasks();
  saveDataToLocalStorage();
}

function deleteCategory(categoryName) {
  if (Object.keys(categories).length === 1) {
    alert("Cannot delete the last remaining category.");
    return;
  }

  if (currentCategory === categoryName) {
    currentCategory = Object.keys(categories).find(
      (cat) => cat !== categoryName
    );
  }

  delete categories[categoryName];
  renderCategories();
  switchCategory(currentCategory);
  saveDataToLocalStorage();
}

function renderCategories() {
  const categoryList = document.getElementById("category-list");
  categoryList.innerHTML = "";

  for (const category in categories) {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="category-name">${category}</span>
      <button class="delete-category">Delete</button>
    `;
    categoryList.appendChild(li);

    li.querySelector(".category-name").addEventListener("click", () => {
      switchCategory(category);
    });
    li.querySelector(".delete-category").addEventListener("click", () => {
      deleteCategory(category);
    });
  }
}

function addTask() {
  const taskInput = document.getElementById("inputtodo");
  const dateInput = document.getElementById("todo-date");
  const taskText = taskInput.value.trim();
  const dueDate = dateInput.value.trim();

  if (!currentCategory) {
    alert("Please select a category first.");
    return;
  }

  if (!taskText || !dueDate) {
    alert("Task and due date cannot be empty.");
    return;
  }

  categories[currentCategory].push({ task: taskText, dueDate: dueDate });
  taskInput.value = "";
  dateInput.value = "";
  displayTasks();
  saveDataToLocalStorage();
}

function displayTasks() {
  const todoContainer = document.querySelector(".todocontainer");
  todoContainer.innerHTML = "";

  if (!currentCategory || !categories[currentCategory].length) {
    todoContainer.innerHTML = "<p>No tasks available for this category.</p>";
    return;
  }

  categories[currentCategory].forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "todo-item";
    taskDiv.innerHTML = `
      <span class="task-name">${task.task}</span>
      <span class="due-date">${task.dueDate}</span>
      <button class="delete-task" data-index="${index}">Delete</button>
    `;
    todoContainer.appendChild(taskDiv);

    taskDiv.querySelector(".delete-task").addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      deleteTask(index);
    });
  });
}

function deleteTask(index) {
  categories[currentCategory].splice(index, 1);
  displayTasks();
  saveDataToLocalStorage();
}

function saveDataToLocalStorage() {
  localStorage.setItem("categories", JSON.stringify(categories));
  localStorage.setItem("currentCategory", currentCategory);
}

function initialize() {
  renderCategories();
  displayTasks();
}

function addEventListeners() {
  const addCategoryButton = document.getElementById("addCategoryButton");
  addCategoryButton.addEventListener("click", addCategory);

  const addTaskButton = document.getElementById("addtodo");
  addTaskButton.addEventListener("click", addTask);
}

document.addEventListener("DOMContentLoaded", () => {
  initialize();
  addEventListeners();
});
