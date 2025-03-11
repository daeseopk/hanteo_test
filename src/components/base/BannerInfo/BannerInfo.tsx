import { BannerItem } from "../../../types/banner";

export default function BannerInfo(props: Omit<BannerItem, "imgUrl">) {
  const { endDate, isActive, startDate, title } = props;

  return <div>BannerInfo</div>;
}
