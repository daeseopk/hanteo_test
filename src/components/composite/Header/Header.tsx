import { Link, useLocation } from "react-router-dom";
import { RouteKey } from "../../../types/router";
import "./style.scss";
import { useEffect, useRef, useState } from "react";

export interface RouteInfo {
  path: `/${RouteKey}`;
  label: string;
}
interface Props {
  tabs: Array<RouteInfo>;
}
export default function Header(props: Props) {
  const { tabs } = props;

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const { pathname } = useLocation();

  const headerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      const activeTab = headerRef.current.querySelector(
        ".header-menu--active"
      ) as HTMLElement;
      if (activeTab) {
        const containerWidth = headerRef.current.offsetWidth;
        const tabWidth = activeTab.offsetWidth;
        const tabLeft = (activeTab as HTMLElement).offsetLeft;

        // 활성 탭이 중앙에 오도록 스크롤 위치 계산
        const scrollPosition = tabLeft - containerWidth / 2 + tabWidth / 2;

        headerRef.current.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  }, [pathname]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - headerRef.current!.offsetLeft);
    setScrollLeft(headerRef.current!.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - headerRef.current!.offsetLeft;
    const walk = x - startX;
    headerRef.current!.scrollLeft = scrollLeft - walk;
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  return (
    <ul
      className="header-container"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      ref={headerRef}
    >
      {tabs.map((tab) => {
        const isActive = pathname === tab.path;
        return (
          <li
            className={`header-menu${isActive ? "--active" : "--inactive"}`}
            key={tab.path}
          >
            <Link to={tab.path}>{tab.label}</Link>
          </li>
        );
      })}
    </ul>
  );
}
