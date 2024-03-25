import { Todos } from './class/Todos.js';

const BACKEND_ROOT_URL = 'http://localhost:3001';
const todos = new Todos(BACKEND_ROOT_URL);

const list = document.querySelector('.list-group');
const input = document.querySelector('.form-control');

input.disabled = true;

const renderTask = (task) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-center');
    li.setAttribute('data-key', task.getId().toString());
    li.innerHTML = `
        <span>${task.getText()}</span>
        <button type="button" class="btn btn-sm btn-danger delete-task"><i class="fas fa-trash-alt"></i></button>
    `;
    list.appendChild(li);

    // Added event listener for delete task
    const deleteButton = li.querySelector('.delete-task');
    deleteButton.addEventListener('click', async (event) => {
        event.preventDefault();
        try {
            await todos.removeTask(task.getId());
            li.remove();
        } catch (error) {
            console.error(error);
        }
    });
}

const getTasks = () => {
    todos.getTasks()
        .then((tasks) => {
            tasks.forEach(task => {
                renderTask(task);
            });
            input.disabled = false;
        })
        .catch((error) => {
            console.error(error);
            alert('Failed to fetch tasks. Please try again.');
        });
}

const saveTask = async (taskText) => {
    try {
        const newTask = await todos.addTask(taskText);
        renderTask(newTask);
        input.value = '';
    } catch (error) {
        console.error(error);
        alert('Failed to add task. Please try again.');
    }
}

input.addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const taskText = input.value.trim();
        if (taskText !== '') {
            await saveTask(taskText);
        }
    }
});

getTasks();