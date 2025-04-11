import styles from "./header.module.css";

export function HeaderCollapsed() {
  return (
    <div className={styles.header}>
      <h1 className={styles.headerTitle}>Header</h1>
    </div>
  );
}

export function HeaderExpanded() {
  return (
    <>
      <HeaderCollapsed />
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Content</h1>
      </div>
    </>
  );
}
