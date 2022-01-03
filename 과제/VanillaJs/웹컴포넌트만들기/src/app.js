class Component {
  $target;
  $state;
  constructor($target) {
    // Todo1 (참고): 생성시 target지정 및 setup(상태지정) & render함수 실행
    this.$target = $target;
    this.setup();
    this.render();
  }
  setup() {}
  template() {
    return "";
  }
  render() {
    // Todo2 (참고): 렌더는 각 컴포넌트 마다, 템플릿에 따라 진행하도록 함
    this.$target.innerHTML = this.template();
    this.setEvent(); // 이벤트핸들러 실행함수 위치가 어색
  }
  setEvent() {}
  setState(newState) {
    // Todo3 : state업데이트 후 render 실행 (모든 컴포넌트 동일)
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}

class App extends Component {
  setup() {
    // Todo4 : 초기 상태 지정
    this.$state = { items: ["item1", "item2"] };
  }
  template() {
    const { items } = this.$state;
    return `
    <ul>
    ${items.map((item) => `<li>${item}</li>`).join("")}
    </ul>
    <button>추가</button>
    `;
  }
  setEvent() {
    // Todo6 (이벤트 찾고 추가 이벤트함수 지정)
    this.$target.querySelector("button").addEventListener("click", () => {
      const { items } = this.$state;
      this.setState({ items: [...items, `item${items.length + 1}`] });
    });
  }
}

new App(document.querySelector("#todo-list"));
