function addTodo() {
  var inputField = document.getElementById("todo-input");
  var todoText = inputField.value.trim();

  if (todoText !== "") {
      var todoList = document.getElementById("todo-list");
      var newTodoItem = document.createElement("li");
      newTodoItem.textContent = todoText;
      newTodoItem.classList.add("todo-item");
      todoList.appendChild(newTodoItem);

      // Clear the input field after adding todo
      inputField.value = "";
  }
}

document.getElementById("todo-input").addEventListener("keypress", function(event) {
  // Check if the Enter key is pressed
  if (event.key === "Enter") {
      addTodo();
  }
});