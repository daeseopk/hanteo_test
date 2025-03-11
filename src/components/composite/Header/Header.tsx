import { Link } from "react-router-dom";
import { RouteKey } from "../../../types/router";
import "./style.scss";

export interface RouteInfo {
  path: `/${RouteKey}`;
  label: string;
}
interface Props {
  tabs: Array<RouteInfo>;
}
export default function Header(props: Props) {
  const { tabs } = props;

  return (
    <ul className="header-container">
      {tabs.map((tab) => (
        <li key={tab.path}>
          <Link to={tab.path}>{tab.label}</Link>
        </li>
      ))}
    </ul>
  );
}
