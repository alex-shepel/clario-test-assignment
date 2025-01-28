import styles from './layout.module.css';

export const metadata = {
  title: "Clario Test Assignment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={styles.layout}>
        {children}
      </body>
    </html>
  );
}
