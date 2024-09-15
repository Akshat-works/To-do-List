let todolist = JSON.parse(localStorage.getItem("savedlist")) || [];
displayItems();
function addlist() {
  let inputElement = document.querySelector("#inputtodo");
  let dateElement = document.querySelector("#todo-date");
  let todoitem = inputElement.value;
  let todoDate = dateElement.value;
  todolist.push({ item: todoitem, dueDate: todoDate });
  let storage = JSON.stringify(todolist);
  localStorage.setItem("savedlist", `${storage}`);
  inputElement.value = "";
  dateElement.value = "";
  displayItems();
}

function displayItems() {
  let displayElement = document.querySelector(".todocontainer");

  let newHtml = "";

  for (let i = 0; i < todolist.length; i++) {
    let { item, dueDate } = todolist[i];
    newHtml += `
        <span> ${item} </span>
        <span>${dueDate}</span>
        <button onclick = 'todolist.splice(${i},1); displayItems();'>Delete</button>
        `;
  }
  storage = JSON.stringify(todolist);
  localStorage.setItem("savedlist", `${storage}`);
  displayElement.innerHTML = newHtml;
}
