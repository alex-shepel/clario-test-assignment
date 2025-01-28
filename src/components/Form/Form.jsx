import { HidePassword } from '@/icons/HidePassword';
import { Button } from '@/components/Button/Button';
import styles from '@/components/Form/Form.module.css';

export const Form = () => {
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
        <div className={styles.hidePassword}>
          <HidePassword/>
        </div>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password" className="visually-hidden">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Create a password"
          required
        />
        <div className={styles.hidePassword}>
          <HidePassword/>
        </div>
      </div>
      <Button type="submit" className={styles.formSubmit}>Sign Up</Button>
    </form>
  );
}
