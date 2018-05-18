const form = document.querySelector('#workForm');
const workList = document.querySelector('.workContainer');
const deleteBtn = document.querySelector('.buttonDelete');
const filter = document.querySelector('#filter');
const workInput = document.querySelector('#work');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
    form.addEventListener('submit', addWork);
    workList.addEventListener('click', removeWork);
    deleteBtn.addEventListener('click', clearAll);
    filter.addEventListener('keyup', filterWork)
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

    

    workInput.value= '';

    e.preventDefault();
}

//remove

function removeWork(e) {
    if(e.target.parentElement.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
    }
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