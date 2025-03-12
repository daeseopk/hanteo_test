import { ReactNode } from "react";
import "./style.scss";

interface Props {
  title: string;
  children: ReactNode;
}

export default function ListView(props: Props) {
  const { title, children } = props;

  return (
    <div className="list-view-container">
      <span className="list-view-title">{title}</span>
      <div className="list-view-content-wrapper">{children}</div>
    </div>
  );
}
