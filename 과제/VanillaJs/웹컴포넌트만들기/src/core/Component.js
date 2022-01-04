export default class Component {
  $target;
  $state;
  $props;
  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.setup();
    this.setEvent();
    this.render();
  }
  setup() {}
  template() {
    return "";
  }
  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }
  mounted() {}
  setEvent() {}
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    console.log(this.$state);
    this.render();
  }

  //ToDo3. 이벤트버블링 추상화
  addEvent(eventType, selector, callback) {
    const children = [...this.$target.querySelectorAll(selector)];
    // 하위의 모든 해당 셀렉터의 요소들을 가져온다.
    // selector에 명시한 것 보다 더 하위 요소가 선택되는 경우가 있을 땐 closest를 이용하여 처리한다.

    const isTarget = (target) => {
      return children.includes(target) || target.closest(selector);
    };

    this.$target.addEventListener(eventType, (event) => {
      if (!isTarget(event.target)) return false;
      callback(event);
    });
  }
}
