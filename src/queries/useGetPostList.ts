import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Params } from "../types/params";
import { fetchPosts } from "../api/fetchPost";
import { Response } from "../types/response";
import { Post } from "../types/post";

export default function useGetPostList(
  params: Params
): UseQueryResult<Response<Post>, unknown> {
  return useQuery<Response<Post>>({
    queryKey: [params],
    queryFn: async () => {
      return await fetchPosts(params);
    },
  });
}
