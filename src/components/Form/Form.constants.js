export const EMAIL_TESTS_DATA_MAP = new Map();

EMAIL_TESTS_DATA_MAP.set('regex', {
  message: 'Invalid email address',
  test: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
});

export const PASSWORD_TESTS_DATA_MAP = new Map();

PASSWORD_TESTS_DATA_MAP.set('spaces', {
  message: 'No spaces',
  test: (password) => !/\s/.test(password),
});
PASSWORD_TESTS_DATA_MAP.set('minLength', {
  message: '8 characters or more',
  test: (password) => password.length >= 8,
});
PASSWORD_TESTS_DATA_MAP.set('maxLength', {
  message: '64 characters or less',
  test: (password) => password.length <= 64,
});
PASSWORD_TESTS_DATA_MAP.set('cases', {
  message: 'Uppercase and lowercase letters',
  test: (password) => /[A-Z]/.test(password) && /[a-z]/.test(password),
});
PASSWORD_TESTS_DATA_MAP.set('digits', {
  message: 'At least one digit',
  test: (password) => /\d/.test(password),
});
