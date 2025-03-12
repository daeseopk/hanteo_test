import { Post } from "../../../types/post";
import Card from "../../base/Card/Card";

export default function PostCard(props: Post) {
  const { title } = props;
  return (
    <Card width="100%" height="40px">
      {title}
    </Card>
  );
}
