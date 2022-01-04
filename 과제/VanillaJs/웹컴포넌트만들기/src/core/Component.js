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
  //* render함수는 컴포넌트의 템플릿을 target에 넣어 렌더링하는 역할, 이후 작업은 mounted에서 처리
  render() {
    // this는 Component로 생성한 인스턴스(클래스들) ex. App, Items, ItemFilter, ...
    // console.log("component Render 실행", this);
    this.$target.innerHTML = this.template();
    this.mounted();
  }
  mounted() {}
  setEvent() {}

  //* setState는 기존의 state의 새로운 state를 추가하거나, 변경하고 render를 실행하는 함수
  // 이미 존재하는 property는 변경하고, 없다면 추가한다.
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    console.log("state변경: ", this.$state);
    this.render();
  }

  //* 컴포넌트의 이벤트 등록을 담당
  // this.$target: 이벤트가 바인딩 되는 상위요소
  // target : 이벤트가 발생한 요소 , 버블링 되어 올라가다가 $target에서 이벤트함수만나 실행
  // selector: 이벤트가 발생해야 하는 요소(달아주고 싶은 요소)

  // selector가 target이거나 target보다 상위요소이어야만 한다. -> target.closest(selector)
  // target.closest(s-)는 target을 포함하여 "상위에 존재하는 가장 가까운 selector"를 가져온다
  // target을 기준으로 하위요소에 원하는 요소(selector)가 존재할 경우, children으로 모든 요소를 찾는다.

  // 하위 컴포넌트(Items,Appender...)가 생성될 때, constructor > setEvent()내부 >  addEvent() 가 실행된다.
  // 즉 컴포넌트의 생성과 동시에, 해당 컴포넌트 최상위($target)에 event리스너가  등록된다.

  // 해당 이벤트리스너는 이벤트가 실행되는 시점에 동작한다.
  //* 추가Btn 클릭 > event버블링 > $target에 도착 > isTarget검사 > 이벤트함수 실행

  //* children항상 빈 값 나오는 것에 관한 이슈
  // https://github.com/JunilHwang/simple-component/issues/2
  // 사실상 target.cloest(selector)로 자신포함 상위요소에 해당하는 selector가 있는지로 isTarget을 확인 중
  // 결론은 이벤트가 실행되는 시점에 최상위인 컴포넌트의 $target에 이미 이벤트가 등록되어 있어 문제가 없다.
  addEvent(eventType, selector, callback) {
    const children = [...this.$target.querySelectorAll(selector)];
    // console.log(this.$target, selector, children);

    const isTarget = (target) => {
      // console.log(target, selector);
      // console.log("closest : ", target.closest(selector));
      return children.includes(target) || target.closest(selector);
    };

    this.$target.addEventListener(eventType, (event) => {
      if (!isTarget(event.target)) return false;
      callback(event);
    });
  }
}
