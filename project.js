const form = document.querySelector('#workForm');
const workList = document.querySelector('.workContainer');
const deleteBtn = document.querySelector('.buttonDelete');
const filter = document.querySelector('#filter');
const workInput = document.querySelector('#work');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', getWorks)
    form.addEventListener('submit', addWork);
    workList.addEventListener('click', removeWork);
    deleteBtn.addEventListener('click', clearAll);
    filter.addEventListener('keyup', filterWork)
}

//getLocal
function getWorks() {
    let works;
    if(localStorage.getItem('works') === null){
        works = [];
    } else {
        works = JSON.parse(localStorage.getItem('works'));
    }
    works.forEach(function(work){
        const workGrid = document.createElement('div');
    workGrid.className = 'toDo';
    workList.appendChild(workGrid);

    const div = document.createElement('div');
    div.appendChild(document.createTextNode(work));
    workGrid.appendChild(div);

    const link = document.createElement('a');
    link.className = 'remove';
    link.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
    workGrid.appendChild(link);
    });
}

//add

function addWork(e) {
    if(workInput.value === '') {
        alert('Add a work');
    }

    const workGrid = document.createElement('div');
    workGrid.className = 'toDo';
    workList.appendChild(workGrid);

    const div = document.createElement('div');
    div.appendChild(document.createTextNode(workInput.value));
    workGrid.appendChild(div);

    const link = document.createElement('a');
    link.className = 'remove';
    link.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
    workGrid.appendChild(link);

    saveWorkInLocalStorage(workInput.value);

    workInput.value= '';

    e.preventDefault();
}

function saveWorkInLocalStorage(work) {
    let works;
    if(localStorage.getItem('works') === null){
        works = [];
    } else {
        works = JSON.parse(localStorage.getItem('works'));
    }
    works.push(work);

    localStorage.setItem('works', JSON.stringify(works));
}

//remove

function removeWork(e) {
    if(e.target.parentElement.classList.contains('remove'))
    {
        e.target.parentElement.parentElement.remove();

        delWorkFromLocalStorage(e.target.parentElement.parentElement);
    }
}

function delWorkFromLocalStorage(workItem){
    let works;
    if(localStorage.getItem('works') === null){
        works = [];
    } else {
        works = JSON.parse(localStorage.getItem('works'));
    }

    works.forEach(function(work, index){
        if(workItem.textContent === work){
            works.splice(index, 1);
        }
    });
    localStorage.setItem('works', JSON.stringify(works));
}

//clear all
function clearAll() {
    while(workList.firstChild) {
        workList.removeChild(workList.firstChild);
    }
}

function filterWork(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.toDo').forEach(function(work) {
        const item = work.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            work.style.display = 'grid';
        } else {
            work.style.display = 'none';
        }
    });
}