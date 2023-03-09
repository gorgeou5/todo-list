// 각각 dom 조작을 위해 변수에 담음
const toDo = document.querySelector("#todo-input");
const addButton = document.querySelector("#submit");
const toDoList = document.querySelector("#todo-list"); //ol

// 로컬 저장소에 저장된 값 가져와서 담음
const savedTodoList = JSON.parse(localStorage.getItem("saved-items"));

// add todo append todo-box
function addTodo(storageData) {
  // storageData는 매개변수
  let todoContent = toDo.value;
  if (storageData?.contents) {
    todoContent = storageData.contents; //재할당이 가능하기 때문에
  }

  const item = document.createElement("li"); // li
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox"); //checkbox 설정
  const removeButton = document.createElement("button"); // 삭제
  const text = document.createElement("span"); // 내용
  if (todoContent.length > 0) {
    removeButton.textContent = "X";
    text.textContent = todoContent;
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
  saveTodo();
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
  saveTodo();
}

//checkBox check
function complete(e) {
  const completeTodo = e.target.nextSibling;
  if (e.target.checked) {
    completeTodo.classList.add("complete");
  } else {
    completeTodo.classList.remove("complete");
  }
}

// 각 버튼마다 이벤트와 함수
addButton.addEventListener("click", addTodo);
toDo.addEventListener("keypress", addTodoByEnter);
toDoList.addEventListener("change", saveTodo);

// save todolist => localstrage 저장
function saveTodo() {
  const saveItems = [];
  for (let i = 0; i < toDoList.children.length; i++) {
    const todoItem = {
      contents: toDoList.children[i].querySelector("span").textContent,
      complete: toDoList.children[i].querySelector("input").checked,
    };
    saveItems.push(todoItem);
  }
  // local storage 에 저장시 활용하려면 JSON.stringify 로 저장해야 한다
  localStorage.setItem("saved-items", JSON.stringify(saveItems));
}

// savedTodoList 값이 있을 때 addTodo 그리고 complete 값을 계속 유지할 수 있도록 => 그리고 saveTodo
if (savedTodoList) {
  for (let i = 0; i < savedTodoList.length; i++) {
    addTodo(savedTodoList[i]);
    if (savedTodoList[i].complete) {
      toDoList.children[i]
        .querySelector("input")
        .setAttribute("checked", "checked");
      toDoList.children[i].querySelector("span").classList.add("complete");
    }
    saveTodo();
  }
}
