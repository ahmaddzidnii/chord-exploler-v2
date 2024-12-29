"use client";

import { z } from "zod";
import { X } from "lucide-react";
import ReactPlayer from "react-player";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import { useCreateSongModal } from "@/features/admin/songs/store/use-create-song-modal";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { songInfoSchema } from "../../schema/song-info";
import { DisplayImage } from "../../../../../components/admin/songs/create/display-image";
import { useCreateSongs } from "../../api/use-create-songs";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";

type TypeFromSchema = z.infer<typeof songInfoSchema>;

export const CreateSongModal = () => {
  const { isOpen, onClose } = useCreateSongModal();

  const { mutate, isPending } = useCreateSongs();

  const [imageLink, setImageLink] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");

  const inputImageUrl = useRef<any>(null);
  const inputYoutubeUrl = useRef<any>(null);

  const [Modal, confirmModal] = useConfirm(
    "Are you sure",
    " you want to reset the form?",
  );

  const handleCloseModal = async () => {
    const ok = await confirmModal();

    if (!ok) {
      return;
    }
    form.reset();
    setImageLink("");
    setYoutubeLink("");
    onClose();
  };

  const form = useForm<TypeFromSchema>({
    resolver: zodResolver(songInfoSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      artists: "",
      coverImage: "",
      youtubeUrl: "",
      key: "",
      releaseYear: "",
      publisher: "",
    },
  });

  function onSubmit(data: TypeFromSchema) {
    mutate(
      {
        json: data,
      },
      {
        onSuccess: (data) => {
          toast.success(data.msg);
          onClose();
        },
      },
    );
  }
  return (
    <>
      <Modal />
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          onPointerDownOutside={(e) => e.preventDefault()}
          showCloseButton={false}
          className="px-0 py-3"
        >
          <div className="flex items-center justify-between px-3">
            <VisuallyHidden.Root>
              <DialogDescription>
                This action will add a new song to the list.
              </DialogDescription>
            </VisuallyHidden.Root>
            <DialogTitle className="text-xl font-bold">Add Songs</DialogTitle>
            <div>
              <Button variant="ghost" onClick={handleCloseModal}>
                <X />
              </Button>
            </div>
          </div>
          <Separator />
          <div className="flex h-[250px] flex-col gap-4 overflow-y-auto sm:h-[350px] lg:h-[500px] lg:flex-row">
            <div className="me-3 flex-1 lg:me-0">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-2 ps-3"
                  id="create-song-form"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Song title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="artists"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Artist</FormLabel>
                        <FormControl>
                          <Input placeholder="Artist" {...field} />
                        </FormControl>
                        <FormDescription>
                          If more than one artist, separate them with a comma
                          &#40;for example A,B&#41;.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="releaseYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Release year</FormLabel>
                        <FormControl>
                          <Input placeholder="ex 2021" {...field} />
                        </FormControl>
                        <FormMessage />
                        <FormDescription>
                          Year of release of the music.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="album"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Album</FormLabel>
                        <FormControl>
                          <Input placeholder="Albums" {...field} />
                        </FormControl>
                        <FormMessage />
                        <FormDescription>Album of the music.</FormDescription>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="publisher"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Publisher</FormLabel>
                        <FormControl>
                          <Input placeholder="Song publisher" {...field} />
                        </FormControl>
                        <FormMessage />
                        <FormDescription>
                          The label that published the music and please list it
                          correctly.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="key"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Key</FormLabel>
                        <FormControl>
                          <Input placeholder="Key" {...field} />
                        </FormControl>
                        <FormMessage />
                        <FormDescription>
                          If more than one or there is modulation in the song,
                          then separate them with a comma &#40;for example
                          A,B&#41;.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="coverImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cover</FormLabel>
                        <FormControl>
                          <div className="flex gap-x-5">
                            <Input
                              placeholder="ex https://image.com/image.jpg"
                              {...field}
                              ref={(e: HTMLInputElement | null) => {
                                inputImageUrl.current = e;
                                field.ref(e);
                              }}
                            />
                            <Button
                              onClick={() => {
                                if (inputImageUrl.current.value.trim() !== "") {
                                  setImageLink(inputImageUrl.current.value);
                                }
                              }}
                              type="button"
                            >
                              Load
                            </Button>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Now only supported image via URL
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="youtubeUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Youtube Link</FormLabel>
                        <FormControl>
                          <div className="flex gap-x-5">
                            <Input
                              placeholder="ex https:/youtube.com/watch?v=videoId"
                              {...field}
                              ref={(e: HTMLInputElement | null) => {
                                inputYoutubeUrl.current = e;
                                field.ref(e);
                              }}
                            />
                            <Button
                              onClick={() => {
                                if (
                                  inputYoutubeUrl.current.value.trim() !== ""
                                ) {
                                  setYoutubeLink(inputYoutubeUrl.current.value);
                                }
                              }}
                              type="button"
                            >
                              Load
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
            <div className="top-0 h-full w-full space-y-2 pe-3 ps-3 lg:sticky lg:w-1/4">
              <h3 className="text-base font-bold">Preview image:</h3>
              <DisplayImage imgUrl={imageLink} />
              <h3 className="text-base font-bold">Preview youtube:</h3>
              <div className="relative aspect-video overflow-hidden rounded-md">
                <ReactPlayer
                  className="absolute left-0 top-0 bg-muted"
                  width="100%"
                  height="100%"
                  url={youtubeLink}
                />
              </div>
            </div>
          </div>

          <Separator />
          <div className="flex items-center justify-between px-3">
            <DialogDescription></DialogDescription>
            <div className="flex">
              <Button
                className="mr-3 w-24 rounded-3xl"
                variant="destructive"
                onClick={() => {
                  form.reset();
                }}
              >
                Reset form
              </Button>
              <Button
                className="mr-5 w-24 rounded-3xl"
                variant="default"
                type="submit"
                form="create-song-form"
              >
                Add
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
