import { BannerItem } from "../../../types/banner";
import Button from "../../composite/Button/Button";
import "./style.scss";
import { formatDate } from "../../../util/formatDate";

export default function BannerInfo(
  props: Omit<BannerItem, "imgUrl" | "isActive">
) {
  const { endDate, startDate, title } = props;

  const handleClickVote = () => {
    console.log("mouse event");
  };

  return (
    <div className="banner-info">
      <div className="banner-info__title-wrap">
        <span className="banner-info__title">{title}</span>
        <Button onClick={handleClickVote} title="투표하기" />
      </div>
      <div className="banner-info__date-wrap">
        <span className="banner-info__date">
          {formatDate(startDate)} ~ {formatDate(endDate)}(KST)
        </span>
      </div>
    </div>
  );
}
