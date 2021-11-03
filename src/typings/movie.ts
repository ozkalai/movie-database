export interface IMovie {
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

export interface IMovieDetail extends Omit<IMovie, "genre_ids"> {
  genres: {
    id: number;
    name: string;
  }[];
}
