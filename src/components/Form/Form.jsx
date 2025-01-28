import { HidePassword } from '@/icons/HidePassword';
import { Button } from '@/components/Button/Button';
import styles from '@/components/Form/Form.module.css';
import { useCallback, useState } from 'react';
import { ShowPassword } from '@/icons/ShowPassword';

export const Form = () => {
  const [showsPassword, setShowsPassword] = useState(false);

  const togglePassword = useCallback(() => {
    setShowsPassword(s => !s);
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted!');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.formHeading}>Sign Up</h1>
      <div className={styles.formGroup}>
        <label htmlFor="email" className="visually-hidden">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password" className="visually-hidden">Password</label>
        <input
          type={showsPassword ? 'text' : 'password'}
          id="password"
          name="password"
          placeholder="Create a password"
          required
        />
        <button type='button' className={styles.hidePassword} onClick={togglePassword}>
          {showsPassword ? <ShowPassword/> : <HidePassword/>}
        </button>
      </div>
      <Button type="submit" className={styles.formSubmit}>Sign Up</Button>
    </form>
  );
}
