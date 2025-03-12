import { BannerItem } from "../../../types/banner";
import "./style.scss";

export default function BannerBadge(props: Pick<BannerItem, "isActive">) {
  const { isActive } = props;
  const text = isActive ? "진행 중" : "종료";

  return (
    <div className={`banner-badge${isActive ? "--active" : "--inactive"}`}>
      <span>{text}</span>
    </div>
  );
}
