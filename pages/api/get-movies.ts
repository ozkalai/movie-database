// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getMovies } from "../../src/services";
import { IMovie } from "../../src/typings/movie";

const handler = async (req: NextApiRequest, res: NextApiResponse<IMovie[]>) => {
  const query: { page?: string } = req.query;
  const { page } = query;
  try {
    const movies = await getMovies(page);
    res.status(200).json(movies);
  } catch (error) {
    res.status(200).json([]);
  }
};

export default handler;
