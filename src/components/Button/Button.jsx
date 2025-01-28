import styles from '@/components/Button/Button.module.css';

export const Button = ({
  type='button',
  onClick,
  children,
}) => (
  <button type={type} className={styles.button} onClick={onClick}>
    {children}
  </button>
)
