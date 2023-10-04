
export class Todo {

    static fromJSON({ id, task, completed, created }) {

        const Temptodo = new Todo(task);

        Temptodo.id = id;
        Temptodo.completed = completed;
        Temptodo.created = created;

        return Temptodo;
    }

    constructor(task) {
        this.task = task;
        this.id = new Date().getTime();
        this.completed = false;
        this.created = new Date();
    }
}