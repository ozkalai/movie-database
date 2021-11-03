import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import { getMovie } from "../../src/services";
import { IMovieDetail } from "../../src/typings/movie";

interface IDetailProps {
  movie: IMovieDetail;
}

export const getStaticProps: GetStaticProps<IDetailProps> = async (context) => {
  const { id } = context.params as { id: string };
  const movie = await getMovie(id);

  if (!movie) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      movie,
    },
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

const Detail: NextPage<IDetailProps> = ({ movie }) => {
  const { back } = useRouter();

  return (
    <div>
      <button
        onClick={back}
        className="mb-12 bg-indigo-500 px-4 py-2 text-white "
      >
        Go back
      </button>
      <div>
        <h1 className="text-2xl font-bold text-black">{movie.title}</h1>
        <div className="flex py-2 gap-2.5">
          {movie.genres.map((genre) => (
            <div
              key={genre.id}
              className="bg-black text-white rounded-2xl px-2.5 py-1"
            >
              {genre.name}
            </div>
          ))}
        </div>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
};

export default Detail;
