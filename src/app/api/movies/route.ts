import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const where: Prisma.MoviesWhereInput = {};

  if (searchParams.get("id")) {
    const id = parseInt(searchParams.get("id")!);

    where.id = id;
  }

  const movies = await prisma.movies.findMany({
    where,
  });

  return Response.json({
    data: [...movies],
  });
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const data: {
    [key: string]: string | File | number;
    image_file: File;
  } = Object.fromEntries(Array.from(formData.entries())) as any;
  console.log({ data });

  switch (data.action) {
    case "DELETE":
      const delMovie = await prisma.movies.delete({
        where: {
          id: data.id,
        },
      });
      console.log(`Deleted movie:`, delMovie);
      return Response.json(delMovie);
      break;
    case "CREATE":
      delete data.action;
      data.rating = Number(data.rating);
      data.post_date = new Date();
      data.image_file = Buffer.from(await data.image_file.arrayBuffer());

      const addMovie = await prisma.movies.create({
        data: data,
      });
      console.log(`Created movie:`, addMovie);
      return Response.json(addMovie);
      break;
  }
}
