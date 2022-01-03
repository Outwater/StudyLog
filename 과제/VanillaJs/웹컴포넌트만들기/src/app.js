//* 고쳐야할 점
//Todo 1. setState는 state의 형식을 받아, 기존의 state를 대체하도록 해야함
// -> setState(), onClickAdd내 인자형식 반영 완료
//Todo 2. render() 함수 내에서 innerHTML에 백틱문자열을 이용하여 html삽입해보기
// render 함수 반영완료
//Todo 3. 최초에 render()함수 1번 실행해주어 초기값 반영해주기
// 초기실행 반영완료

const $ul = document.querySelector("#todo-list");
const $addBtn = document.querySelector("#add-btn");

let state = {
  items: ["item1", "item2", "item3"],
  oters: ["1", "2"],
};

function render() {
  const { items } = state;
  $ul.innerHTML = `
    <ul>
     ${items.map((item) => `<li>${item}</lit>`).join("")}
    </ul>
  `;
}

function setState(newState) {
  console.log("현재 state)", state);
  console.log("추가될 State,", newState);
  state = { ...state, ...newState };
  console.log("변경된 State: ", state);
  render();
}

function onclickAdd() {
  const { items } = state;
  const addedItem = `item${items.length + 1}`;
  const addedItems = [...items, addedItem];
  setState({ items: addedItems });
}

render();
$addBtn.addEventListener("click", onclickAdd);
