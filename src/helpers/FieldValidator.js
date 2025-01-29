export class FieldValidator {
  _state;

  constructor(tests) {
    const entries = [...tests.entries()];

    this._state = new Map(
      entries.map(([key, value]) => ([key, {
        ...value,
        passed: false,
      }]))
    );
  }

  update(value) {
    this._state.forEach((testcase) => {
      testcase.passed = testcase.test(value);
    })
  }

  get state() {
    return new Map(
      [...this._state.entries()]
        .map(([key, value]) => ([key, { ...value }]))
    );
  }
}
