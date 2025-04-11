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
      {/* <HeaderCollapsed /> */}
      <div className={styles.content}>
        <Image
          className={styles.visual}
          src={"/verksmidjan-visual.gif"}
          alt="Grjót hörð tónlist og góð skemmtun."
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
    </>
  );
}
