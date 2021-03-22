let todoItems = [];
const list = document.querySelector("ul");
function renderTodo(todo) {
  localStorage.setItem("todoItems", JSON.stringify(todoItems));

  const item = document.querySelector(`[data-key='${todo.id}']`);

  if (todo.deleted) {
    item.remove();
    if (todoItems.length === 0) list.innerHTML = "";
    return;
  }
  const isChecked = todo.checked ? "done" : "";
  const node = document.createElement("li");
  node.setAttribute("class", `todo-${isChecked}`);
  node.setAttribute("id", "todo-close");
  node.setAttribute("data-key", todo.id);
  node.innerHTML = `
  <input type="checkbox" id="${todo.id}">
  <span>${todo.text}</span>
  <button name="checkButton"><i class="fas fa-check-square" ></i></button>
  <button name="deleteButton" class="js-delete-todo" ><i class="fas fa-trash"></i></button>
  `;
  if (item) {
    list.replaceChild(node, item);
  }
  {
    list.append(node);
  }
}
function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };
  todoItems.push(todo);
  renderTodo(todo);
}

list.addEventListener("click", (event) => {
  if (event.target.type == "checkbox") {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }
  if (event.target.classList.contains("js-delete-todo")) {
    const itemKey = event.target.parentElement.dataset.key;
    console.log(itemKey);
    deleteTodo(itemKey);
  }
});
function deleteTodo(itemKey) {
  const index = todoItems.findIndex((item) => item.id === Number(itemKey));

  const todo = {
    deleted: true,
    ...todoItems[index],
  };
  todoItems = todoItems.filter((item) => item.id === Number(itemKey));
  renderTodo(todo);
}
function toggleDone(itemKey) {
  const index = todoItems.findIndex((item) => item.id === Number(itemKey));

  todoItems[index].checked = !todoItems[index].checked;
  renderTodo(todoItems[index]);
}
const form = document.querySelector(".form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.querySelector(".js-input");
  const text = input.value.trim();
  if (text !== "") {
    addTodo(text);
    input.value = "";
    input.focus();
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const ref = localStorage.getItem("todoItems");
  if (ref) {
    todoItems = JSON.parse(ref);
    todoItems.forEach((t) => {
      renderTodo(t);
    });
  }
});
