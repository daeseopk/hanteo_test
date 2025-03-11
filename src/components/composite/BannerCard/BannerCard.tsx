import { BannerItem } from "../../../types/banner";
import BannerBadge from "../../base/BannerBadge/BannerBadge";
import BannerImage from "../../base/BannerImage/BannerImage";
import BannerInfo from "../../base/BannerInfo/BannerInfo";
import Card from "../../base/Card/Card";
import "./style.scss";

interface Props {
  item: BannerItem;
}

export default function BannerCard(props: Props) {
  const { item } = props;

  const getWidth = () => {
    return `${window.innerWidth - 40}px`;
  };
  return (
    <Card className="banner-card" hasShadow width={getWidth()} height="180px">
      <BannerBadge isActive={item.isActive} />
      <BannerImage imgUrl={item.imgUrl} />
      <BannerInfo {...item} />
    </Card>
  );
}
