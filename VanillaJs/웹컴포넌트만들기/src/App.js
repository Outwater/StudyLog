import Component from "./core/Component.js";
import ItemAppender from "./components/ItemAppender.js";
import Items from "./components/Items.js";
import ItemFilter from "./components/ItemFilter.js";
export default class App extends Component {
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
    return `
    <header data-component="item-appender"></header>
    <main data-component="items"></main>
    <footer data-component="item-filter"></footer>
    `;
  }
  mounted() {
    const { addItem, filteredItems, deleteItem, toggleItem, filterItem } = this;
    const $itemAppender = this.$target.querySelector(
      '[data-component="item-appender"]'
    );
    const $items = this.$target.querySelector('[data-component="items"]');
    const $itemFilter = this.$target.querySelector(
      '[data-component="item-filter"]'
    );
    //* props로 상태변경 메서드들을 <props객체!!>로 전달
    // 하나의 객체에서 사용하는 메소드를 넘겨줄 bind를 사용하여 this를 변경하거나,
    // 다음과 같이 새로운 함수를 만들어줘야 한다.
    // ex) { addItem: contents => addItem(contents) }
    new ItemAppender($itemAppender, { addItem: addItem.bind(this) });
    new Items($items, {
      filteredItems,
      deleteItem: deleteItem.bind(this),
      toggleItem: toggleItem.bind(this),
    });
    new ItemFilter($itemFilter, { filterItem: filterItem.bind(this) });
  }
  get filteredItems() {
    const { items, isFilter } = this.$state;
    return items.filter(
      ({ active }) =>
        isFilter === 0 ||
        (isFilter === 1 && active) ||
        (isFilter === 2 && !active)
    );
  }
  //* contents를 인자로 받는다.
  addItem(contents) {
    const { items } = this.$state;
    const seq = Math.max(0, ...items.map((item) => item.seq)) + 1;
    const active = true;
    //* state 인자 타입 확인! {items: [...] }
    this.setState({ items: [...items, { seq, contents, active }] });
  }
  deleteItem(seq) {
    //* items를 수정한다면, 복사해서 수정해야한다.
    const items = [...this.$state.items];
    const delIdx = items.findIndex((item) => item.seq === seq);
    items.splice(delIdx, 1);
    this.setState({ items });
  }
  toggleItem(seq) {
    const items = [...this.$state.items];
    const index = items.findIndex((item) => item.seq === seq);
    items[index].active = !items[index].active;
    this.setState({ items });
  }
  filterItem(isFilter) {
    this.setState({ isFilter });
  }
}
