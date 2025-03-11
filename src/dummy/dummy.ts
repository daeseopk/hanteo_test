import { RouteInfo } from "../components/composite/Header/Header";
import { BannerItem } from "../types/banner";

export const TABS: Array<RouteInfo> = [
  { label: "차트", path: "/chart" },
  { label: "WHook", path: "/w-hook" },
  { label: "이벤트", path: "/event" },
  { label: "뉴스", path: "/news" },
  { label: "스토어", path: "/store" },
  { label: "충전소", path: "/top-up-center" },
];

export const BANNERS: Array<BannerItem> = [
  {
    imgUrl: "https://picsum.photos/382/130?random=1",
    isActive: true,
    title: "[M COUNTDOWN] 10월 2주차 사전투표",
    startDate: new Date("2020-02-08 10:00:00"),
    endDate: new Date("2020-04-08 10:00:00"),
  },
  {
    imgUrl: "https://picsum.photos/382/130?random=2",
    isActive: true,
    title: "[M COUNTDOWN] 10월 2주차 사전투표",
    startDate: new Date("2020-02-08 10:00:00"),
    endDate: new Date("2020-04-08 10:00:00"),
  },
  {
    imgUrl: "https://picsum.photos/382/130?random=3",
    isActive: false,
    title: "[M COUNTDOWN] 10월 2주차 사전투표",
    startDate: new Date("2020-02-08 10:00:00"),
    endDate: new Date("2020-04-08 10:00:00"),
  },
  {
    imgUrl: "https://picsum.photos/382/130?random=4",
    isActive: true,
    title: "[M COUNTDOWN] 10월 2주차 사전투표",
    startDate: new Date("2020-02-08 10:00:00"),
    endDate: new Date("2020-04-08 10:00:00"),
  },
  {
    imgUrl: "https://picsum.photos/382/130?random=5",
    isActive: false,
    title: "[M COUNTDOWN] 10월 2주차 사전투표",
    startDate: new Date("2020-02-08 10:00:00"),
    endDate: new Date("2020-04-08 10:00:00"),
  },
];
