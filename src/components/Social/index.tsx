import CollapsedWrap from "../Rows/CollapsedWrap";
import ExpandedWrap from "../Rows/ExpandedWrap";
import { ThanksCard, SocialCard } from "./Card";
import styles from "./social.module.css";
export function SocialCollapsed() {
  return <CollapsedWrap>Socials</CollapsedWrap>;
}

const socials = [
  {
    id: "telegram",
    title: "Group Chat",
    url: "https://t.me/verksmidjan",
  },
  {
    id: "instagram",
    title: "Instagram",
    url: "https://www.instagram.com/rave.rvk/",
  },
  {
    id: "bandcamp",
    title: "Bandcamp",
    url: "https://verk.bandcamp.com/",
  },
  {
    id: "soundcloud",
    title: "SoundCloud",
    url: "https://soundcloud.com/verksmidjan",
  },
  {
    id: "ra",
    title: "Resident Advisor",
    url: "https://ra.co/promoters/149533",
  },
  {
    id: "facebook",
    title: "Facebook",
    url: "https://www.facebook.com/rave.rvk",
  },
  {
    id: "media",
    title: "Media Kit",
    url: "https://drive.google.com/drive/folders/18cdhfrswT_O0avGscaU8XRQibLygoZtq?usp=sharing",
  },
];

const specialThanks = [
  {
    who: "Fokoff_",
    for: "Graphic Design",
    url: "https://www.instagram.com/fokoff_/",
  },
  {
    who: "Raggivald",
    for: "Visuals",
    url: "https://www.instagram.com/raggivald/",
  },
];

export function SocialExpanded() {
  return (
    <>
      <SocialCollapsed />
      <ExpandedWrap>
        <div className={styles.grid}>
          {socials.map((social) => (
            <SocialCard key={social.title} social={social} />
          ))}
        </div>
        <h2 className={styles.specialThanks}>Special Thanks</h2>
        <div className={styles.grid}>
          {specialThanks.map((thanks) => (
            <ThanksCard key={thanks.who} thanks={thanks} />
          ))}
        </div>
      </ExpandedWrap>
    </>
  );
}
