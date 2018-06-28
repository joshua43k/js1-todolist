let todoList = [];
let doneList = [];
let submitBtn = document.querySelector('#submitBtn');
let todoContainer = document.querySelector('#todo_items');
let doneContainer = document.querySelector('#done_items');
let toggleClass = document.querySelector('#show_done');
let header = document.querySelector('#header');
let listValue = 0;

function Todoitems(div,h2,removeBtn,okBtn,editBtn) { //Don't forget to camelCase, even if you are capitalizing the first letter. -RJH
  this.div = div;
  this.h2 = h2;
  this.removeBtn = removeBtn;
  this.okBtn = okBtn;
  this.editBtn = editBtn;
}//Excellent use of constructor to build a robust instance of something that is reusable. Great functional programming! -RJH

// function getSaved() {
//
// };
//
// function setSaved() {
//   localStorage.setItem('todoList', JSON.stringify(todoList));
//   localStorage.setItem('doneList', JSON.stringify(doneList));
// }

submitBtn.addEventListener('click', e => {
  e.preventDefault();
  let userNote = document.forms.noteForm.noteInput.value;
  createTodo(todoContainer,userNote,todoList); //Nice functional programming! -RJH
  document.forms.noteForm.reset();
});

toggleClass.addEventListener('click', e => {
  switch (listValue) { //EXCELLENT use of the switch! -RJH
    case 0:
    header.textContent = 'Done';
    todoContainer.classList.add('hide');
    doneContainer.classList.remove('hide');
    listValue++;
      break;
    case 1:
    header.textContent = 'To-Do';
    doneContainer.classList.add('hide');
    todoContainer.classList.remove('hide');
    listValue--; //Great work using incs and decs -RJH
      break;
    default:
    listValue = 0;
  }
});



function createTodo(con,todo,arr) {
  let container = con,
    text = todo,
    listArr = arr, //Why are you initializing variables for the args? You can just use the args like variables -RJH
    div = document.createElement('div'),
    h2 = document.createElement('h2'),
    removeBtn = document.createElement('button'),
    okBtn = document.createElement('button'),
    editBtn = document.createElement('button'),
    newTodo = new Todoitems(div,h2,removeBtn,okBtn,editBtn);
  container.appendChild(div);
  div.classList.add('listed-item');
  div.appendChild(h2);
  h2.textContent = text;
  div.appendChild(removeBtn);
  removeBtn.classList.add('glyphicon','glyphicon-remove');
  removeBtn.addEventListener('click', e => {
    e.preventDefault();
    container.removeChild(e.target.parentNode); //EXCELLENT use of logic here! -RJH
  });
  div.appendChild(okBtn);
  okBtn.classList.add('glyphicon','glyphicon-ok');
  okBtn.addEventListener('click', e => {
    e.preventDefault();
    container.removeChild(div);
    if(container === todoContainer){ //Very elegant and well done. I would recommend a ternary here, but other than that, great work! -RJH
      createTodo(doneContainer,h2.innerText,doneList);
    } else if(container === doneContainer){
      createTodo(todoContainer,h2.innerText,todoList);
    };
  });
  div.appendChild(editBtn);
  editBtn.classList.add('glyphicon','glyphicon-edit');
  editBtn.addEventListener('click', e => {
    e.preventDefault();
    editFun(div,h2,removeBtn,okBtn,editBtn);
  });
listArr.push(newTodo);
};


function editFun(div,h2,btn1,btn2,btn3) { //This function could probably be refactored into smaller, more modular functions -RJH
  h2.classList.add('hide');  
  btn1.classList.add('hide');
  btn2.classList.add('hide');
  btn3.classList.add('hide');
  let form = document.createElement('form'),
    input = document.createElement('input'),
    saveBtn = document.createElement('button'),
    stopBtn = document.createElement('button');
  div.appendChild(form);
  form.classList.add('note-form');
  form.setAttribute('name','newForm');
  form.appendChild(input);
  input.classList.add('note-input');
  input.setAttribute('placeholder','New note');
  input.setAttribute('name','newNote');
  form.appendChild(saveBtn);
  saveBtn.classList.add('glyphicon','glyphicon-floppy-saved');
  saveBtn.setAttribute('name','submit');
  saveBtn.addEventListener('click', e => {
    e.preventDefault();
    let saveInput = input.value;
    h2.textContent = saveInput;
    div.removeChild(form);
    h2.classList.remove('hide');
    btn1.classList.remove('hide');
    btn2.classList.remove('hide');
    btn3.classList.remove('hide');
  });
  form.appendChild(stopBtn);
  stopBtn.classList.add('glyphicon','glyphicon-floppy-remove');
  stopBtn.addEventListener('click', e => {
    e.preventDefault();
    div.removeChild(form);
    h2.classList.remove('hide');
    btn1.classList.remove('hide');
    btn2.classList.remove('hide');
    btn3.classList.remove('hide');
  });
};
