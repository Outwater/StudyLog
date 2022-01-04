import Component from "../core/Component.js";
export default class Items extends Component {
  // TODO1. 기능추가
  //* 1. 필터기능  2. 토글기능  3. 추가등록기능
  get filteredItems() {
    const { isFilter, items } = this.$state;
    // 0: 전체보기, 1:활성보기 , 2:비활성보기
    return items.filter(
      ({ active }) =>
        (isFilter === 1 && active) ||
        (isFilter === 2 && !active) ||
        isFilter === 0
    );
  }
  setup() {
    this.$state = {
      items: [
        { seq: 1, contents: "item1", active: false },
        { seq: 2, contents: "item2", active: true },
      ],
      isFilter: 0,
    };
  }
  template() {
    const { items } = this.$state;
    return `
    <header>
        <input id='item-input' placeholder="아이템 내용입력" />
        <button class="addBtn">추가</button>
    </header>
      <ul>
      ${this.filteredItems
        .map(
          (item, key) => `
        <li>
            ${item.contents}
            <button class='toggleBtn' 
              style = "color:${item.active ? "#09F" : "#F09"}"
              data-index="${key}">
            ${item.active ? `활성상태` : `비활성상태`}</button>
            <button class='deleteBtn' data-index="${key}">삭제</button>
        </li>
        `
        )
        .join("")}
      </ul>
      <button class="filterBtn" data-is-filter="0">전체보기</button>
      <button class="filterBtn" data-is-filter="1">활성 보기</button>
      <button class="filterBtn" data-is-filter="2">비활성 보기</button>
      `;
  }
  setEvent() {
    this.addEvent("click", ".addBtn", ({ target }) => {
      const { items } = this.$state;
      const $input = document.querySelector("#item-input");
      const newItems = [
        ...items,
        {
          seq: items[items.length - 1].seq + 1,
          contents: $input.value,
          active: true,
        },
      ];
      this.setState({ items: newItems });
    });
    this.addEvent("keyup", "#item-input", ({ key, target }) => {
      if (key !== "Enter") return;
      const { items } = this.$state;
      const seq = items[items.length - 1].seq + 1;
      const contents = target.value;
      const active = true;

      const newItems = [...items, { seq, contents, active }];
      this.setState({ items: newItems });
    });

    this.addEvent("click", ".deleteBtn", ({ target }) => {
      const { items } = this.$state;
      items.splice(target.dataset.index, 1);
      this.setState({ items });
    });
    this.addEvent("click", ".toggleBtn", ({ target }) => {
      const { items } = this.$state;
      const toggledItems = items.map((item, idx) =>
        idx === Number(target.dataset.index)
          ? { ...item, active: !item.active }
          : item
      );
      this.setState({ items: toggledItems });
    });

    this.addEvent("click", ".filterBtn", ({ target }) => {
      const newIsFilter = Number(target.dataset.isFilter);
      this.setState({ isFilter: newIsFilter });
    });
    // allBtn -> state.isFilter:0
    // actiiveBtn -> state.isFilter :1
    // inActioveBtn -> state.isFilter : 2
    // this.addEvent("click", "");
  }
}
