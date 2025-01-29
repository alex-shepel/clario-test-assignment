export const areAllTestcasesPassed = (tests) => {
  return Array
    .from(tests.values())
    .every(test => test.passed);
}
