import { Button } from '@/components/Button/Button';
import styles from '@/components/Form/Form.module.css';
import { useRef, useState } from 'react';
import { EMAIL_TESTS, PASSWORD_TESTS } from '@/components/Form/Form.constants';
import { FieldValidator } from '@/helpers/FieldValidator';
import { useDraftableState } from '@/hooks/useDraftableState';
import { Input } from '@/components/Input/Input';

export const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailValidator = useRef(new FieldValidator(EMAIL_TESTS));
  const passwordValidator = useRef(new FieldValidator(PASSWORD_TESTS));

  const {
    state: emailValidationState,
    stateDraft: emailValidationDraft,
    saveDraft: saveEmailValidationDraft,
  } = useDraftableState(emailValidator.current.getInitialState());

  const [
    passwordValidationState,
    setPasswordValidationState,
  ] = useState(passwordValidator.current.getInitialState());

  const handleEmailChange = (e) => {
    const email = e.target.value;

    setEmail(email);

    emailValidationDraft.current = (
      emailValidator.current.getUpdatedState(email)
    );
  };

  const handlerEmailBlur = () => {
    saveEmailValidationDraft();
  }

  const handlePasswordChange = (e) => {
    const password = e.target.value;

    setPassword(password);

    setPasswordValidationState(
      passwordValidator.current.getUpdatedState(password)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmailValid = emailValidator.current.areAllPassed(
      emailValidationDraft.current
    );
    const isPasswordValid = passwordValidator.current.areAllPassed(
      passwordValidationState
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

      <Input
        name="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
        onBlur={handlerEmailBlur}
        type="email"
        isLate
        isValid={emailValidator.current.areAllPassed(emailValidationState)}
        tests={emailValidationState}
      />

      <Input
        name="password"
        placeholder="Create a password"
        value={password}
        onChange={handlePasswordChange}
        type="password"
        isValid={passwordValidator.current.areAllPassed(passwordValidationState)}
        tests={passwordValidationState}
      />

      <div className={styles.formSubmit}>
        <Button type="submit">Sign Up</Button>
      </div>
    </form>
  );
};
