import { ReactNode } from "react";

export type RouteKey =
  | "chart"
  | "w-hook"
  | "event"
  | "news"
  | "store"
  | "top-up-center";

export interface RouteConfig {
  path: `/${RouteKey}`;
  element: ReactNode;
}
