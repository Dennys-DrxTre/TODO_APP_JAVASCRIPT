import { Todo, TodoList } from "../classes";
import { todoList } from "../index";

const divTodolist = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const BtnDelete = document.querySelector('.clear-completed');
const Ulfilters = document.querySelector('.filters');
const BtnSelected = document.querySelectorAll('.filtro');

export const createTodoHTML = (todo) => {
    const htmlTodo = `
        <li class="${ (todo.completed) ? 'completed' : '' }" data-id="${todo.id}">
            <div class="view">
                <input class="toggle" type="checkbox" ${ (todo.completed) ? 'checked' : ''}>
                <label>${todo.task}</label>
                <button class="destroy"></button>
            </div>
			<input class="edit" value="Create a TodoMVC template">
		</li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodolist.append(div.firstElementChild);
    return div.firstElementChild;
}

// EVENTS

txtInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && txtInput.value.length > 0) {
        const newTodo = new Todo(txtInput.value);
        todoList.newTodo(newTodo);
        createTodoHTML(newTodo);
        txtInput.value = '';
    };
});

divTodolist.addEventListener('click', (event) => {
    
    const nameElement = event.target.localName;
    const todoElement = event.target.parentElement.parentElement;
    const todoId = todoElement.getAttribute('data-id');

    if(nameElement.includes('input')) { // click on check
        todoList.statusTodo(todoId);
        todoElement.classList.toggle('completed');
    } else if (nameElement.includes('button')) {
        todoList.removeTodo(todoId);
        todoElement.remove()
    }

});


BtnDelete.addEventListener('click', () => { // click to delete
    todoList.removeTodoCompleted();

    for(let i = divTodolist.children.length-1; i>=0; i--) {
        const element = divTodolist.children[i];

        if(element.classList.contains('completed')) {
            element.remove();
        }
    }

})

Ulfilters.addEventListener('click', (event) => {

    const filter = event.target.text;
    if(!filter) { return; }

    BtnSelected.forEach(element => {
        element.classList.remove('selected');
    });
    event.target.classList.add('selected');

    for( const element of divTodolist.children ) {

        element.classList.remove('hidden');
        const completed = element.classList.contains('completed');

        switch (filter) {
            case 'Pendientes':
                if (completed) {
                    element.classList.add('hidden');
                }
                break;

            case 'Completados':
                if (!completed) {
                    element.classList.add('hidden');
                }
                break;
        
            default:
                break;
        }

    }
})