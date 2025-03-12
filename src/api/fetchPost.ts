import { POSTS } from "../dummy/dummy";
import { Params } from "../types/params";
import { Post } from "../types/post";
import { Response } from "../types/response";

const INCREMENTAL_LIMIT = 10;

export const fetchPosts = async (params: Params): Promise<Response<Post>> => {
  const { limit, page } = params;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit + INCREMENTAL_LIMIT;

  const checkHasNext = () => {
    return endIndex < POSTS.length;
  };

  // 실제 API 호출 대신 더미 데이터 슬라이싱
  const paginatedPosts = POSTS.slice(startIndex, endIndex);

  // 네트워크 지연 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    data: paginatedPosts,
    hasNext: checkHasNext(),
  };
};
