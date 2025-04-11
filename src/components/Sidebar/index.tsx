import { useEffect, useState } from "react";
import styles from "./sidebar.module.css";
import Cogwheels from "./Cogwheels";
import Image from "next/image";

export default function Sidebar() {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // This code will only run on the client side
    setAudio(new Audio("/909.mp3"));
  }, []);

  const play = () => {
    if (audio) {
      audio.play();
    }
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <button className={styles.sidebarLogo} onClick={play}>
          <Image
            src="/verksmidjan-logo-black-transparent.png"
            alt="Verksmidjan Logo"
            width={50}
            height={50}
          />
        </button>

        <div className={styles.cogwheelsContainer}>
          <div className={styles.cogwheels}>
            <Cogwheels />
          </div>
        </div>
      </div>
    </div>
  );
}
