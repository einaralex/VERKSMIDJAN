import releases from "@/components/Releases/data.json";
import redirects from "@/data/redirects.json";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import RedirectClient from "./RedirectClient";
import styles from "./release.module.css";

function findRelease(id: string) {
  return releases.find((r) => r.id === id || r.slugs.includes(id));
}

function findRedirect(id: string) {
  return redirects.find((r) => r.slug === id);
}

export function generateStaticParams() {
  const releaseParams = releases.flatMap((release) => [
    { id: release.id },
    ...release.slugs.map((slug) => ({ id: slug })),
  ]);
  const redirectParams = redirects.map((r) => ({ id: r.slug }));
  return [...releaseParams, ...redirectParams];
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return params.then(({ id }) => {
    const ext = findRedirect(id);
    if (ext) {
      return {
        title: "Redirecting...",
        other: { "http-equiv": "refresh", content: `0;url=${ext.url}` },
      };
    }
    const release = findRelease(id);
    if (!release) return { title: "Release Not Found" };
    return {
      title: `${release.artist} – ${release.album} | VERKSMIÐJAN`,
      description: `Listen to ${release.album} by ${release.artist}. Available on all major streaming platforms.`,
      openGraph: {
        title: `${release.artist} – ${release.album}`,
        description: `Listen to ${release.album} by ${release.artist}. Available on all major streaming platforms.`,
        images: [
          {
            url: release.cover,
            width: 1200,
            height: 1200,
            alt: `${release.artist} – ${release.album}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${release.artist} – ${release.album} | VERKSMIÐJAN`,
        description: `Listen to ${release.album} by ${release.artist}. Available on all major streaming platforms.`,
        images: [release.cover],
      },
    };
  });
}

const streamServices = [
  { key: "bandcamp", label: "Bandcamp", icon: "/icons/bandcamp-white.png" },
  {
    key: "soundcloud",
    label: "SoundCloud",
    icon: "/icons/soundcloud-white.png",
  },
  { key: "youtube", label: "YouTube", icon: "/icons/stream-youtube-white.svg" },
  { key: "apple", label: "Apple Music", icon: "/icons/stream-apple-white.svg" },
  { key: "tidal", label: "Tidal", icon: "/icons/stream-tidal-white.svg" },
  { key: "spotify", label: "Spotify", icon: "/icons/stream-spotify-white.svg" },
  {
    key: "discogs",
    label: "Vinyl Release (Discogs)",
    icon: "/icons/discogs-white.svg",
  },
] as const;

export default async function ReleasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const ext = findRedirect(id);
  if (ext) {
    return <RedirectClient url={ext.url} />;
  }

  const release = findRelease(id);

  if (!release) {
    notFound();
  }

  const activeLinks = streamServices.filter(
    (s) => release.links[s.key as keyof typeof release.links],
  );

  return (
    <div className={styles.page}>
      <Link href="/releases" className={styles.backLink}>
        ← Back
      </Link>

      <div className={styles.cover}>
        <Image
          className={styles.coverImage}
          src={release.cover}
          alt={`${release.artist} – ${release.album}`}
          fill
          sizes="300px"
          priority
        />
      </div>

      <div className={styles.info}>
        <h1 className={styles.artist}>{release.artist}</h1>
        <p className={styles.albumTitle}>
          {release.album} ({release.year})
        </p>
      </div>

      {release.bandcampAlbumId && (
        <iframe
          className={styles.embed}
          src={`https://bandcamp.com/EmbeddedPlayer/album=${release.bandcampAlbumId}/size=large/bgcol=333333/linkcol=e99708/tracklist=false/artwork=none/transparent=true/`}
          allow="encrypted-media"
          seamless
        ></iframe>
      )}

      {activeLinks.length > 0 && (
        <div className={styles.links}>
          {activeLinks.map((service) => (
            <a
              key={service.key}
              href={release.links[service.key as keyof typeof release.links]}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkButton}
            >
              <Image
                className={styles.linkIcon}
                src={service.icon}
                alt={service.label}
                width={28}
                height={28}
              />
              <span>{service.label}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
