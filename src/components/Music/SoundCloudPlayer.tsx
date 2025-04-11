import React from "react";

const SoundCloudPlayer = ({
  trackId,
  height = "120px",
  width = "100%",
  loading = "lazy",
}: {
  trackId: string;
  height?: string;
  width?: string;
  loading?: "eager" | "lazy";
}) => {
  return (
    <iframe
      width={width}
      height={height}
      loading={loading}
      scrolling="no"
      frameBorder="no"
      allow="autoplay"
      src={`https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/${encodeURIComponent(
        trackId
      )}&color=%23190d0e&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`}
    ></iframe>
  );
};

export default SoundCloudPlayer;
