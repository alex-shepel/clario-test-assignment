import { HidePassword } from '@/icons/HidePassword';
import { Button } from '@/components/Button/Button';
import styles from '@/components/Form/Form.module.css';
import { useCallback, useRef, useState } from 'react';
import { ShowPassword } from '@/icons/ShowPassword';
import { EMAIL_TESTS, PASSWORD_TESTS } from '@/components/Form/Form.constants';
import { FieldValidator } from '@/helpers/FieldValidator';
import { useDraftableState } from '@/hooks/useDraftableState';

export const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showsPassword, setShowsPassword] = useState(false);

  const emailValidator = useRef(new FieldValidator(EMAIL_TESTS));
  const passwordValidator = useRef(new FieldValidator(PASSWORD_TESTS));

  const {
    state: emailValidationState,
    stateDraft: emailValidationDraft,
    applyDraft: applyEmailValidationDraft,
  } = useDraftableState(emailValidator.current.getInitialState());

  const {
    state: passwordValidationState,
    stateDraft: passwordValidationDraft,
    applyDraft: applyPasswordValidationDraft,
  } = useDraftableState(passwordValidator.current.getInitialState());

  const togglePassword = useCallback(() => {
    setShowsPassword((s) => !s);
  }, []);

  const handleEmailChange = (e) => {
    const email = e.target.value;

    setEmail(email);

    emailValidationDraft.current = emailValidator.current.validate(email);
  };

  const handlerEmailBlur = () => {
    applyEmailValidationDraft();
  }

  const handlePasswordChange = (e) => {
    const password = e.target.value;

    setPassword(password);

    passwordValidationDraft.current = passwordValidator.current.validate(password);

    applyPasswordValidationDraft();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    applyEmailValidationDraft();
    applyPasswordValidationDraft();

    const isEmailValid = emailValidator.current.areAllPassed(
      emailValidationDraft.current
    );
    const isPasswordValid = passwordValidator.current.areAllPassed(
      passwordValidationDraft.current
    );

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

        {Array.from(emailValidationState.entries()).map(([key, value]) => (
          value.dirty && !value.passed && (
            <p key={key} className={styles.formTestFailed}>
              {EMAIL_TESTS.get(key).message}
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

        {Array.from(passwordValidationState.entries()).map(([key, value]) => (
          value.dirty && (
            <p
              key={key}
              className={value.passed
                ? styles.formTestPassed
                : styles.formTestFailed}
            >
              {PASSWORD_TESTS.get(key).message}
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
