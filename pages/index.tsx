import type { GetStaticProps, NextPage } from "next";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

import { getMovies } from "../src/services";
import { IMovie } from "../src/typings/movie";
import { Pagination } from "../src/components";

interface IHomeProps {
  movies: IMovie[];
}

export const getStaticProps: GetStaticProps<IHomeProps> = async () => {
  const movies = await getMovies();

  return {
    props: {
      movies,
    },
  };
};

const Home: NextPage<IHomeProps> = ({ movies }) => {
  const { query, push } = useRouter();
  const { page } = query as { page?: string };

  const [pageData, setPageData] = React.useState<IMovie[]>(movies);

  const fetchMore = React.useCallback(async () => {
    if (page) {
      const { data } = await axios.get<IMovie[]>("/api/get-movies", {
        params: {
          page,
        },
      });

      setPageData(data);
    }
  }, [page]);

  React.useEffect(() => {
    fetchMore();
  }, [fetchMore]);

  return (
    <div>
      <ul>
        {pageData.map((movie) => (
          <li key={movie.id}>
            <Link href={`/movie/${movie.id}`} passHref>
              <a>{movie.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      <Pagination />
    </div>
  );
};

export default Home;
