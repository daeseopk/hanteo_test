import { useCallback, useEffect, useRef, useState } from "react";
import PagingList from "../../components/base/PagingList/PagingList";
import BannerCard from "../../components/composite/BannerCard/BannerCard";
import Carousel, {
  SwipeCondition,
} from "../../components/composite/Carousel/Carousel";
import ListView from "../../components/composite/ListView/ListView";
import { BANNERS } from "../../dummy/dummy";
import useGetPostList from "../../queries/useGetPostList";
import { BannerItem } from "../../types/banner";
import { Params } from "../../types/params";
import "./style.scss";
import { Post } from "../../types/post";
import PostCard from "../../components/composite/PostCard/PostCard";

const DEFAULT_PARAMS: Params = {
  limit: 20,
  page: 1,
};

export default function Chart() {
  const [params, setParams] = useState<Params>(DEFAULT_PARAMS);
  const [swipeCondition, setSwipeCondition] =
    useState<SwipeCondition>("completed");

  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  const handleChangeSwipeCondition = (condition: SwipeCondition) => {
    setSwipeCondition(condition);
  };

  useEffect(() => {
    if (!chartContainerRef.current) {
      return;
    }
    if (swipeCondition === "completed") {
      chartContainerRef.current.style.overflow = "auto";
      return;
    }
    chartContainerRef.current.style.overflow = "hidden";
  }, [swipeCondition]);

  const itemRenderer = useCallback((item: Post) => {
    return <PostCard {...item} />;
  }, []);

  return (
    <div ref={chartContainerRef} className="chart-container">
      <Carousel<BannerItem>
        items={BANNERS}
        renderItem={(item) => <BannerCard item={item} />}
        onSwipeStateChange={handleChangeSwipeCondition}
      />
      <div className="list-view-wrapper">
        <ListView title="콘텐츠 큐레이션 제목">
          <PagingList<Post>
            query={useGetPostList}
            params={params}
            setParams={setParams}
            gap={15}
            scrollWrapperRef={chartContainerRef}
            renderItem={itemRenderer}
          />
        </ListView>
      </div>
    </div>
  );
}
