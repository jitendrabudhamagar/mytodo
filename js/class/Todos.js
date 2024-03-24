import { Task } from './Task.js';

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

    addTask = async (description) => {
        try {
            const response = await fetch(this.#backendUrl + '/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ description: description })
            });
            const json = await response.json();
            return this.#addToArray(json.id, json.description);
        } catch (error) {
            throw new Error('Failed to add task: ' + error.message);
        }
    };

    removeTask = (id) => {
        return new Promise((resolve, reject) => {
            fetch(this.#backendUrl + '/delete/' + id, {
                method: 'DELETE'
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to delete task');
                    }
                    return response.json();
                })
                .then((json) => {
                    this.#removeFromArray(id); 
                    resolve(json.id);
                })
                .catch((error) => {
                    reject(error.message);
                });
        });
    };
    

    #readJson = (taskAsjson) => {
        taskAsjson.forEach(task => {
            const newTask = new Task(task.id, task.description);
            this.#tasks.push(newTask);
        });
    };
    
    #addToArray = (id, description) => {
        const newTask = new Task(id, description);
        this.#tasks.push(newTask); 
        return newTask;
    };
    
    #removeFromArray = (id) => {
        this.#tasks = this.#tasks.filter(task => task.id !== id); // Fixed the property access here
    };
}

export { Todos };
