import { RouteKey } from "../../../types/router";

export interface RouteInfo {
  path: `/${RouteKey}`;
  label: string;
}

export default function Header() {
  return <div>Header</div>;
}
