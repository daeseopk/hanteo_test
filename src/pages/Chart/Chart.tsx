import BannerCard from "../../components/composite/BannerCard/BannerCard";
import Carousel from "../../components/composite/Carousel/Carousel";
import ListView from "../../components/composite/ListView/ListView";
import { BANNERS } from "../../dummy/dummy";
import { BannerItem } from "../../types/banner";
import "./style.scss";

export default function Chart() {
  return (
    <div className="chart-container">
      <Carousel<BannerItem>
        items={BANNERS}
        renderItem={(item) => <BannerCard item={item} />}
      />
      <div className="list-view-wrapper">
        <ListView title="콘텐츠 큐레이션 제목">ㅁㄴㅇㄹ</ListView>
      </div>
    </div>
  );
}
