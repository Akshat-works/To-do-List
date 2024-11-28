import { currentCategory } from "./lists.js";

document.addEventListener("DOMContentLoaded", () => {
  let todolist = JSON.parse(localStorage.getItem(currentCategory)) || [];

  const inputElement = document.querySelector("#inputtodo");
  const dateElement = document.querySelector("#todo-date");
  const displayElement = document.querySelector(".todocontainer");
  const addButton = document.querySelector("#addtodo");

  displayItems();

  addButton.addEventListener("click", () => {
    const todoitem = inputElement.value.trim();
    const todoDate = dateElement.value;

    if (!todoitem || !todoDate) {
      alert("Please fill in both task and due date.");
      return;
    }

    todolist.push({ item: todoitem, dueDate: todoDate });
    updateLocalStorage();
    displayItems();

    inputElement.value = "";
    dateElement.value = "";
  });

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

  function updateLocalStorage() {
    localStorage.setItem(currentCategory, JSON.stringify(todolist));
  }
});
