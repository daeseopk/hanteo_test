import { BannerItem } from "../../../types/banner";
import "./style.scss";

export default function BannerImage(props: Pick<BannerItem, "imgUrl">) {
  const { imgUrl } = props;
  return (
    <div className="banner-image">
      <img src={imgUrl} />
    </div>
  );
}
