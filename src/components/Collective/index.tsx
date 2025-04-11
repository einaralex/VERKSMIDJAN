import CollapsedWrap from "../Rows/CollapsedWrap";
import ExpandedWrap from "../Rows/ExpandedWrap";
import styles from "./collective.module.css";
import Image from "next/image";
export function CollectiveCollapsed() {
  return <CollapsedWrap>Collective</CollapsedWrap>;
}

export function CollectiveExpanded() {
  return (
    <>
      <CollectiveCollapsed />
      <ExpandedWrap>
        <p>Grjót hörð tónlist og góð skemmtun.</p>
        <Image
          className={styles.logo}
          src="/verksmidjan-font-black-transparent.png"
          alt="Next.js logo"
          width={250}
          height={200}
          priority
        />
      </ExpandedWrap>
    </>
  );
}
