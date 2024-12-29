import { z } from "zod";
import { Hono } from "hono";
import { UserRole } from "@prisma/client";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";

import { prisma } from "@/lib/prisma";

import { ApiResponse } from "@/lib/response-api";
import { songInfoSchema } from "../schema/song-info";

const app = new Hono()
  .get("/", async (c) => {
    const songs = await prisma?.songs.findMany({
      include: {
        artists: {
          select: {
            artist_id: true,
            artist: {
              select: {
                artist_name: true,
                artist_image: true,
              },
            },
          },
        },
      },
    });

    const data = songs?.map((song) => {
      return {
        ...song,
        artists: song.artists.map((artist) => ({
          artist_id: artist.artist_id,
          artist_name: artist.artist.artist_name,
          artist_image: artist.artist.artist_image,
        })),
      };
    });

    return c.json(ApiResponse.success(data, "Songs fetched successfully"));
  })
  .get("/count", async (c) => {
    const count = await prisma?.songs.count();
    return c.json(
      ApiResponse.success(count, "Songs count fetched successfully"),
    );
  })
  .post("/", verifyAuth(), zValidator("json", songInfoSchema), async (c) => {
    const {
      artists,
      album,
      coverImage,
      key,
      publisher,
      releaseYear,
      title,
      youtubeUrl,
    } = c.req.valid("json");

    const auth = c.get("authUser");

    const role = auth?.token?.role as UserRole;

    if (!auth?.session || role !== "ADMIN") {
      return c.json(ApiResponse.error("Unauthorized"), 401);
    }

    const slug = title.toLowerCase().replace(/ /g, "-");

    const song = await prisma?.songs.create({
      data: {
        songs_title: title,
        cover_image: coverImage,
        songs_key: key,
        publisher: publisher,
        release_year: parseInt(releaseYear),
        youtube_url: youtubeUrl,
        album,
        slug: slug,
      },
    });

    return c.json(ApiResponse.success(song, "Song created successfully"));
  });

export default app;
