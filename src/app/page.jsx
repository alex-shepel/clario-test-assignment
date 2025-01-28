'use client';
import { Form } from '@/components/Form/Form';
import styles from './page.module.css';

export default function Page() {
  return (
    <main className={styles.page}>
      <Form />
    </main>
  );
}
