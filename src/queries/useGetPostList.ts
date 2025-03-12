import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Params } from "../types/params";
import { fetchPosts } from "../api/fetchPost";
import { Post } from "../types/post";

export default function useGetPostList(
  params: Params
): UseQueryResult<Array<Post>, unknown> {
  return useQuery<Array<Post>>({
    queryKey: [params],
    queryFn: async () => {
      return await fetchPosts(params);
    },
  });
}
