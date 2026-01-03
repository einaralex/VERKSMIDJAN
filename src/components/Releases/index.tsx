import CollapsedWrap from "../Rows/CollapsedWrap";
import ExpandedWrap from "../Rows/ExpandedWrap";
import Image from "next/image";
import styles from "./releases.module.css";
export function ReleasesCollapsed() {
  return <CollapsedWrap>Releases</CollapsedWrap>;
}

export function ReleasesExpanded() {
  return (
    <>
      <ReleasesCollapsed />
      <ExpandedWrap>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <iframe
            style={{ border: "0", width: "600px", height: "373px" }}
            src="https://bandcamp.com/EmbeddedPlayer/album=3132847855/size=large/bgcol=ffffff/linkcol=0687f5/artwork=small/transparent=true/campaign=verk/"
            seamless
          >
            <a href="https://utikottur.bandcamp.com/album/g-abl-bestaskinn">
              Gæðablóð &amp; Bestaskinn by Útiköttur
            </a>
          </iframe>
          <div className={styles.streamButtons}>
            <a
              href="https://soundcloud.com/verksmidjan/sets/gaedablod-og-bestaskinn"
              target="_blank"
            >
              <button>
                <Image
                  src="/icons/soundcloud.png"
                  alt="SoundCloud"
                  width={24}
                  height={24}
                />
                <span>SoundCloud</span>
              </button>
            </a>
            <a
              href="https://music.apple.com/us/artist/utik%C3%B6ttur/1853193367"
              target="_blank"
            >
              <button>
                <Image
                  src="/icons/stream-apple.svg"
                  alt="Apple Music"
                  width={24}
                  height={24}
                />
                <span>Apple Music</span>
              </button>
            </a>
            <a href="https://tidal.com/album/474154918" target="_blank">
              <button>
                <Image
                  src="/icons/stream-tidal.svg"
                  alt="Tidal"
                  width={24}
                  height={24}
                />
                <span>Tidal</span>
              </button>
            </a>
            <a
              href="https://open.spotify.com/album/6ZrD39qY2mRnLGjzWM3vus?si=69957024ea674a57"
              target="_blank"
            >
              <button>
                <Image
                  src="/icons/stream-spotify.svg"
                  alt="Spotify"
                  width={24}
                  height={24}
                />
                <span>Spotify</span>
              </button>
            </a>
          </div>
        </div>
      </ExpandedWrap>
    </>
  );
}
