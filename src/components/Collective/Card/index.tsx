import Image from "next/image";
import styles from "./card.module.css";

const SocialLink = ({
  url,
  type,
}: {
  url: string;
  type: "instagram" | "soundcloud" | "ra";
}) => {
  if (!url) return null;
  return (
    <a href={url} className={styles.logoWrapper}>
      <Image
        src={`/icons/${type}-white.png`}
        alt={type}
        width={24}
        height={24}
        style={{ objectFit: "contain" }}
      />
    </a>
  );
};

export default function CollectiveCard({
  member,
}: {
  member: {
    name: string;
    aka: string;
    instagram: string;
    soundcloud: string;
    ra: string;
  };
}) {
  return (
    <div className={styles.card}>
      <h3>{member.name}</h3>
      <p className={styles.aka}>a.k.a. {member.aka}</p>
      <div className={styles.socialLinks}>
        <SocialLink url={member.instagram} type="instagram" />
        <SocialLink url={member.soundcloud} type="soundcloud" />
        <SocialLink url={member.ra} type="ra" />
      </div>
    </div>
  );
}
