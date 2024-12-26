let task = [
    {id: 1 , description:'compra pão' , checked: false},
    {id: 2, description: 'passear com o cachorro', checked: false},
    {id: 3, description: 'fazer o almoço', checked: false }

]

window.onload = function(){
    task.forEach((task) => {
        const list = document.getElementById('todo-list');
        const toDo = document.createElement('li');

        toDo.textContent = task.description;

        list.appendChild(toDo)
    })
}