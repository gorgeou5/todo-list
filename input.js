const toDo = document.querySelector("#todo-input");
const addButton = document.querySelector("#submit");
const toDoList = document.querySelector("#todo-list"); //ol
// 각각 dom 조작을 위해 변수에 담음

// add todo append todo-box
function addTodo() {
  const item = document.createElement("li"); // li
  const newTodo = toDo.value;
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox"); //checkbox 설정
  const removeButton = document.createElement("button"); // 삭제
  const text = document.createElement("span"); // 내용
  if (newTodo.length > 0) {
    removeButton.textContent = "X";
    text.textContent = newTodo;
    toDoList.append(item);
    item.append(checkBox);
    item.append(text);
    item.append(removeButton);
    reset();
  } else {
    alert("할 일을 입력해주세요!");
  }
  removeButton.addEventListener("click", deleteItem);
  checkBox.addEventListener("change", complete);
}

// enter 눌러도 todo 값 추가
function addTodoByEnter(e) {
  if (e.key == "Enter") {
    addTodo();
    e.preventDefault();
  }
}

//reset
function reset() {
  toDo.value = "";
}

// remove
function deleteItem(e) {
  const removeTodo = e.target.parentElement;
  removeTodo.remove();
}

//checkBox check
function complete(e) {
  const completeTodo = e.target.nextSibling;
  if (e.target.checked) {
    completeTodo.style.color = "#4F647E";
  } else {
    completeTodo.style.color = "#000000";
  }
}

// 각 버튼마다 이벤트와 함수
addButton.addEventListener("click", addTodo);
toDo.addEventListener("keypress", addTodoByEnter);
