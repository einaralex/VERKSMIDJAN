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
    aka: "Funktion Einar, Þrumuthrustur",
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
    soundcloud: "",
    ra: "",
  },
  {
    name: "Sara",
    aka: "Keisara",
    instagram: "https://www.instagram.com/stories/keisaramargret/",
    soundcloud: "https://soundcloud.com/kei_sara",
    ra: "https://ra.co/dj/keisara",
  },
];

export function CollectiveExpanded() {
  return (
    <>
      <CollectiveCollapsed />
      <ExpandedWrap>
        <div className={styles.grid}>
          {members.map((member) => (
            <Card key={member.name} member={member} />
          ))}
        </div>
      </ExpandedWrap>
    </>
  );
}
