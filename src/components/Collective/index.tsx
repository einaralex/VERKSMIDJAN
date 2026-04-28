import CollapsedWrap from "../Rows/CollapsedWrap";
import ExpandedWrap from "../Rows/ExpandedWrap";
import Card from "./Card";
import styles from "./collective.module.css";

export function CollectiveCollapsed() {
  return <CollapsedWrap>Collective</CollapsedWrap>;
}

const members = [
  {
    name: "Einar",
    aka: "Funktion Einar",
    instagram: "https://www.instagram.com/einar.aiff/",
    soundcloud: "https://soundcloud.com/funktioneinar",
    ra: "https://ra.co/dj/funktioneinar",
  },
  {
    name: "Guido",
    aka: "2 Peace",
    instagram: "https://www.instagram.com/2peacewav/",
    soundcloud: "https://soundcloud.com/2peacewav",
    ra: "",
  },
  {
    name: "Haraldur",
    aka: "Útiköttur",
    instagram: "https://www.instagram.com/utikottur/",
    soundcloud: "https://soundcloud.com/ravtonlist",
    ra: "",
  },
  {
    name: "Ingveldur",
    aka: "Innikisa",
    instagram: "",
    soundcloud: "https://soundcloud.com/innikisa",
    ra: "",
  },
  {
    name: "Sara",
    aka: "Keisara",
    instagram: "https://www.instagram.com/stories/keisaramargret/",
    soundcloud: "https://soundcloud.com/kei_sara",
    ra: "https://ra.co/dj/keisara",
  },
  {
    name: "Sveinn Helgi",
    aka: "SHH!",
    instagram: "https://www.instagram.com/1sv1nn/",
    soundcloud: "",
    ra: "",
  },
];

export function CollectiveExpanded() {
  return (
    <>
      <CollectiveCollapsed />
      <ExpandedWrap>
        <div className={styles.about}>
          <div className={styles.aboutCol}>
            <span className={styles.lang}>EN</span>
            <p>
              Verksmiðjan is an Icelandic music collective and independent
              record label based in Reykavík. We occasionally host events to
              showcase the finest of Icelandic underground dance and techno
              music.
            </p>
          </div>
          <div className={styles.aboutCol}>
            <span className={styles.lang}>IS</span>
            <p>
              Verksmiðjan er tónlistarsamsteypa og sjálfstæð plötuútgáfa. Við
              höldum öðru hverju jaðartónlistarviðburði með áherslum á teknó og
              danstónlist.
            </p>
          </div>
        </div>
        <div className={styles.grid}>
          {members.map((member) => (
            <Card key={member.name} member={member} />
          ))}
        </div>
      </ExpandedWrap>
    </>
  );
}
