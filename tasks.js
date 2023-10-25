const taskList = document.querySelector('.app__section-task-list');

const toggleFormTaskBtn = document.querySelector('.app__button--add-task');
const cancelTaskBtn = document.querySelector('.app__form-footer__button--cancel');
const deleteTaskBtn = document.querySelector('.app__form-footer__button--delete');
const formTask = document.querySelector('.app__form-add-task');
const formLabel = document.querySelector('.app__form-label');
const taskActiveDescription = document.querySelector('.app__section-active-task-description');

const textarea = document.querySelector(`.app__form-textarea`);

const localStorageTasks = localStorage.getItem('tasks')
let tasks = localStorageTasks ? JSON.parse(localStorageTasks) : []

const taskIconSvg = `
<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF" />
    <path
        d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
        fill="#01080E" />
</svg>
`

let taskSelected = null
let taskSelectedItem = null

let editingTask = null
let editingParagraph = null


const selectTask = (task, element) => {
    document.querySelectorAll('app__section-task-list-item-active').forEach(function (button) {
        button.classList.remove('app__section-task-list-item-active');
    })

    if (taskSelected == task) {
        taskActiveDescription.textContent = null
        taskSelectedItem = null
        taskSelected = null
        return
    }

    taskSelected = task
    taskSelectedItem = element
    taskActiveDescription.textContent = task.descricao
    element.classList.add('app__section-task-list-item-active')
}


function clearForm() {
    editingTask = null
    editingParagraph = null
    textarea.value = ''
    formTask.classList.add('hidden');
}


const editTask = (task, element) => {

    if (editingTask == task) {
        clearForm()
        return
    }

    formLabel.textContent = 'Editando tarefa'
    editingTask = task
    editingParagraph = element
    textarea.value = task.descricao
    formTask.classList.remove('hidden')
}


function createTask(task) {

    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svgIcon = document.createElement('svg');
    svgIcon.innerHTML = taskIconSvg;

    const paragraph = document.createElement('p');
    paragraph.classList.add('app__section-task-list-item-description');

    paragraph.textContent = task.descricao;

    const button = document.createElement('button');

    button.classList.add('app_button-edit');
    const editButton = document.createElement('img');
    editButton.setAttribute('src', './imagens/edit.png');

    button.appendChild(editButton);

    button.addEventListener('click', (event) => {
        event.stopPropagation()
        editTask(task, paragraph)
    })


    li.onclick = () => {
        selectTask(task, li)
    }

    svgIcon.addEventListener('click', event => {

        event.stopPropagation()
        button.setAttribute('disabled', true);
        li.classList.add('app__section-task-list-item-complete');

        if (task.concluida) {
            button.setAttribute('disabled', true);
            li.classList.add('app__section-task-list-item-complete');
        }
    })

    li.appendChild(svgIcon);
    li.appendChild(paragraph);
    li.appendChild(button);

    return li;
}


tasks.forEach(task => {
    const taskItem = createTask(task)
    taskList.appendChild(taskItem)
})


toggleFormTaskBtn.addEventListener('click', () => {
    formLabel.textContent = 'Adicionando nova tarefa'
    formTask.classList.toggle('hidden');
})


const updateLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}


formTask.addEventListener('submit', (event) => {
    event.preventDefault()

    if (editingTask) {
        editingTask.descricao = textarea.value
        editingParagraph.textContent = textarea.value
    } else {
        const task = {
            descricao: textarea.value,
            concluida: false
        }

        tasks.push(task)
        const taskItem = createTask(task)
        taskList.appendChild(taskItem)
    }

    updateLocalStorage()
    clearForm()
})


cancelTaskBtn.addEventListener('click', () => {
    clearForm()
})