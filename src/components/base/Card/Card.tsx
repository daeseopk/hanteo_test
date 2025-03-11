import { CSSProperties, ReactNode } from "react";
import "./style.scss";

interface Props extends CSSProperties {
  width: string;
  height: string;
  hasShadow?: boolean;
  children: ReactNode;
}
export default function Card(props: Props) {
  const { width, height, hasShadow, children, ...restProps } = props;
  return (
    <div
      style={{
        width,
        height,
        ...(!hasShadow && { boxShadow: "none" }),
        ...restProps,
      }}
      className="card-container"
    >
      {children}
    </div>
  );
}
