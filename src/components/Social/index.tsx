import CollapsedWrap from "../Rows/CollapsedWrap";
import ExpandedWrap from "../Rows/ExpandedWrap";
import styles from "./social.module.css";
import Image from "next/image";
export function SocialCollapsed() {
  return <CollapsedWrap>Socials</CollapsedWrap>;
}

export function SocialExpanded() {
  return (
    <>
      <SocialCollapsed />
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
