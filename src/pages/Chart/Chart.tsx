import BannerCard from "../../components/composite/BannerCard/BannerCard";
import Carousel from "../../components/composite/Carousel/Carousel";
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
    </div>
  );
}
