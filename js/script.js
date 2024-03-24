


import { Todos } from "./class/todos.js";
const BACKEND_ROOT_URL = 'http://localhost:3001';
const todos = new Todos(BACKEND_ROOT_URL);

const todoList = document.getElementById("todo-list");
const inputField = document.getElementById("todo-input");

inputField.disabled = true;

const renderTask = (task) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-group-item');
    li.setAttribute('data-key', task.id.toString());
    li.innerHTML = task.description;
    renderLink(li, task.id);
    todoList.appendChild(li);
    
}

const renderLink = (li, id) => {
    const a = li.appendChild(document.createElement('a'));
    a.innerHTML = '<i class="bi bi-trash"></i>';
    a.setAttribute('style', 'float:right');
    a.addEventListener('click', async (event) => {
        event.preventDefault();
        try {
            await todos.removeTask(id);
            const li_to_remove = document.querySelector(`[data-key="${id}"]`);
            if (li_to_remove) {
              todoList.removeChild(li_to_remove);
            }
        } catch (error) {
            console.error(error.message);
        }
    });
}

const getTasks = () => {
    todos.getTasks().then((tasks) => {
        tasks.forEach(task => {
            renderTask(task);
        });
        inputField.disabled = false;
    }).catch((error) => {
        alert(error);
    });
}

const saveTask = async (task) => {
    try {
        const newTask = await todos.addTask(task);
        renderTask(newTask);
        console.log('Task added:', newTask);
        inputField.value = '';
    } catch (error) {
        console.error(error.message);
    }
}

inputField.addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const task = inputField.value.trim();
        if (task !== '') {
            await saveTask(task);
            console.log('Task added:', task);
        }
    }
});

getTasks();