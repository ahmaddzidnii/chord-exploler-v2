"use client";

import Image from "next/image";
import dynamic from "next/dynamic";

import { useSongsId } from "@/hooks/use-songs-id";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// const YoutubePlayer = dynamic(() => import("react-player"), {
//   loading: () => <p>Loading...</p>,
//   ssr: false,
// });

const song = {
  id: "1",
  slug: "string",
  songs_title: "Bukan Untukku",
  artist: [
    {
      artist_id: "1",
      artist_name: "Tiara Andini",
    },
  ],
  cover_image:
    "https://lh3.googleusercontent.com/V5pfw5qK5lmmgxVUhjRGl18IjmB3JlFx6gzYWpxewW4q4fMUVynYXPwJZXE58p0cJGQlMsUbcPxQ9ik",
  youtube_url: "https://youtu.be/G_qF1eVhLVQ?si=VRvEO_ekVNdUCdMi",
  release_year: 2024,
  songs_key: "F,F#",
  album: "Single",
  publisher: "Universal Music Indonesia",
  is_draft: false,
  created_at: "2022-02-22T00:00:00.000Z",
  updated_at: "2022-02-22T00:00:00.000Z",
};

export default function SongsIdPage() {
  const songsId = useSongsId();
  return (
    <div className="flex h-full gap-x-5 overflow-hidden">
      <div className="w-80 shrink-0 space-y-5 overflow-y-auto">
        <div>
          <h1 className="text-xl font-bold">{song.songs_title}</h1>
          <p className="text-sm text-muted-foreground">
            {song.artist.map((a) => a.artist_name).join(", ")}
          </p>
          <p className="text-sm text-muted-foreground">{song.songs_key}</p>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-md">
          <Image fill alt={song.songs_title} src={song.cover_image} />
        </div>
        <div>
          <h2 className="text-lg font-bold">Music video:</h2>
          <div className="relative aspect-video overflow-hidden rounded-md">
            {/* <YoutubePlayer
              width="100%"
              height="100%"
              url={song.youtube_url}
              controls
            /> */}
          </div>
        </div>
      </div>
      <div className="w-full overflow-y-auto">
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
