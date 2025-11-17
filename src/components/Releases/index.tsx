import CollapsedWrap from "../Rows/CollapsedWrap";
import ExpandedWrap from "../Rows/ExpandedWrap";

export function ReleasesCollapsed() {
  return <CollapsedWrap>Releases</CollapsedWrap>;
}

export function ReleasesExpanded() {
  return (
    <>
      <ReleasesCollapsed />
      <ExpandedWrap>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <iframe
            style={{ border: "0", width: "350px", height: "687px" }}
            src="https://bandcamp.com/EmbeddedPlayer/album=3132847855/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/campaign=verk/"
            seamless
          >
            <a href="https://utikottur.bandcamp.com/album/g-abl-bestaskinn">
              Gæðablóð &amp; Bestaskinn by Útiköttur
            </a>
          </iframe>
        </div>
      </ExpandedWrap>
    </>
  );
}
