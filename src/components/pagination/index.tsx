import React from "react";
import { useRouter } from "next/router";

export const Pagination: React.FC = () => {
  const { query, push } = useRouter();
  const { page } = query as { page?: string };

  const onNext = () => {
    push(`?page=${Number(page ?? 1) + 1}`, undefined, { shallow: true });
  };

  const onPrev = () => {
    if ((page ?? 1) > 2) {
      push(`?page=${Number(page ?? 1) - 1}`, undefined, { shallow: true });
    } else {
      push("/", undefined, { shallow: true });
    }
  };

  return (
    <div className="flex items-center w-full justify-center my-12">
      <button
        onClick={onPrev}
        className="bg-indigo-500 text-white font-extrabold rounded-full h-12 w-12 flex justify-center items-center"
      >
        {"<"}
      </button>
      <div className="px-4 h-12 text-indigo-600 font-extrabold text-xl flex justify-center items-center">
        {page ?? 1}
      </div>
      <button
        onClick={onNext}
        className="bg-indigo-500 text-white font-extrabold rounded-full h-12 w-12 flex justify-center items-center"
      >
        {">"}
      </button>
    </div>
  );
};
