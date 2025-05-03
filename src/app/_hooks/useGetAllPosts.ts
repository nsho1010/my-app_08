import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../_constants";
import { Post, GetPostsResponse } from "../_types";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useGetAllPosts = () => {
  const { data, error, isLoading } = useSWR<GetPostsResponse>(
    "http://localhost:3030/api/posts",
    fetcher
  );

  return {
    data,
    error,
    isLoading,
  };
};
