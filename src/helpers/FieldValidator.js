export class FieldValidator {
  tests;

  constructor(tests) {
    this.tests = tests;
  }

  getInitialState() {
    const state = new Map();

    this.tests.keys().forEach(key => {
      state.set(key, false);
    });

    return state;
  }

  getUpdatedState(value) {
    const state = new Map();

    this.tests.forEach(({ test }, key) => {
      state.set(key, test(value));
    })

    return state;
  }

  areAllPassed(state) {
    return Array.from(state.values()).includes(false);
  }
}
