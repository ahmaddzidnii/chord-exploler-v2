import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<(typeof client.api.v1.songs)["$post"]>;
type ResponseType = InferResponseType<(typeof client.api.v1.songs)["$post"]>;

export const useCreateSongs = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.v1.songs["$post"]({
        json,
      });

      const jsonResponse = await response.json();

      if (!response.ok) {
        throw new Error(jsonResponse.msg);
      }

      return jsonResponse;
    },
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["songs", "count"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["songs"],
        }),
      ]);
    },
  });

  return mutation;
};
