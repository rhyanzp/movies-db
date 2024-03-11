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
  const body = await request.json();
  console.log(body.action);

  switch (body.action) {
    case "DELETE":
      const delMovie = await prisma.movies.delete({
        where: {
          id: body.id,
        },
      });
      console.log(`Deleted movie:`, delMovie);
      return Response.json(delMovie);
      break;
    case "CREATE":
      delete body.action;
      console.log("Here");
      const addMovie = await prisma.movies.create({
        data: body,
      });
      console.log(`Created movie:`, addMovie);
      return Response.json(addMovie);
      break;
  }
}
