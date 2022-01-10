import { observable, observe } from "./observer.js";

export const createStore = (reducer) => {
  const state = observable(reducer());

  const frozenState = {};
  Object.keys(state).forEach((key) => {
    Object.defineProperty(frozenState, key, {
      get() {
        return state[key];
      },
    });
  });

  const dispatch = (action) => {
    const newState = reducer(state, action);

    for (const [key, value] of Object.entries(newState)) {
      if (!state[key]) continue;
      state[key] = value;
    }
  };

  const getState = () => {
    return frozenState;
  };

  const subscribe = observe; // subscribe는 observe와 같은 역할

  return { subscribe, dispatch, getState };
};
