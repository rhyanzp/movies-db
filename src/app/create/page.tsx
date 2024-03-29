"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { number, z } from "zod";
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
import { fileURLToPath } from "url";

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
    .min(0, { message: "rating must be greater than 0" })
    .max(5, { message: "rating must be less than 5" }),
  image_file: z.any(),
  // .refine((file) => file?.size <= 5000000, "Max image size is 5MB")
  // .refine(
  //   (file) =>
  //     ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
  //       file?.type
  //     ),
  //   "Only image files accepted"
  // ),
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
      description: "default_desc",
      rating: 1,
      genre: "default_g",
      reviewer: "default_reviewer",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const blob = new Blob([values.image_file]);
    const formData = new FormData();

    for (const [key, value] of Object.entries(values)) {
      formData.set(key, value);
    }
    formData.set("action", "CREATE");
    console.log({ formData });

    fetch("api/movies", {
      method: "POST",
      // headers: {
      //   'Content-Type': "multipart/form-data"
      // },
      body: formData,
      // body: JSON.stringify({
      //   title: values.title,
      //   description: values.description,
      //   rating: values.rating,
      //   image_file: blob,
      //   genre: values.genre,
      //   reviewer: values.reviewer,
      //   action: "CREATE",
      //   post_date: new Date(),
      // }),
    });
    console.log("Posted file: ", values);
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
                  <Input
                    placeholder="0.5 to 5"
                    type="number"
                    {...field}
                    onChange={(event) => {
                      console.log(event);
                      field.onChange(Number(event.target.value));
                    }}
                  />
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
            name="image_file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Picture</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    {...field}
                    value={undefined}
                    onChange={(event) => {
                      field.onChange(event.target.files?.[0]);
                    }}
                  />
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
