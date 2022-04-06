export default function TodoList({ $target, initialState, onClick }) {
  const $todoList = document.createElement("div");

  $target.appendChild($todoList);
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (Array.isArray(this.state)) {
      $todoList.innerHTML = `
    <ul>
      ${this.state
        .map((todo) => `<li data-id=${todo.id}>${todo.text}</li>`)
        .join("")}
    </ul>
    `;

      $todoList.querySelectorAll("li").forEach(($li) => {
        $li.addEventListener("click", (e) => {
          onClick(Number(e.target.dataset.id));
        });
      });
    }
  };

  this.render();
}
