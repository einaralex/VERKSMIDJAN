import styles from "./header.module.css";
import Image from "next/image";
export function HeaderCollapsed() {
  return (
    <div className={styles.header}>
      <Image
        className={styles.logo}
        src="/verksmidjan-font-black-transparent.png"
        alt="Next.js logo"
        width={250}
        height={200}
        priority
      />
    </div>
  );
}

export function HeaderExpanded() {
  return (
    <>
      <HeaderCollapsed />
      {/* <div className={styles.content}>
        <h1 className={styles.headerTitle}>Content</h1>
      </div> */}
    </>
  );
}
