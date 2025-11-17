import Image from "next/image";
import styles from "./card.module.css";

export function SocialCard({
  social,
}: {
  social: {
    id: string;
    title: string;
    url: string;
  };
}) {
  return (
    <a href={social.url} target="_blank" className={styles.card}>
      <h3>{social.title}</h3>
      <div className={styles.logoWrapper}>
        <Image
          src={`/icons/${social.id}-white.png`}
          alt={social.title}
          width={24}
          height={24}
          style={{ objectFit: "contain" }}
        />
      </div>
    </a>
  );
}

export function ThanksCard({
  thanks,
}: {
  thanks: {
    who: string;
    for: string;
    url: string;
  };
}) {
  return (
    <a href={thanks.url} className={styles.card}>
      <h3>{thanks.who}</h3>
      <p>{thanks.for}</p>
    </a>
  );
}
