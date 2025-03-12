import { CSSProperties, MouseEvent } from "react";
import "./style.scss";

interface Props extends CSSProperties {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  title: string;
}

export default function Button(props: Props) {
  const { title, onClick } = props;

  return (
    <button onClick={onClick} className="button-container">
      {title}
    </button>
  );
}
