import { HidePassword } from '@/icons/HidePassword';
import { Button } from '@/components/Button/Button';
import styles from '@/components/Form/Form.module.css';
import { useCallback, useRef, useState } from 'react';
import { ShowPassword } from '@/icons/ShowPassword';

const EMAIL_TESTS_DATA_MAP = new Map();

EMAIL_TESTS_DATA_MAP.set('regex', {
  message: 'Invalid email address',
  test: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
});

const PASSWORD_TESTS_DATA_MAP = new Map();

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

const initFormFieldStateMap = (formFieldDataMap) => {
  const formFieldStateMap = new Map();

  formFieldDataMap.forEach((_, key) => {
    formFieldStateMap.set(key, {
      passed: false,
      dirty: false
    });
  });

  return formFieldStateMap;
}

const validateFormField = (formFieldDataMap, password) => {
  const formFieldStateMap = new Map();

  formFieldDataMap.forEach((_, key) => {
    formFieldStateMap.set(key, {
      dirty: true,
      passed: formFieldDataMap.get(key).test(password),
    });
  })

  return formFieldStateMap;
}

const areAllTestsPassed = testsStateMap => Array.from(testsStateMap.entries())
  .every(([, value]) => value.passed);

const copyMap = (map) => {
  const newMap = new Map();

  map.forEach((value, key) => {
    newMap.set(key, { ...value });
  })

  return newMap;
};

export const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showsPassword, setShowsPassword] = useState(false);

  const emailTestsStateMapRef = useRef(
    initFormFieldStateMap(EMAIL_TESTS_DATA_MAP)
  );
  const [emailTestsStateMap, setEmailTestsStateMap] = useState(
    () => copyMap(emailTestsStateMapRef.current),
  );

  const passwordTestsStateMapRef = useRef(
    initFormFieldStateMap(PASSWORD_TESTS_DATA_MAP)
  )
  const [passwordTestsStateMap, setPasswordTestsStateMap] = useState(
    () => copyMap(passwordTestsStateMapRef.current),
  );

  const togglePassword = useCallback(() => {
    setShowsPassword((s) => !s);
  }, []);

  const handleEmailChange = (e) => {
    const email = e.target.value;

    setEmail(email);

    emailTestsStateMapRef.current = validateFormField(
      EMAIL_TESTS_DATA_MAP,
      email,
    );
  };

  const handlerEmailBlur = () => {
    setEmailTestsStateMap(copyMap(emailTestsStateMapRef.current));
  }

  const handlePasswordChange = (e) => {
    const password = e.target.value;

    setPassword(password);

    passwordTestsStateMapRef.current = validateFormField(
      PASSWORD_TESTS_DATA_MAP,
      password,
    );

    setPasswordTestsStateMap(copyMap(passwordTestsStateMapRef.current));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmailValid = areAllTestsPassed(emailTestsStateMapRef.current);
    const isPasswordValid = areAllTestsPassed(passwordTestsStateMapRef.current);

    if (isEmailValid && isPasswordValid) {
      console.log('Form submitted!');
    } else {
      console.log('Form has errors.');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.formHeading}>Sign Up</h1>

      <div className={styles.formGroup}>
        <label htmlFor="email" className="visually-hidden">
          Email
        </label>

        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          onBlur={handlerEmailBlur}
          required
        />

        {Array.from(emailTestsStateMap.entries()).map(([key, value]) => (
          value.dirty && (
            <p
              key={key}
              className={value.passed
                ? styles.formTestPassed
                : styles.formTestFailed}
            >
              {EMAIL_TESTS_DATA_MAP.get(key).message}
            </p>
          )
        ))}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password" className="visually-hidden">
          Password
        </label>

        <input
          type={showsPassword ? 'text' : 'password'}
          id="password"
          name="password"
          placeholder="Create a password"
          value={password}
          onChange={handlePasswordChange}
          required
        />

        <button
          type="button"
          className={styles.formShowHidePassword}
          onClick={togglePassword}
        >
          {showsPassword ? <ShowPassword /> : <HidePassword />}
        </button>

        {Array.from(passwordTestsStateMap.entries()).map(([key, value]) => (
          value.dirty && (
            <p
              key={key}
              className={value.passed
                ? styles.formTestPassed
                : styles.formTestFailed}
            >
              {PASSWORD_TESTS_DATA_MAP.get(key).message}
            </p>
          )
        ))}
      </div>

      <Button type="submit" className={styles.formSubmit}>
        Sign Up
      </Button>
    </form>
  );
};
