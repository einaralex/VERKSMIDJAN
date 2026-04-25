import Image from "next/image";
import Link from "next/link";
import CollapsedWrap from "../Rows/CollapsedWrap";
import ExpandedWrap from "../Rows/ExpandedWrap";
import releases from "./data.json";
import styles from "./releases.module.css";

export function ReleasesCollapsed() {
  return <CollapsedWrap>Releases</CollapsedWrap>;
}

export function ReleasesExpanded() {
  return (
    <>
      <ReleasesCollapsed />
      <ExpandedWrap>
        <div className={styles.coverGrid}>
          {releases.map((release) => (
            <Link
              key={release.id}
              href={`/${release.id}`}
              className={styles.coverItem}
            >
              <Image
                className={styles.coverImage}
                src={release.cover}
                alt={`${release.artist} – ${release.album}`}
                fill
                sizes="250px"
              />
            </Link>
          ))}
        </div>
      </ExpandedWrap>
    </>
  );
}
