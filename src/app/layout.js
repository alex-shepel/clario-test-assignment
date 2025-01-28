import { Inter } from 'next/font/google';
import './reset.css';
import styles from './layout.module.css';

const inter = Inter({
  subsets: ['latin'],
})

export const metadata = {
  title: "Clario Test Assignment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className={styles.layout}>
        {children}
      </body>
    </html>
  );
}
