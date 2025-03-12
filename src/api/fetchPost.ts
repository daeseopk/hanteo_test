import { POSTS } from "../dummy/dummy";
import { Params } from "../types/params";
import { Post } from "../types/post";

export const fetchPosts = async (params: Params): Promise<Array<Post>> => {
  const { limit, page } = params;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  // 실제 API 호출 대신 더미 데이터 슬라이싱
  const paginatedPosts = POSTS.slice(startIndex, endIndex);

  // 네트워크 지연 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 500));

  return paginatedPosts;
};
