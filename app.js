const memoForm = document.getElementById("memo-form");
const memoInput = document.getElementById("memo-input");
const memoList = document.getElementById("memo-list");
const MEMOS_KEY = "memos";
let memos = [];

function saveMemos() {
  localStorage.setItem(MEMOS_KEY, JSON.stringify(memos));
}

function deleteMemo(event) {
  const li = event.target.parentElement;
  li.remove();
  memos = memos.filter((memo) => memo.id !== parseInt(li.dataset.id));
  saveMemos();
}

function editMemo(event) {
  const li = event.target.parentElement;
  const span = li.querySelector("span");
  const memoText = span.innerText;
  const editText = prompt("Edit memo", memoText);
  if (editText !== null) {
    span.innerText = editText;
    const editMemo = memos.find((memo) => memo.id === parseInt(li.dataset.id));
    editMemo.text = editText;
    saveMemos();
  }
}

function paintMemo(newMemo) {
    const div = document.createElement("div");
    div.classList.add("memo-box");
    div.dataset.id = newMemo.id;
    const span = document.createElement("span");
    span.innerText = newMemo.text;
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "🗑️DELETE";
    deleteButton.addEventListener("click", deleteMemo);
    const editButton = document.createElement("button");
    editButton.innerText = "✏️EDIT";
    editButton.addEventListener("click", editMemo);
    div.appendChild(span);
    div.appendChild(deleteButton);
    div.appendChild(editButton);
    memoList.appendChild(div);
  }  

function handleMemoSubmit(event) {
  event.preventDefault();
  const newMemo = memoInput.value;
  if (newMemo === "") return;
  memoInput.value = "";
  const newMemoObj = {
    text: newMemo,
    id: Date.now(),
  };
  memos.push(newMemoObj);
  paintMemo(newMemoObj);
  saveMemos();
}

memoForm.addEventListener("submit", handleMemoSubmit);

const savedMemos = localStorage.getItem(MEMOS_KEY);

if (savedMemos !== null) {
  memos = JSON.parse(savedMemos);
  memos.forEach(paintMemo);
}
