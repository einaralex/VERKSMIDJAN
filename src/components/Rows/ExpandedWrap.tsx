import { ReactNode } from "react";
import styles from "./rows.module.css";

export default function ExpandedWrap({ children }: { children: ReactNode }) {
  return <div className={styles.expandedWrap}>{children}</div>;
}
