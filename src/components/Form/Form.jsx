import { Button } from '@/components/Button/Button';
import styles from '@/components/Form/Form.module.css';
import { useCallback, useRef, useState } from 'react';
import { EMAIL_TESTS, PASSWORD_TESTS } from '@/components/Form/Form.tests';
import { FieldValidator } from '@/helpers/FieldValidator';
import { Input } from '@/components/Input/Input';
import { areAllTestcasesPassed } from '@/helpers/areAllTestcasesPassed';

export const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // handles validation, uses non-reactive variables
  const emailValidator = useRef(new FieldValidator(EMAIL_TESTS));
  const passwordValidator = useRef(new FieldValidator(PASSWORD_TESTS));

  // handles errors rendering, uses reactive variables
  const [
    emailValidationState,
    setEmailValidationState
  ]= useState(() => emailValidator.current.state);
  const [
    passwordValidationState,
    setPasswordValidationState,
  ] = useState(() => passwordValidator.current.state);

  const handleEmailChange = useCallback((email) => {
    setEmail(email);
    emailValidator.current.update(email);
  }, [emailValidator]);

  const handlerEmailBlur = useCallback(() => {
    setEmailValidationState(emailValidator.current.state);
  }, [emailValidator])

  const handlePasswordChange = useCallback((password) => {
    setPassword(password);
    passwordValidator.current.update(password);
    setPasswordValidationState(passwordValidator.current.state);
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const isEmailValid = areAllTestcasesPassed(
      emailValidator.current.state
    );
    const isPasswordValid = areAllTestcasesPassed(
      passwordValidator.current.state
    );

    if (isEmailValid && isPasswordValid) {
      console.log('Form submitted!');
    } else {
      console.log('Form has errors.');
    }
  }, []);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.formHeading}>Sign Up</h1>

      <div className={styles.formInput}>
        <Input
          name="email"
          type="email"
          placeholder="Email"
          late
          value={email}
          onChange={handleEmailChange}
          onBlur={handlerEmailBlur}
          tests={emailValidationState}
        />
      </div>

      <div className={styles.formInput}>
        <Input
          name="password"
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={handlePasswordChange}
          tests={passwordValidationState}
        />
      </div>

      <div className={styles.formSubmit}>
        <Button type="submit">Sign Up</Button>
      </div>
    </form>
  );
};
