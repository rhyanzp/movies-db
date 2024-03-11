"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";

export default function Review(props: any) {
  const { data } = props;
  const date = new Date(data.post_date);

  function delReview(id: number) {
    console.log("fetching...");
    fetch("api/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "DELETE", id: id }),
    });
  }

  return (
    <>
      {data.id && (
        <div className="post bg-white rounded-lg overflow-hidden shadow-md">
          <Image src={""} alt="Post Image" width={500} height={200} />
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-indigo-500 text-xl font-bold mb-2 flex items-center">
                {data.title}{" "}
                <p className="text-gray-400 font-semibold text-base mx-3">
                  {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}
                </p>
              </h1>
              <p className="text-gray-700 mb-4">{data.rating} / 5</p>
            </div>
            <p className="text-gray-400">{data.genre}</p>
            <div>
              <p className="text-gray-700 mb-4">{data.description}</p>
              <p className="text-right text-gray-400 pb-2">
                {"Written by " + data.reviewer}
              </p>
            </div>
            <hr className="py-1" />
            <div className="flex justify-between">
              <a href="#" className="text-blue-500 hover:underline">
                Read More
              </a>

              <AlertDialog>
                <AlertDialogTrigger className="text-red-400">
                  Delete
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => delReview(data.id)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
