export const areAllTestsPassed = (state) => Array
  .from(state.entries())
  .every(([, value]) => value.passed)
