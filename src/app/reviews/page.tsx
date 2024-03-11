"use client";

import { empty } from "@prisma/client/runtime/library";
import Image from "next/image";
import { useEffect, useState } from "react";
import Review from "~/components/review";

type PostType = {
  id: number;
  title: string;
  description: string;
  rating: number;
  image_file: string;
  genre: string;
  reviewer: string;
  post_date: string;
};

export default function Home() {
  const [data, setData] = useState<PostType[]>(); // ();

  useEffect(() => {
    console.log("fetching...");
    fetch("api/movies")
      .then((result) => result.json())
      .then((result) => {
        console.log({ result });
        setData(result.data);
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="max-w-7xl w-full mb-10 border border-gray-600 rounded-xl bg-indigo-900">
        <p className="flex justify-center py-4 text-white text-xl">
          Complete List of Reviews
        </p>
      </div>
      <div className="max-w-7xl grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 px-1">
        {data
          ? data.map((review) => <Review key={review.id} data={review} />)
          : ""}
      </div>
    </main>
  );
}
