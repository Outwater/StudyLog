import { createStore } from "./core/Store.js";

const initState = { a: 10, b: 20 };

export const store = createStore((state = initState, action = {}) => {
  switch (action.type) {
    case `SET_A`:
      return { ...state, a: action.payload };
    case `SET_B`:
      return { ...state, b: action.payload };
    default:
      return state;
  }
});

// reducer에서 사용할 action을 정의한다.
export const setA = (payload) => ({ type: "SET_A", payload });
export const setB = (payload) => ({ type: "SET_B", payload });

// dispatch에서 사용될 type들을 정의해준다.
// export const SET_A = 'SET_A';
// export const SET_B = 'SET_B';
