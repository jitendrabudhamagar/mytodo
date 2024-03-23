import { Task } from './task.js';

class Todos {
    #tasks = [];
    #backendUrl;

    constructor(url) {
        this.#backendUrl = url;
    }

    getTasks = async () => {
        try {
            const response = await fetch(this.#backendUrl);
            const json = await response.json();
            this.#readJson(json);
            return this.#tasks;
        } catch (error) {
            throw new Error('Failed to fetch tasks: ' + error.message);
        }
    };

    #addToArray = (id, description) => {
        const newTask = new Task(id, description);
        this.#tasks.push(newTask);
        return newTask;
    };

    addTask = (description) => {
        return fetch(this.#backendUrl + '/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({description: description})
        })
        .then((response) => response.json())
        .then((json) => {
            return this.#addToArray(json.id, json.description);
        })
        .catch((error) => {
            throw new Error('Failed to add task: ' + error.message);
        });
    };

    #readJson = (taskjson) => {
        taskjson.forEach(task => {
            const newTask = new Task(task.id, task.description);
            this.#tasks.push(newTask);
        });
    };
}

export { Todos };
