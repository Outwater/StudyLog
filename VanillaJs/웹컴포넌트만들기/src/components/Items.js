import Component from "../core/Component.js";
export default class Items extends Component {
  template() {
    const { filteredItems } = this.$props;
    return `
      <ul>
      ${filteredItems
        .map(
          (item) => `
        <li data-seq="${item.seq}">
            ${item.contents}
            <button class='toggleBtn' style = "color:${
              item.active ? "#09F" : "#F09"
            }"> ${item.active ? `활성상태` : `비활성상태`}
            </button>
            <button class='deleteBtn'>삭제</button>
            
        </li>
        `
        )
        .join("")}
      </ul>
      `;
  }
  setEvent() {
    const { deleteItem, toggleItem } = this.$props;
    this.addEvent("click", ".deleteBtn", ({ target }) => {
      deleteItem(Number(target.closest("[data-seq]").dataset.seq));
    });
    this.addEvent("click", ".toggleBtn", ({ target }) => {
      toggleItem(Number(target.closest("[data-seq]").dataset.seq));
    });
  }
}
