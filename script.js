const todoForm = document.querySelector('form');
const todoInput = document.getElementById('to-do-input');
const todoListUL = document.getElementById('todo-list');

let allTodos = getTodos();
updateTodoList();
// console.log(allTodos);

todoForm.addEventListener('submit', function (e) {
    // alert();
    e.preventDefault();
    addTodo();
})

function addTodo() {
    const todoText = todoInput.value.trim();
    // alert(todoText);
    if (todoText.length > 0) {
        const todoObjet={
            text:todoText,
            completed:false
        }
        allTodos.push(todoObjet);
        updateTodoList();
        saveTodos();
        todoInput.value = "";
    }
    // console.log(allTodos);

}

function updateTodoList() {
    todoListUL.innerHTML = "";
    allTodos.forEach((todo, todoIndex) => {
        todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);
    })
}
function createTodoItem(todo, todoIndex) {
    const todoId = "todo-" + todoIndex;
    const todoLI = document.createElement("li");
    const todoText = todo.text;
    // todoLI.innerText=todo;
    todoLI.className = "todo";
    todoLI.innerHTML = `
    <input type="checkbox" id="${todoId}">
                <label class="custom-checkbox" for="${todoId}">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" ><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                </label>
                <label for="${todoId}" class="todo-text">
                    ${todoText}
                </label>
                <button class="delete-button">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" ><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button>
    `
    const deleteButton=todoLI.querySelector(".delete-button");
    deleteButton.addEventListener("click",()=>{
        deleteTodoitem(todoIndex);
    })
    const checkbox=todoLI.querySelector("input");
    checkbox.addEventListener("change",()=>{
        allTodos[todoIndex].completed=checkbox.checked;
        saveTodos();
    })
    checkbox.checked=todo.completed;
    return todoLI;
    // todoListUL.append(todoLI);
}
function deleteTodoitem(todoIndex){
    allTodos=allTodos.filter((_,i)=>i !== todoIndex);
    saveTodos();
    updateTodoList();
}

function saveTodos() {
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJson);
}
function getTodos() {
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}