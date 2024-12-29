import { useParams } from "next/navigation";

export const useSongsId = () => {
  return useParams().songsId as string;
};
