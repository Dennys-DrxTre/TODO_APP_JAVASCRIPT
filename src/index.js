import "./styles.css";

import { Todo, TodoList } from "./classes";
import { createTodoHTML } from "./js/components";

export const todoList = new TodoList();

todoList.todos.forEach(element => {
    createTodoHTML(element);
});

console.log(todoList.todos);