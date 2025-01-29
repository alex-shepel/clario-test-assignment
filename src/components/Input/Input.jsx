import { useCallback, useMemo, useState } from 'react';
import { ShowPassword } from '@/icons/ShowPassword';
import { HidePassword } from '@/icons/HidePassword';
import { PASSWORD_TESTS } from '@/components/Form/Form.constants';
import styles from '@/components/Input/Input.module.css';

export const Input = ({
  name,
  value,
  placeholder,
  type,
  onChange,
  onBlur,
  isValid,
  tests,
  isLate,
}) => {
  const [dirty, setDirty] = useState(false);
  const [showsValue, setShowsValue] = useState(true);

  const toggleShowsValue = useCallback(() => {
    setShowsValue((s) => !s);
  }, []);

  const actualType = useMemo(() => {
    switch (type) {
      case 'password':
        return showsValue ? 'text' : 'password';
      default:
        return type;
    }
  }, [type])

  const className = useMemo(() => {
    if (!dirty) {
      return undefined;
    }

    return isValid ? styles.valid : styles.invalid;
  }, [])

  const handleChange = useCallback((e) => {
    onChange(e);

    if (!isLate) {
      setDirty(true);
    }
  }, [])

  const handleBlur = useCallback((e) => {
    onBlur(e);

    if (isLate) {
      setDirty(true);
    }
  }, [])

  return <div className={styles.formGroup}>
    <label htmlFor={name} className="visually-hidden">
      {name}
    </label>

    <input
      type={actualType}
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      className={className}
      required
    />

    <button
      type="button"
      className={styles.formShowHidePassword}
      onClick={toggleShowsValue}
    >
      {showsValue ? <ShowPassword /> : <HidePassword />}
    </button>

    <div className={styles.formValidation}>
      {Array.from(tests.entries()).map(([key, value]) => (
        value.dirty && (isLate || !value.passed) && (
          <p
            key={key}
            className={value.passed ? styles.valid : styles.invalid}
          >
            {PASSWORD_TESTS.get(key).message}
          </p>
        )
      ))}
    </div>
  </div>
}
