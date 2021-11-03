import axios from "axios";
import { IMovie } from "../typings/movie";

interface IMoviesResponse {
  page: number;
  results: IMovie[];
  total_results: number;
  total_pages: number;
}

export const getMovies = async (page?: number | string) => {
  try {
    const { data } = await axios.get<IMoviesResponse>(
      `${process.env.API_URL}/discover/movie`,
      {
        params: {
          api_key: process.env.API_KEY,
          page: page ?? 1,
        },
      }
    );
    return data.results;
  } catch (error) {
    return [];
  }
};
