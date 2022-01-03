const $ul = document.querySelector("#todo-list");
const $addBtn = document.querySelector("#add-btn");

let state = {
  items: ["item1", "item2", "item3"],
};

function render() {
  $ul.innerHTML = "";
  state.items.map((item) => {
    const $li = document.createElement("li");
    $li.textContent = item;
    $ul.append($li);
  });
}

function setState(newState) {
  state.items = newState;
  render();
}

function onclickAdd() {
  const addedItem = `item${state.items.length + 1}`;
  const addedState = [...state.items, addedItem];
  setState(addedState);
}

$addBtn.addEventListener("click", onclickAdd);
