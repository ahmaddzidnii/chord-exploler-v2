import { z } from "zod";

import { isValidYouTubeUrl } from "@/lib/validation/validation-url-youtube";

export const songInfoSchema = z.object({
  title: z
    .string({
      required_error: "Title is required.",
    })
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .refine((value) => {
      const regex = /^[^\d]*$/;
      return regex.test(value);
    }, "Name not be a number."),
  artists: z.string().optional(),
  coverImage: z.string().refine(
    (value) => {
      const regex =
        /^(https:\/\/)?(www\.)?[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,6}(\/.*)?$/; // regex for url

      return regex.test(value);
    },
    { message: "URl must be over HTTPS." },
  ),
  youtubeUrl: z
    .string({
      required_error: "Youtube URL is required.",
    })
    .refine(
      (value) => {
        return isValidYouTubeUrl(value);
      },
      {
        message: "Invalid Youtube URL.",
      },
    ),
  key: z
    .string({
      required_error: "Key is required.",
    })
    .refine(
      (value) => {
        const regex = /^[A-G](#|b)?(m)?(,[A-G](#|b)?(m)?)*$/;
        return regex.test(value);
      },
      {
        message: "Invalid key format.",
      },
    ),
  publisher: z
    .string({
      required_error: "Publisher is required.",
    })
    .refine((value) => value.length > 0, {
      message: "Publisher is required.",
    }),
  releaseYear: z
    .string({
      required_error: "Release year is required.",
    })
    .refine(
      (value) => {
        const regex = /^\d{4}$/;
        return regex.test(value);
      },
      {
        message: "Invalid year format.",
      },
    ),
  album: z.string({
    required_error: "Album is required.",
  }),
});
