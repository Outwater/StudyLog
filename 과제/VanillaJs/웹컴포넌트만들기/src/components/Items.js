import Component from "../core/Component.js";
export default class Items extends Component {
  setup() {
    this.$state = { items: ["item1", "item2"] };
  }
  template() {
    //Todo1: 삭제기능구현
    const { items } = this.$state;
    return `
      <ul>
      ${items
        .map(
          (item, key) => `
        <li>
            ${item}
            <button class='deleteBtn' data-index="${key}">삭제</button>
        </li>
        `
        )
        .join("")}
      </ul>
      <button class="addBtn">추가</button>
      `;
  }
  setEvent() {
    // ToDo2: 이벤트 버블링을 이용하여 이벤트 처리하기
    this.$target.addEventListener("click", ({ target }) => {
      const { items } = this.$state;

      if (target.classList.contains("addBtn")) {
        this.setState({ items: [...items, `item${items.length + 1}`] });
      }

      if (target.classList.contains("deleteBtn")) {
        items.splice(target.dataset.index, 1);
        this.setState({ items });
      }
    });
  }
}
