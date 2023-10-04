import { Todo } from "./todo.class";

export class TodoList {
    constructor () {
        this.loadLocalStorage();
    }

    newTodo(todo){
        this.todos.push(todo);
        this.saveLocalStorage();

    }

    removeTodo(id) {
        this.todos = this.todos.filter(todo => todo.id != id);
        this.saveLocalStorage();

    }

    statusTodo(id){
        
        for(const todo of this.todos ) {
            if(todo.id == id) {
                todo.completed = !todo.completed;
                break;
            }
        };
        this.saveLocalStorage();

    }

    removeTodoCompleted(){
        this.todos = this.todos.filter(todo => !todo.completed);
        this.saveLocalStorage();
    }

    saveLocalStorage(){
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    loadLocalStorage(){
        this.todos = (localStorage.getItem('todos')) ? JSON.parse(localStorage.getItem('todos')) : [];

        this.todos = this.todos.map(obj => Todo.fromJSON(obj));
    }
}