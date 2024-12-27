let task = [
    {id: 1 , description:'compra pão' , checked: false},
    {id: 2, description: 'passear com o cachorro', checked: false},
    {id: 3, description: 'fazer o almoço', checked: false }

]

const getcheckBoxInput =  ({id, description, checked}) => {
    const checkbox = document.createElement('input');
    const label = document.createElement('label');
    const wrapper = document.createElement('div');
    const checkboxId = `task ${id}`;

    checkbox.type = 'checkbox';
    checkbox.id = checkboxId
    checkbox.checked = checked;

    label.textContent = description;
    label.htmlFor = checkboxId;

    wrapper.className = 'checkbox-label-container';
    
    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);

    return wrapper


}

window.onload = function(){
    task.forEach((task) => {
        const checkbox = getcheckBoxInput(task);
        const list = document.getElementById('todo-list');
        const toDo = document.createElement('li');

        toDo.id = task.id;
        toDo.appendChild(checkbox)

        list.appendChild(toDo)
    })
}