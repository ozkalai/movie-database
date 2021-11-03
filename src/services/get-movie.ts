import axios from "axios";
import { IMovieDetail } from "../typings/movie";

export const getMovie = async (id?: number | string) => {
  try {
    const { data } = await axios.get<IMovieDetail>(
      `${process.env.API_URL}/movie/${id}`,
      {
        params: {
          api_key: process.env.API_KEY,
        },
      }
    );
    return data;
  } catch (error) {
    return undefined;
  }
};
