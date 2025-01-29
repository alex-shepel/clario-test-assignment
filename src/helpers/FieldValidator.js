export class FieldValidator {
  tests;

  constructor(tests) {
    this.tests = tests;
  }

  getInitialState() {
    const state = new Map();

    this.tests.keys().forEach(key => {
      state.set(key, {
        passed: false,
        dirty: false
      });
    });

    return state;
  }

  getUpdatedState(value) {
    const state = new Map();

    this.tests.forEach(({ test }, key) => {
      state.set(key, {
        dirty: true,
        passed: test(value),
      });
    })

    return state;
  }

  isDirty(state) {
    const values = Array.from(state.values());

    return values.some(value => value.dirty)
  }

  areAllPassed(state) {
    const values = Array.from(state.values());

    return values.every(value => !value.dirty || value.passed)
  }
}
