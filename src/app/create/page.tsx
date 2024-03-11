"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "title must be at least 2 characters" })
    .max(20),
  description: z
    .string()
    .min(5, { message: "description must be at least 5 characters" })
    .max(255),
  rating: z
    .number()
    .min(0.5, { message: "rating must be greater than 0" })
    .max(5),
  image_file: z.string().min(5).max(30, { message: "image filename too long" }),
  genre: z
    .string()
    .min(2, { message: "genre must be at least 2 characters" })
    .max(10, { message: "genre must be at less than 10 characters" }),
  reviewer: z.string().max(20, {
    message: "please keep your display name less than 20 characters",
  }),
});

export default function ReviewForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "default_title",
      description: "default",
      rating: 1,
      image_file: "mariobros.jpg",
      genre: "default",
      reviewer: "default",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    fetch("api/movies", {
      method: "POST",
      headers: {},
      body: JSON.stringify({
        title: values.title,
        description: values.description,
        rating: values.rating,
        image_file: values.image_file,
        genre: values.genre,
        reviewer: values.reviewer,
        action: "CREATE",
        post_date: new Date(),
      }),
    });
    console.log(values);
  }

  return (
    <div className="p-4 bg-gray-200">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Movie Title</FormLabel>
                <FormControl>
                  <Input placeholder="anonymous" {...field} />
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Review Body</FormLabel>
                <FormControl>
                  <Input placeholder="lorem ipsum" {...field} />
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating (out of 5)</FormLabel>
                <FormControl>
                  <Input placeholder="0.5 to 5" {...field} />
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="image_file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image Filename</FormLabel>
                <FormControl>
                  <Input placeholder="xxx.jpg" {...field} />
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <FormControl>
                  <Input placeholder="Comedy/Action/etc." {...field} />
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="reviewer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Review Alias</FormLabel>
                <FormControl>
                  <Input placeholder="anonymous" {...field} />
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="reviewer"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input type="file" />
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

// fetch("api/movies", {
//   method: "POST",
//   headers: {},
//   body: JSON.stringify({
//     title: title,
//     description: description,
//     rating: Number(rating),
//     image_file: image_file,
//     genre: genre,
//     reviewer: reviewer,
//     action: "CREATE",
//     post_date: new Date(),
//   }),
// });
