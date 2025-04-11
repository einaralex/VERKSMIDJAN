import styles from "./sidebar.module.css";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <h1 className={styles.sidebarTitle}>Sidebar</h1>
      <nav>
        <ul className={styles.sidebarNav}>
          <li className={styles.sidebarNavItem}>Link 1</li>
          <li className={styles.sidebarNavItem}>Link 2</li>
          <li className={styles.sidebarNavItem}>Link 3</li>
        </ul>
      </nav>
    </div>
  );
}
