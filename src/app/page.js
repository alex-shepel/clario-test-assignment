'use client';
import styles from './page.module.css';

export default function Page() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted!');
  };

  return (
    <main className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.formHeading}>Sign Up</h1>
        <div className={styles.formGroup}>
          <label htmlFor="email" className='visually-hidden'>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className='visually-hidden'>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Create a password"
            required
          />
        </div>
        <button type="submit" className={styles.formSubmit}>
          Sign Up
        </button>
      </form>
    </main>
  );
}
