import { RouteInfo } from "../components/composite/Header/Header";
import { BannerItem } from "../types/banner";
import { Post } from "../types/post";

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

export const POSTS: Array<Post> = [
  {
    imgUrl: "https://picsum.photos/100/100?random=1",
    title: "title1",
    createdAt: new Date("2020-02-08 10:00:00"),
  },
  {
    imgUrl: "https://picsum.photos/100/100?random=2",
    title: "title2",
    createdAt: new Date("2020-03-15 14:30:00"),
  },
  {
    imgUrl: "https://picsum.photos/100/100?random=3",
    title: "title3",
    createdAt: new Date("2020-04-22 09:45:00"),
  },
  {
    imgUrl: "https://picsum.photos/100/100?random=4",
    title: "title4",
    createdAt: new Date("2020-05-10 18:20:00"),
  },
  {
    imgUrl: "https://picsum.photos/100/100?random=5",
    title: "title5",
    createdAt: new Date("2020-06-05 11:15:00"),
  },
  {
    imgUrl: "https://picsum.photos/100/100?random=6",
    title: "title6",
    createdAt: new Date("2020-07-12 20:00:00"),
  },
  {
    imgUrl: "https://picsum.photos/100/100?random=7",
    title: "title7",
    createdAt: new Date("2020-08-20 16:40:00"),
  },
  {
    imgUrl: "https://picsum.photos/100/100?random=8",
    title: "title8",
    createdAt: new Date("2020-09-03 13:25:00"),
  },
  {
    imgUrl: "https://picsum.photos/100/100?random=9",
    title: "title9",
    createdAt: new Date("2020-10-11 08:55:00"),
  },
  {
    imgUrl: "https://picsum.photos/100/100?random=10",
    title: "title10",
    createdAt: new Date("2020-11-19 17:30:00"),
  },
  {
    imgUrl: "https://picsum.photos/100/100?random=11",
    title: "title11",
    createdAt: new Date("2020-12-07 12:10:00"),
  },
  {
    imgUrl: "https://picsum.photos/100/100?random=12",
    title: "title12",
    createdAt: new Date("2021-01-01 00:01:00"),
  },
  {
    imgUrl: "https://picsum.photos/100/100?random=13",
    title: "title13",
    createdAt: new Date("2021-02-14 19:45:00"),
  },
  {
    imgUrl: "https://picsum.photos/100/100?random=14",
    title: "title14",
    createdAt: new Date("2021-03-22 10:30:00"),
  },
  {
    imgUrl: "https://picsum.photos/100/100?random=15",
    title: "title15",
    createdAt: new Date("2021-04-30 15:20:00"),
  },
  {
    imgUrl: "https://picsum.photos/100/100?random=16",
    title: "title16",
    createdAt: new Date("2021-05-18 11:55:00"),
  },
  {
    imgUrl: "https://picsum.photos/100/100?random=17",
    title: "title17",
    createdAt: new Date("2021-06-25 16:40:00"),
  },
];
