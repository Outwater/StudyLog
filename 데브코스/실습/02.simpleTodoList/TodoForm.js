function TodoForm({ $target, onSubmit }) {
  const $todoForm = document.createElement("form");

  $target.appendChild($todoForm);

  let isInit = false;

  this.render = () => {
    $todoForm.innerHTML = `
    <input id="todoInput"></input><button>추가</button>
    `;

    if (!isInit) {
      $todoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const $input = $todoForm.querySelector("#todoInput");
        const text = $input.value;

        if (text.length > 1) {
          onSubmit(text);
          $input.value = "";
          $input.focus();
        }
      });
      isInit = true;
    }
  };
  this.render();
}
