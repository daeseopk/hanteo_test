import { Post } from "../../../types/post";
import Card from "../../base/Card/Card";
import "./style.scss";

export default function PostCard(props: Post) {
  const { title, imgUrl } = props;
  return (
    <Card className="post-card" width="100%" height="60px">
      <img className="post-card-img" src={imgUrl} />
      <span>{title}</span>
    </Card>
  );
}
