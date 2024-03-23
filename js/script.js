import { Todos } from "./class/todos.js";

const backendUrl = "http://localhost:3001";
const todos = new Todos(backendUrl);

const todoList = document.getElementById("todo-list");
const inputField = document.getElementById("todo-input");


const renderTask = (description) => {
  const task = document.createElement("li");
  task.textContent = description;
  task.classList.add("todo-item");
  todoList.appendChild(task);
}


const getTasks = async () => {
  try{
   const tasks = await todos.getTasks();
    tasks.forEach(task => {
      renderTask(task.description)
    })
    inputField.disabled = false
  } catch (error) {
    console.error(error)
  }

}
const savetask = async (task) => {
   try{
    const response = await fetch(backendUrl +'/new', {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({description: task}),
    })
    return response.json();
   } catch (error) {
      console.error(error)
    
   }
}





inputField.addEventListener("keypress", function(event) {
  // Check if the Enter key is pressed
  if (event.key === "Enter") {
    event.preventDefault();
    const task = inputField.value.trim();
    if (task !== "") {
      savetask(task)
      renderTask(task);
      inputField.value = "";
    }
  } 
});
getTasks()