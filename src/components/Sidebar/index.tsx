import Image from "next/image";
import { useEffect, useRef } from "react";
import Cogwheels from "./Cogwheels";
import styles from "./sidebar.module.css";

export default function Sidebar() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/909.mp3");
    audioRef.current.preload = "auto";
    audioRef.current.load();
  }, []);

  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    void audio.play();
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
