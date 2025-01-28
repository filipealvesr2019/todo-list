
const renderTaskProgressData = (tasks) => {
    let tasksProgress = document.getElementById('tasksProgress');

    // Cria o elemento, caso não exista
    if (!tasksProgress) {
        tasksProgress = document.createElement('div');
        tasksProgress.id = 'tasksProgress';
        document.getElementById('todo-footer').appendChild(tasksProgress);
    }

    // Atualiza o texto de progresso
    const doneTask = tasks.filter(({ checked }) => checked).length;
    const totalTasks = tasks.length;
    tasksProgress.textContent = `${doneTask}/${totalTasks} concluidas`;
};


const createdTaskInfo = (event) => new Promise((resolve) => {
    setTimeout( () => {
        resolve(getNewTaskData(event))
    }, 3000)
})

const getTaskLocalStorage = () => {
    const localTasks = JSON.parse(window.localStorage.getItem('tasks'));
    return localTasks ? localTasks : [];
}
const setTasksInLocalStorage = (tasks) => {
    window.localStorage.setItem('tasks', JSON.stringify(tasks))
}


const removeDoneTasks = () => {

    const tasks = getTaskLocalStorage();
    const tasksToRemove = tasks
         .filter(({checked}) => checked)
         .map(({id}) => id)

       const getUpdatedTasks = tasks.filter(({checked}) => !checked);
       setTasksInLocalStorage(getUpdatedTasks)
         tasksToRemove.forEach((taskToRemove) => {
            const elementToRemove = document.getElementById(taskToRemove)
            if(elementToRemove){
                document.getElementById("todo-list").removeChild(elementToRemove)

            }
         })
  // Atualiza o progresso das tarefas
  renderTaskProgressData(getUpdatedTasks);
}

const removeTask = (taskId) => {

    const tasks = getTaskLocalStorage();
   const getUpdatedTasks = tasks.filter(({id}) => parseInt(id) !== parseInt(taskId));
    setTasksInLocalStorage(getUpdatedTasks)
       
    document
    .getElementById("todo-list")
    .removeChild(document.getElementById(taskId));

     // Atualiza o progresso das tarefas
     renderTaskProgressData(getUpdatedTasks);
}

const onCheckboxClick = (event) => {
    const tasks = getTaskLocalStorage();

    const [id] = event.target.id.split('-')[1];
    const getUpdatedTasks = tasks.map((task) => {
        return parseInt(id) === parseInt(task.id) ? {...task, checked: event.target.checked} : task
        
    })
    setTasksInLocalStorage(getUpdatedTasks)

    // Atualiza o progresso das tarefas
    renderTaskProgressData(getUpdatedTasks);
}


const crateTaskListItem = (task, checkbox) => {
    const list = document.getElementById('todo-list');
    const toDo = document.createElement('li');

    const removeTaskButton = document.createElement('button');
    removeTaskButton.textContent = 'X';
    removeTaskButton.ariaLabel = 'Remover Tarefa';

    removeTaskButton.onclick = () => removeTask(task.id);
    


    toDo.id = task.id;
    toDo.appendChild(checkbox);
    list.appendChild(toDo);
    toDo.appendChild(removeTaskButton)

    return toDo;

}
const getcheckBoxInput =  ({id, description, checked}) => {
    const checkbox = document.createElement('input');
    const label = document.createElement('label');
    const wrapper = document.createElement('div');
    const checkboxId = `task-${id}`;

    checkbox.type = 'checkbox';
    checkbox.id = checkboxId
    checkbox.checked = checked || false;
    checkbox.addEventListener('change', onCheckboxClick)
    label.textContent = description;
    label.htmlFor = checkboxId;

    wrapper.className = 'checkbox-label-container';
    
    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);

    return wrapper


}


const getNewTaskId = () => {
    const tasks = getTaskLocalStorage()
    const lastId = tasks[tasks.length - 1]?.id;
    return lastId ? lastId + 1: 1  
    
}


const getNewTaskData = (event) => {
    const description = event.target.elements.description.value;
    const id = getNewTaskId();

    return {description, id}
}
const createTask = async (event) => {
    event.preventDefault();
    document.getElementById('save-task').setAttribute('disabled', true)
    const newTaskData = await createdTaskInfo(event);
    
    const {id, description} = newTaskData;

    const checkbox = getcheckBoxInput(newTaskData)
    const tasks = getTaskLocalStorage()

    crateTaskListItem(newTaskData, checkbox)
    const upadatedTasks = [...tasks, {id, description, checked: false}]
    setTasksInLocalStorage(upadatedTasks)
    document.getElementById('description').value = ''
    document.getElementById('save-task').removeAttribute('disabled', false)
    renderTaskProgressData(upadatedTasks)


}

window.onload = function(){
    const form = document.getElementById('create-todo-form');
    form.addEventListener('submit', createTask)
    const tasks = getTaskLocalStorage();

    tasks.forEach((task) => {
        const checkbox = getcheckBoxInput(task);
        const list = document.getElementById('todo-list');
        const toDo = document.createElement('li');
        const removeTaskButton = document.createElement('button');

    
        removeTaskButton.textContent = 'X';
        removeTaskButton.ariaLabel = 'Remover Tarefa';
        removeTaskButton.onclick = () => removeTask(task.id);
        // const button = document.createElement('button')
        toDo.id = task.id;
        toDo.appendChild(checkbox)
        toDo.appendChild(removeTaskButton)
        list.appendChild(toDo)
        
    })
  // Atualiza o progresso das tarefas
  renderTaskProgressData(tasks);
}