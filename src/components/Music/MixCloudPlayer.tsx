import React from "react";

const MixCloudPlayer = ({
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
      loading={loading}
      width={width}
      height={height}
      src={`https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2F${trackId}`}
      frameBorder="0"
    ></iframe>
  );
};

export default MixCloudPlayer;
