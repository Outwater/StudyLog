export default function TodoComments({ $target, initialState }) {
  const $element = document.createElement("div");
  $target.appendChild($element);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { selectedTodo, comments } = this.state;
    if (!selectedTodo || !comments) {
      $element.innerHTML = "";
      return;
    }

    $element.innerHTML = `
    <h1>${selectedTodo.text}</h1>
    ${comments.length === 0 ? "댓글이 없습니다" : ""}
    <ul>
      ${comments.map((comment) => `<li>${comment.content}</li>`).join("")}
    </ul>     
    `;
  };
  this.render();
}
