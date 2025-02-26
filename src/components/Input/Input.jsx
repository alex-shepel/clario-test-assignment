import { memo, useCallback, useMemo, useState } from 'react';
import { ShowPassword } from '@/icons/ShowPassword';
import { HidePassword } from '@/icons/HidePassword';
import styles from '@/components/Input/Input.module.css';
import { areAllTestcasesPassed } from '@/helpers/areAllTestcasesPassed';

export const Input = memo( ({
  name,
  value,
  type = 'text',
  placeholder,
  onChange,
  onBlur,
  late = false,
  tests,
}) => {
  const [dirty, setDirty] = useState(false);
  const [showsValue, setShowsValue] = useState(false);

  const valid = useMemo(() => {
    return areAllTestcasesPassed(tests);
  }, [tests]);

  const toggleShowsValue = useCallback(() => {
    setShowsValue((s) => !s);
  }, []);

  const getType = () => {
    switch (type) {
      case 'password':
        return showsValue ? 'text' : 'password';
      default:
        return type;
    }
  };

  const getClassName = () => {
    if (!dirty) {
      return undefined;
    }

    return valid ? styles.valid : styles.invalid;
  };

  const handleChange = useCallback((e) => {
    onChange?.(e.target.value);

    if (!late) {
      setDirty(true);
    }
  }, [])

  const handleBlur = useCallback((e) => {
    onBlur?.(e.target.value);

    if (late) {
      setDirty(true);
    }
  }, [])

  return <div className={styles.wrapper}>
    <label htmlFor={name} className="visually-hidden">
      {name}
    </label>

    <input
      type={getType()}
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      className={getClassName()}
      required
    />

    {type === 'password' && <button
      type="button"
      className={styles.showHideButton}
      onClick={toggleShowsValue}
    >
      {showsValue ? <ShowPassword/> : <HidePassword/>}
    </button>}

    {dirty && <div className={styles.validation}>
      {Array.from(tests.entries()).map(([key, { message, passed }]) => {
        const shown = !late || !passed;

        return shown && (
          <p key={key} className={passed ? styles.valid : styles.invalid}>
            {message}
          </p>
        );
      })}
    </div>}
  </div>
});
