import { currentCategory } from "./lists.js";

document.addEventListener("DOMContentLoaded", () => {
  let todolist = JSON.parse(localStorage.getItem(currentCategory)) || [];

  // DOM Elements
  const inputElement = document.querySelector("#inputtodo");
  const dateElement = document.querySelector("#todo-date");
  const displayElement = document.querySelector(".todocontainer");
  const addButton = document.querySelector("#addtodo");

  // Display initial items
  displayItems();

  // Event Listener for Add Button
  addButton.addEventListener("click", () => {
    const todoitem = inputElement.value.trim();
    const todoDate = dateElement.value;

    // Validate input
    if (!todoitem || !todoDate) {
      alert("Please fill in both task and due date.");
      return;
    }

    // Add to list and update localStorage
    todolist.push({ item: todoitem, dueDate: todoDate });
    updateLocalStorage();
    displayItems();

    // Clear input fields
    inputElement.value = "";
    dateElement.value = "";
  });

  // Function to display items
  function displayItems() {
    let newHtml = "";

    todolist.forEach((task, index) => {
      const { item, dueDate } = task;
      newHtml += `
        <div class="todo-item">
          <span>${item}</span>
          <span>${dueDate}</span>
          <button class="delete-btn" data-index="${index}">Delete</button>
        </div>`;
    });

    displayElement.innerHTML = newHtml;

    // Add delete functionality
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        todolist.splice(index, 1);
        updateLocalStorage();
        displayItems();
      });
    });
  }

  // Function to update localStorage
  function updateLocalStorage() {
    localStorage.setItem(currentCategory, JSON.stringify(todolist));
  }
});
