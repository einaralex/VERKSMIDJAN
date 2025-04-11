import React from "react";
import CollapsedWrap from "../Rows/CollapsedWrap";
import ExpandedWrap from "../Rows/ExpandedWrap";
import SoundCloudPlayer from "./SoundCloudPlayer";
import MixCloudPlayer from "./MixCloudPlayer";
// import styles from "./music.module.css";

function Iframes() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <MixCloudPlayer
        loading="eager"
        trackId="VERKSMI%25C3%2590JAN%2F%25C3%25BAtik%25C3%25B6ttur-feat-innikisa-radar-191024%2F"
      />
      <SoundCloudPlayer trackId="1933581902" />
      <SoundCloudPlayer trackId="1933586435" />
      <SoundCloudPlayer trackId="1534646428" />
    </div>
  );
}
export function MusicCollapsed() {
  return <CollapsedWrap>Music</CollapsedWrap>;
}

export function MusicExpanded() {
  return (
    <>
      <MusicCollapsed />
      <ExpandedWrap>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <MixCloudPlayer
            loading="eager"
            trackId="VERKSMI%25C3%2590JAN%2F%25C3%25BAtik%25C3%25B6ttur-feat-innikisa-radar-191024%2F"
          />
          <SoundCloudPlayer loading="eager" trackId="1933581902" />
          <SoundCloudPlayer trackId="1933586435" />
          <SoundCloudPlayer trackId="1534646428" />
        </div>
      </ExpandedWrap>
    </>
  );
}
