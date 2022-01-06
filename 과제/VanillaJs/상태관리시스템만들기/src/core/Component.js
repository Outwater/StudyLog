import { observable, observe } from "./observer.js";

export class Component {
  state;
  props;
  $el;

  constructor($el, props) {
    this.$el = $el;
    this.props = props;
    this.setup();
  }
  // setup은 상태지정
  setup() {
    // state를 관찰한다
    this.state = observable(this.initState());
    // state가 변경 시, 렌더링, 이벤트처리, 렌더이후실행함수(mounted)를 실행한다.
    observe(() => {
      this.render();
      this.setEvent();
      this.mounted();
    });
  }
  initState() {
    return {};
  }
  template() {
    return ``;
  }
  render() {
    this.$el.innerHTML = this.template();
  }
  setEvent() {}
  mounted() {}
}
