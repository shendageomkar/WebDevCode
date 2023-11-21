// Define TodoItem interface
interface TodoItem {
    id: number;
    text: string;
}

// Get elements from the DOM
const newTodoInput = document.getElementById('newTodo') as HTMLInputElement;
const todoList = document.getElementById('todoList') as HTMLUListElement;

// Get existing todos from localStorage or initialize an empty array
let todos: TodoItem[] = JSON.parse(localStorage.getItem('todos') || '[]');

// Render todos on page load
renderTodos();

// Function to render todos on the page
function renderTodos() {
    todoList.innerHTML = '';

    todos.forEach((todo) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${todo.text}</span>
            <button onclick="removeTodo(${todo.id})">Delete</button>
        `;
        todoList.appendChild(li);
    });
}

// Function to add a new todo
function addTodo() {
    const newTodoText = newTodoInput.value.trim();

    if (newTodoText !== '') {
        const newTodo: TodoItem = {
            id: new Date().getTime(),
            text: newTodoText,
        };

        todos.push(newTodo);
        saveTodos();
        newTodoInput.value = '';
        renderTodos();
    }
}

// Function to remove a todo
function removeTodo(id: number) {
    todos = todos.filter((todo) => todo.id !== id);
    saveTodos();
    renderTodos();
}

// Function to save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}
