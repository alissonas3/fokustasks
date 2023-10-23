const taskList = document.querySelector('.app__section-task-list');

const toggleFormTaskBtn = document.querySelector('.app__button--add-task');
const cancelTaskBtn = document.querySelector('.app__form-footer__button--cancel');
const deleteTaskBtn = document.querySelector('.app__form-footer__button--delete');
const formTask = document.querySelector('.app__form-add-task');
const formLabel = document.querySelector('.app__form-label');

const textarea = document.querySelector(`.app__form-textarea`);

const localStorageTasks = localStorage.getItem('tasks');
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

function clearForm() {
    textarea.value = '';
    formTask.classList.add('hidden');
}

function createTask (task) {

    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svgIcon = document.createElement('svg');
    svgIcon.innerHTML = taskIconSvg;

    const paragraph = document.createElement('p');
    paragraph.classList.add('app__section-task-list-item-description');

    paragraph.textContent = task.descricao;

    li.appendChild(svgIcon);
    li.appendChild(paragraph);

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
    const task = {
        descricao: textarea.value,
        concluida: false
    }

    tasks.push()
    const taskItem = createTask(task)
    taskList.appendChild(taskItem)

    updateLocalStorage()
    clearForm()
})

cancelTaskBtn.addEventListener('click', () => {
    clearForm()
})