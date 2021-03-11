//Selectors
const todoInput = document.querySelector('.todo-input')//form input
const todoButton = document.querySelector('.todo-button')//form button
const todoList = document.querySelector('.todo-list')//ul
const filterOption = document.querySelector('.filter-todo')//


//Event Listeners
document.addEventListener('DOMContentLoaded', loadLocalTodos) //Loading from localStorage when document loads
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck) //Event Bubbling: When the event listener is added to the topmost element instead of the child elements
filterOption.addEventListener('click', filterTodo)

//Functions
//Adding Todo
function addTodo(event) {
    event.preventDefault()

    //Create wrapping div 
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')

    //Creating li for the task description
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)

    //Add todo to localStorage
    saveLocalTodos(todoInput.value)

    //Creating button for checking if completed
    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton)

    //Creating button for deleting
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton)

    //Appending to the TodoList
    todoList.appendChild(todoDiv)

    //Clear todoInput value
    todoInput.value = ''
}


//Delete and Completion Options
function deleteCheck(event) {
    if (event.target.classList[0] === 'trash-btn') {
        const div = event.target.parentElement

        //Deleting todo from localStorage
        const deletedTodo = div.childNodes[0].innerText
        deleteLocalTodos(deletedTodo)

        //Animation for deleting list
        div.classList.add('fall')

        //Wait for transition then remove
        div.addEventListener('transitionend', function () {
            div.remove()
        })

    }

    if (event.target.classList[0] === 'complete-btn') {
        const div = event.target.parentElement
        div.classList.toggle('completed')
    }
}


//Adding Filter Option
function filterTodo(event) {
    const todos = todoList.childNodes
    todos.forEach(function (todo) {
        switch (event.target.value) {
            case "all":
                todo.style.display = 'flex'
                break
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break
            case "incomplete":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break
        }
    })
}


//Getting from localStorage
function getLocalTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    return todos
}


//Saving to localStorage
function saveLocalTodos(todo) {
    todos = getLocalTodos()

    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}


//Loading from localStorage
function loadLocalTodos() {
    todos = getLocalTodos()

    todos.forEach(function (todo) {
        //Create wrapping div 
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')

        //Creating li for the task description
        const newTodo = document.createElement('li')
        newTodo.innerText = todo
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)

        //Creating button for checking if completed
        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add('complete-btn')
        todoDiv.appendChild(completedButton)

        //Creating button for deleting
        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add('trash-btn')
        todoDiv.appendChild(trashButton)

        //Appending to the TodoList
        todoList.appendChild(todoDiv)

    })
}

//Delete from localStorage
function deleteLocalTodos(todo) {
    todos = getLocalTodos()
    index = todos.indexOf(todo)
    todos.splice(index, 1)
    localStorage.setItem("todos", JSON.stringify(todos))
}