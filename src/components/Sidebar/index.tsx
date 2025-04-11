import styles from "./sidebar.module.css";
import Cogwheels from "./Cogwheels";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <h1 className={styles.sidebarTitle}>V</h1>
        <nav>
          <ul className={styles.sidebarNav}>
            <li className={styles.sidebarNavItem}></li>
          </ul>
        </nav>
        <div className={styles.cogwheelsContainer}>
          <div className={styles.cogwheels}>
            <Cogwheels />
          </div>
        </div>
      </div>
    </div>
  );
}
