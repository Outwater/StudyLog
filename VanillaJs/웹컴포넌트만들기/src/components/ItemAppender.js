import Component from "../core/Component.js";

export default class ItemAppender extends Component {
  template() {
    return `<input class='appender' type="text" placeholder="아이템 내용입력" />
      <button class="addBtn">추가</button>`;
  }
  setEvent() {
    const { addItem } = this.$props;
    this.addEvent("keyup", ".appender", ({ key, target }) => {
      if (key !== "Enter") return;
      console.log(target);
      target.focus();
      addItem(target.value);
    });

    this.addEvent("click", ".addBtn", () => {
      const $input = document.querySelector(".appender");
      addItem($input.value);
    });
  }

  mounted() {
    const $input = document.querySelector(".appender");
    $input.focus();
  }
}
