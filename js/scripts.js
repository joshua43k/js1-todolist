let submitBtn = document.querySelector('#submitBtn');
let todoContainer = document.querySelector('#todo_items');
let doneContainer = document.querySelector('#done_items');
let toggleClass = document.querySelector('#show_done');
let header = document.querySelector('#header');
let todolist = [];
let doneList = [];
let i = 0;

function Todoitems(div, text, removeBtn, doneBtn, editBtn, removeSpan, doneSpan, editSpan) {
  this.div = div;
  this.text = text;
  this.removeBtn = removeBtn;
  this.doneBtn = doneBtn;
  this.editBtn = editBtn;
  this.removeSpan = removeSpan;
  this.doneSpan = doneSpan;
  this.editSpan = editSpan;
}

submitBtn.addEventListener('click', e => {
  e.preventDefault();
  let userNote = document.forms.noteForm.noteInput.value;
  let newTodo = new Todoitems(document.createElement('div'), document.createElement('h2'), document.createElement('button'), document.createElement('button'), document.createElement('button'), document.createElement('span'), document.createElement('span'), document.createElement('span'));
  createTodo(userNote,newTodo);
  document.forms.noteForm.reset();
  todolist.push(newTodo);
});

toggleClass.addEventListener('click', e => {
  switch (i) {
    case 0:
    header.textContent = 'Done list';
    todoContainer.classList.add('hide');
    doneContainer.classList.remove('hide');
    i++
      break;
    case 1:
    header.textContent = 'Todo list';
    doneContainer.classList.add('hide');
    todoContainer.classList.remove('hide');
    i--;
      break;
    default:
    i = 0
  }
});



function createTodo(todo,items) {
  let div = items.div,
    text = items.text,
    removeBtn = items.removeBtn,
    doneBtn = items.doneBtn,
    editBtn = items.editBtn,
    removeSpan = items.removeSpan,
    doneSpan = items.doneSpan,
    editSpan = items.editSpan;
  todoContainer.appendChild(div);
  div.appendChild(text);
  div.classList.add('listed-item');
  text.textContent = todo;
  div.appendChild(removeBtn);
  removeBtn.appendChild(removeSpan);
  removeSpan.classList.add('glyphicon','glyphicon-remove');
  removeBtn.addEventListener('click', e => {
    todoContainer.removeChild(div);
  });
  div.appendChild(doneBtn);
  doneBtn.appendChild(doneSpan);
  doneSpan.classList.add('glyphicon','glyphicon-ok');
  doneBtn.addEventListener('click', e => {
    todoContainer.removeChild(div);
    swapDone(todo,items);
  });
  div.appendChild(editBtn);
  editBtn.appendChild(editSpan);
  editSpan.classList.add('glyphicon','glyphicon-pencil');
};

function swapDone(todo,items) {
  let div = items.div,
    text = items.text,
    removeBtn = items.removeBtn,
    doneBtn = items.doneBtn,
    editBtn = items.editBtn,
    removeSpan = items.removeSpan,
    doneSpan = items.doneSpan,
    editSpan = items.editSpan;
  doneContainer.appendChild(div);
  div.appendChild(text);
  div.classList.add('listed-item');
  text.textContent = todo;
  div.appendChild(removeBtn);
  removeBtn.appendChild(removeSpan);
  removeSpan.classList.add('glyphicon','glyphicon-remove');
  removeBtn.addEventListener('click', e => {
    todoContainer.removeChild(div);
  });
  div.appendChild(doneBtn);
  doneBtn.appendChild(doneSpan);
  doneSpan.classList.add('glyphicon','glyphicon-play');
  doneBtn.addEventListener('click', e => {
    doneContainer.removeChild(div);
    createTodo(todo,items);
  });
  div.appendChild(editBtn);
  editBtn.appendChild(editSpan);
  editSpan.classList.add('glyphicon','glyphicon-edit');
}
