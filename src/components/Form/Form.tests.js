export const EMAIL_TESTS = new Map([
  ['regex', {
    message: 'Invalid email address',
    test: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  }]
]);

export const PASSWORD_TESTS = new Map([
  ['spaces', {
    message: 'No spaces',
    test: (password) => !/\s/.test(password),
  }],
  ['minLength', {
    message: '8 characters or more',
    test: (password) => password.length >= 8,
  }],
  ['maxLength', {
    message: '64 characters or less',
    test: (password) => password.length <= 64,
  }],
  ['cases', {
    message: 'Uppercase and lowercase letters',
    test: (password) => /[A-Z]/.test(password) && /[a-z]/.test(password),
  }],
  ['digits', {
    message: 'At least one digit',
    test: (password) => /\d/.test(password),
  }],
]);
