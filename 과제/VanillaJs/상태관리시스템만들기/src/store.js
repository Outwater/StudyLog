import { observable } from "./core/observer.js";

export const store = {
  state: observable({
    a: 10,
    b: 20,
  }),

  setState(newState) {
    for (const [key, value] of Object.entries(newState)) {
      //newState의 key가 현재 state에 존재하지 않다면, 추가하지않고 무시
      if (!this.state[key]) continue;
      this.state[key] = value;
    }
  },
};
