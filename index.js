let task = [
    {id: 1 , description:'compra pão' , checked: false},
    {id: 2, description: 'passear com o cachorro', checked: false},
    {id: 3, description: 'fazer o almoço', checked: false }

]


const crateTaskListItem = (task, checkbox) => {
    const list = document.getElementById('todo-list');
    const toDo = document.createElement('li');

    toDo.id = task.id;
    toDo.appendChild(checkbox);
    list.appendChild(toDo);

    return toDo;

}
const getcheckBoxInput =  ({id, description, checked}) => {
    const checkbox = document.createElement('input');
    const label = document.createElement('label');
    const wrapper = document.createElement('div');
    const checkboxId = `task ${id}`;

    checkbox.type = 'checkbox';
    checkbox.id = checkboxId
    checkbox.checked = checked || false;

    label.textContent = description;
    label.htmlFor = checkboxId;

    wrapper.className = 'checkbox-label-container';
    
    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);

    return wrapper


}


const getNewTaskId = () => {
    const lastId = task[task.length - 1]?.id;
    return lastId ? lastId + 1: 1 
}


const getNewTaskData = (event) => {
    const description = event.target.elements.description.value;
    const id = getNewTaskId();

    return {description, id}
}
const createTask = (event) => {
    event.preventDefault();
    const newTaskData = getNewTaskData(event);
    
    const {id, description} = newTaskData;

    const checkbox = getcheckBoxInput(newTaskData)

    crateTaskListItem(newTaskData, checkbox)
    task = [...task, {id, description, checked: false}]
}

window.onload = function(){
    const form = document.getElementById('create-todo-form');
    form.addEventListener('submit', createTask)
    task.forEach((task) => {
        const checkbox = getcheckBoxInput(task);
        const list = document.getElementById('todo-list');
        const toDo = document.createElement('li');
        // const button = document.createElement('button')
        toDo.id = task.id;
        toDo.appendChild(checkbox)
        // toDo.appendChild(button)
        list.appendChild(toDo)
    })
}