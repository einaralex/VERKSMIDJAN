import { ReactNode } from "react";
import styles from "./rows.module.css";

export default function CollapsedWrap({ children }: { children: ReactNode }) {
  return <div className={styles.collapsedWrap}>{children}</div>;
}
